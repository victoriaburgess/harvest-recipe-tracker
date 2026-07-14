import MediaBlock from './MediaBlock';
import StarRow from './StarRow';

export default function RecipeCard({ recipe, seed, showTags = false, highlighted = false, onOpen, onRate }) {
  return (
    <div
      onClick={() => onOpen(recipe.id)}
      style={{
        background: 'var(--card)',
        borderRadius: 14,
        overflow: 'hidden',
        cursor: 'pointer',
        border: `1px solid ${highlighted ? 'var(--star-filled)' : 'var(--border)'}`,
        transition: 'border-color .3s',
      }}
    >
      <MediaBlock seed={seed} height={140} imageUrl={recipe.imageUrl} />
      <div style={{ padding: 16 }}>
        {showTags && (recipe.tags || []).length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '3px 9px',
                  borderRadius: 100,
                  background: 'var(--tag-bg)',
                  color: 'var(--tag-ink)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 17, lineHeight: 1.3, marginBottom: 8 }}>
          {recipe.title}
        </div>
        <StarRow rating={recipe.rating} onRate={(v) => onRate(recipe.id, v)} />
      </div>
    </div>
  );
}
