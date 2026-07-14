import dns from 'node:dns/promises';
import net from 'node:net';

const FETCH_TIMEOUT_MS = 8000;
const MAX_BODY_BYTES = 3 * 1024 * 1024; // 3MB is plenty for <head> + JSON-LD
const USER_AGENT = 'HarvestRecipeBot/1.0 (+recipe metadata fetcher)';

export function guessDishType(category, title) {
  const s = `${category || ''} ${title || ''}`.toLowerCase();
  if (s.includes('chicken')) return 'Chicken';
  if (s.includes('beef') || s.includes('steak')) return 'Beef';
  if (s.includes('pork') || s.includes('bacon') || s.includes('ham')) return 'Pork';
  if (s.includes('shrimp') || s.includes('fish') || s.includes('seafood') || s.includes('salmon')) return 'Seafood';
  if (s.includes('dessert') || s.includes('cake') || s.includes('cookie') || s.includes('galette')) return 'Dessert';
  if (s.includes('appetizer') || s.includes('starter') || s.includes('dip')) return 'Appetizer';
  return 'Vegetarian';
}

function isPrivateIPv4(ip) {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p))) return true;
  const [a, b] = parts;
  if (a === 10) return true;
  if (a === 127) return true;
  if (a === 0) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 100 && b >= 64 && b <= 127) return true; // carrier-grade NAT
  return false;
}

function isPrivateIP(ip) {
  if (net.isIPv4(ip)) return isPrivateIPv4(ip);
  if (net.isIPv6(ip)) {
    const lower = ip.toLowerCase();
    if (lower === '::1' || lower === '::') return true;
    if (lower.startsWith('fe80')) return true; // link-local
    if (/^f[cd]/.test(lower)) return true; // unique local fc00::/7
    if (lower.startsWith('::ffff:')) return isPrivateIPv4(lower.slice(7));
    return false;
  }
  return true; // unrecognized format — block to be safe
}

async function assertPublicHost(hostname) {
  const addresses = await dns.lookup(hostname, { all: true });
  if (!addresses.length) throw new Error('unresolvable_host');
  for (const { address } of addresses) {
    if (isPrivateIP(address)) throw new Error('blocked_host');
  }
}

function decodeEntities(str) {
  if (!str) return str;
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function extractMetaTags(html) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  return tags.map((tag) => ({
    key: /(?:property|name)\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1] || null,
    content: /content\s*=\s*["']([^"']*)["']/i.exec(tag)?.[1] || null,
  }));
}

function getMeta(metas, name) {
  const found = metas.find((m) => m.key === name && m.content);
  return found ? decodeEntities(found.content) : null;
}

function extractJsonLdRecipe(html) {
  const blocks = [];
  const regex = /<script[^>]+type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html))) blocks.push(match[1]);

  for (const block of blocks) {
    try {
      const parsed = JSON.parse(block);
      const items = Array.isArray(parsed) ? parsed : parsed['@graph'] || [parsed];
      const recipe = items.find((item) => {
        const t = item && item['@type'];
        return t === 'Recipe' || (Array.isArray(t) && t.includes('Recipe'));
      });
      if (recipe) return recipe;
    } catch {
      // malformed JSON-LD block — skip it
    }
  }
  return null;
}

export async function fetchRecipeMetadata(rawUrl) {
  let url;
  try {
    url = new URL(/^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`);
  } catch {
    return { ok: false, error: 'invalid_url' };
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return { ok: false, error: 'invalid_url' };
  }

  try {
    await assertPublicHost(url.hostname);
  } catch {
    return { ok: false, error: 'blocked_host' };
  }

  let res;
  try {
    res = await fetch(url.href, {
      redirect: 'follow',
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: { 'User-Agent': USER_AGENT, Accept: 'text/html' },
    });
  } catch {
    return { ok: false, error: 'fetch_failed' };
  }
  if (!res.ok) return { ok: false, error: 'fetch_failed' };

  // The final URL after redirects could point at a private host too.
  const finalUrl = new URL(res.url || url.href);
  try {
    await assertPublicHost(finalUrl.hostname);
  } catch {
    return { ok: false, error: 'blocked_host' };
  }

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('html')) return { ok: false, error: 'not_html' };

  let html = await res.text();
  if (html.length > MAX_BODY_BYTES) html = html.slice(0, MAX_BODY_BYTES);

  const metas = extractMetaTags(html);
  const ld = extractJsonLdRecipe(html);

  const title =
    decodeEntities(ld?.name) ||
    getMeta(metas, 'og:title') ||
    decodeEntities(/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1]?.trim()) ||
    null;

  const imageRaw = ld?.image;
  const imageUrl =
    (typeof imageRaw === 'string' && imageRaw) ||
    (Array.isArray(imageRaw) && (typeof imageRaw[0] === 'string' ? imageRaw[0] : imageRaw[0]?.url)) ||
    (imageRaw && imageRaw.url) ||
    getMeta(metas, 'og:image') ||
    null;

  const ingredients = Array.isArray(ld?.recipeIngredient)
    ? ld.recipeIngredient.map((i) => decodeEntities(String(i))).slice(0, 12)
    : [];

  if (!title && !imageUrl) return { ok: false, error: 'no_recipe_found' };

  return {
    ok: true,
    recipe: {
      title: title || 'Untitled Recipe',
      imageUrl: imageUrl || null,
      ingredients,
      sourceSite: finalUrl.hostname.replace(/^www\./, ''),
      url: finalUrl.href,
      tags: [guessDishType(ld?.recipeCategory, title)],
    },
  };
}
