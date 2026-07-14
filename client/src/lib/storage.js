const RECIPES_KEY = 'harvest.recipes.v1';

export function loadRecipes(fallback) {
  try {
    const raw = localStorage.getItem(RECIPES_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function saveRecipes(recipes) {
  try {
    localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
  } catch {
    // storage unavailable (private browsing, quota) — state stays in-memory only
  }
}
