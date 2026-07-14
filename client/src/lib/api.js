export async function extractRecipe(url) {
  const res = await fetch('/api/extract-recipe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.ok ? data.recipe : null;
}
