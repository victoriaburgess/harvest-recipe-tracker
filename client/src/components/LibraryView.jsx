import { DISH_TYPES } from '../lib/data';
import RecipeCard from './RecipeCard';

export default function LibraryView({ query, onQueryChange, dishFilter, onDishFilterChange, recipes, justAddedId, onOpenRecipe, onRate }) {
  const chips = ['All', ...DISH_TYPES];

  return (
    <main style={{ flex: 1, maxWidth: 1120, margin: '0 auto', padding: '48px 40px 80px', width: '100%', boxSizing: 'border-box' }}>
      <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 30, margin: '0 0 24px' }}>Your Recipes</h2>

      <input
        type="text"
        placeholder="Search by title or ingredient..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '14px 18px',
          fontSize: 15,
          fontFamily: "'Work Sans', sans-serif",
          border: '1px solid var(--border)',
          borderRadius: 12,
          background: 'var(--card)',
          color: 'var(--ink)',
          marginBottom: 18,
        }}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
        {chips.map((chip) => {
          const active = chip === dishFilter;
          return (
            <button
              key={chip}
              onClick={() => onDishFilterChange(chip)}
              style={{
                padding: '7px 15px',
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                border: `1px solid ${active ? 'oklch(48% 0.07 125)' : 'var(--border-strong)'}`,
                background: active ? 'oklch(48% 0.07 125)' : 'transparent',
                color: active ? 'var(--on-accent)' : 'var(--ink)',
              }}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {recipes.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
          {recipes.map((r, i) => (
            <RecipeCard
              key={r.id}
              recipe={r}
              seed={i}
              showTags
              highlighted={r.id === justAddedId}
              onOpen={onOpenRecipe}
              onRate={onRate}
            />
          ))}
        </div>
      ) : (
        <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--ink-muted)' }}>
          <div style={{ fontFamily: "'Lora', serif", fontSize: 20, marginBottom: 6 }}>No recipes match yet</div>
          <div style={{ fontSize: 14 }}>Try a different search or filter.</div>
        </div>
      )}
    </main>
  );
}
