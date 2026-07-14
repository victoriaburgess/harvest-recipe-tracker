import RecipeCard from './RecipeCard';

export default function HomeView({ query, onQueryChange, currentSeason, seasonalRecipes, recentRecipes, totalCount, onOpenRecipe, onRate, onGoLibrary }) {
  return (
    <main style={{ flex: 1, maxWidth: 1120, margin: '0 auto', padding: '48px 40px 80px', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ marginBottom: 36 }}>
        <input
          type="text"
          placeholder="Search your recipes..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '16px 20px',
            fontSize: 16,
            fontFamily: "'Work Sans', sans-serif",
            border: '1px solid var(--border)',
            borderRadius: 12,
            background: 'var(--card)',
            color: 'var(--ink)',
          }}
        />
      </div>

      {seasonalRecipes.length > 0 && (
        <section style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 26, margin: 0 }}>In Season Now</h2>
            <span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>Recipes for {currentSeason}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {seasonalRecipes.map((r, i) => (
              <RecipeCard key={r.id} recipe={r} seed={i} onOpen={onOpenRecipe} onRate={onRate} />
            ))}
          </div>
        </section>
      )}

      <section>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 26, margin: 0 }}>Your Library</h2>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onGoLibrary();
            }}
            style={{ fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
          >
            View all ({totalCount}) →
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
          {recentRecipes.map((r, i) => (
            <RecipeCard key={r.id} recipe={r} seed={i} onOpen={onOpenRecipe} onRate={onRate} />
          ))}
        </div>
      </section>
    </main>
  );
}
