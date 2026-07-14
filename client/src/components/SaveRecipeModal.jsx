import MediaBlock from './MediaBlock';

export default function SaveRecipeModal({ open, stage, urlInput, extracted, onUrlChange, onFillSample, onSubmit, onClose, onConfirm }) {
  if (!open) return null;

  const canSubmit = urlInput.trim().length > 0;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--overlay)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--card)',
          borderRadius: 16,
          maxWidth: 480,
          width: '100%',
          padding: 32,
          boxSizing: 'border-box',
          boxShadow: '0 20px 60px oklch(20% 0.02 55 / 0.25)',
        }}
      >
        {stage === 'input' && (
          <>
            <h3 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 22, margin: '0 0 6px' }}>Save a recipe</h3>
            <div style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: 18 }}>
              Paste a recipe URL and we'll pull in the details.
            </div>
            <input
              type="text"
              placeholder="https://example.com/recipe"
              value={urlInput}
              onChange={(e) => onUrlChange(e.target.value)}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '13px 16px',
                fontSize: 14,
                fontFamily: "'Work Sans', sans-serif",
                border: '1px solid var(--border-strong)',
                borderRadius: 10,
                marginBottom: 10,
              }}
            />
            <button
              onClick={onFillSample}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                fontSize: 12,
                color: 'var(--ink-muted)',
                textDecoration: 'underline',
                cursor: 'pointer',
                marginBottom: 20,
                display: 'block',
              }}
            >
              Try a sample URL
            </button>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: '1px solid var(--border-strong)',
                  color: 'var(--ink)',
                  padding: '11px 18px',
                  borderRadius: 100,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                disabled={!canSubmit}
                style={{
                  background: 'var(--accent)',
                  border: 'none',
                  color: 'var(--on-accent)',
                  padding: '11px 20px',
                  borderRadius: 100,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: canSubmit ? 'pointer' : 'not-allowed',
                  opacity: canSubmit ? 1 : 0.6,
                }}
              >
                Save Recipe
              </button>
            </div>
          </>
        )}

        {stage === 'loading' && (
          <div style={{ padding: '40px 0', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Lora', serif", fontSize: 18, marginBottom: 8 }}>Fetching recipe details…</div>
            <div style={{ fontSize: 13, color: 'var(--ink-muted)' }}>Extracting ingredients &amp; tags</div>
          </div>
        )}

        {stage === 'preview' && extracted && (
          <>
            <h3 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 20, margin: '0 0 16px' }}>Here's what we found</h3>
            <MediaBlock seed={7} height={150} imageUrl={extracted.imageUrl} radius="10px" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '14px 0 8px' }}>
              {(extracted.tags || []).map((tag) => (
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
            <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 19, marginBottom: 4 }}>{extracted.title}</div>
            <div style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 14 }}>from {extracted.sourceSite}</div>
            <div style={{ fontSize: 13, color: 'oklch(35% 0.02 55)', marginBottom: 22 }}>
              {extracted.ingredients.length ? extracted.ingredients.join(', ') : 'Ingredients not detected — you can view them on the original recipe page.'}
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: '1px solid var(--border-strong)',
                  color: 'var(--ink)',
                  padding: '11px 18px',
                  borderRadius: 100,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                Discard
              </button>
              <button
                onClick={onConfirm}
                style={{
                  background: 'var(--accent)',
                  border: 'none',
                  color: 'var(--on-accent)',
                  padding: '11px 20px',
                  borderRadius: 100,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                Add to Library
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
