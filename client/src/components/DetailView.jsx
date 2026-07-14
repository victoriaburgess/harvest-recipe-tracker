import { useState } from 'react';
import { DISH_TYPES } from '../lib/data';
import MediaBlock from './MediaBlock';
import StarRow from './StarRow';

export default function DetailView({ recipe, onBack, onRate, onNotesChange, onToggleCategory, onTitleChange, onIngredientsChange }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [draftTitle, setDraftTitle] = useState(recipe.title);

  const startEditTitle = () => {
    setDraftTitle(recipe.title);
    setIsEditingTitle(true);
  };
  const cancelEditTitle = () => {
    setDraftTitle(recipe.title);
    setIsEditingTitle(false);
  };
  const saveTitle = () => {
    const trimmed = draftTitle.trim();
    if (!trimmed) return;
    onTitleChange(recipe.id, trimmed);
    setIsEditingTitle(false);
  };

  const [isEditingIngredients, setIsEditingIngredients] = useState(false);
  const [draftIngredients, setDraftIngredients] = useState(recipe.ingredients);

  const startEditIngredients = () => {
    setDraftIngredients(recipe.ingredients.length ? recipe.ingredients : ['']);
    setIsEditingIngredients(true);
  };
  const cancelEditIngredients = () => {
    setDraftIngredients(recipe.ingredients);
    setIsEditingIngredients(false);
  };
  const saveIngredients = () => {
    const cleaned = draftIngredients.map((i) => i.trim()).filter(Boolean);
    onIngredientsChange(recipe.id, cleaned);
    setIsEditingIngredients(false);
  };
  const updateIngredientAt = (index, value) => {
    setDraftIngredients((prev) => prev.map((ing, i) => (i === index ? value : ing)));
  };
  const removeIngredientAt = (index) => {
    setDraftIngredients((prev) => prev.filter((_, i) => i !== index));
  };
  const addIngredientRow = () => {
    setDraftIngredients((prev) => [...prev, '']);
  };

  const [draftNotes, setDraftNotes] = useState(recipe.notes || '');
  const [justSavedNotes, setJustSavedNotes] = useState(false);
  const notesDirty = draftNotes !== (recipe.notes || '');

  const saveNotes = () => {
    onNotesChange(recipe.id, draftNotes);
    setJustSavedNotes(true);
    setTimeout(() => setJustSavedNotes(false), 2000);
  };

  return (
    <main style={{ flex: 1, maxWidth: 820, margin: '0 auto', padding: '40px 40px 80px', width: '100%', boxSizing: 'border-box' }}>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onBack();
        }}
        style={{ display: 'inline-block', fontSize: 13, fontWeight: 600, textDecoration: 'none', marginBottom: 20 }}
      >
        ← Back to Library
      </a>

      <MediaBlock seed={recipe.id} height={280} imageUrl={recipe.imageUrl} radius="14px" fontSize={12} />

      <div style={{ margin: '22px 0 20px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
          Category
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {DISH_TYPES.map((cat) => {
            const active = (recipe.tags || []).includes(cat);
            return (
              <button
                key={cat}
                onClick={() => onToggleCategory(recipe.id, cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 100,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: `1px solid ${active ? 'var(--accent)' : 'var(--border-strong)'}`,
                  background: active ? 'var(--accent)' : 'transparent',
                  color: active ? 'var(--on-accent)' : 'var(--ink)',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {isEditingTitle ? (
        <div style={{ marginBottom: 20 }}>
          <input
            autoFocus
            type="text"
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveTitle();
              if (e.key === 'Escape') cancelEditTitle();
            }}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              fontFamily: "'Lora', serif",
              fontWeight: 600,
              fontSize: 36,
              lineHeight: 1.15,
              padding: '8px 12px',
              border: '1px solid var(--border-strong)',
              borderRadius: 10,
              background: 'var(--card)',
              color: 'var(--ink)',
              marginBottom: 10,
            }}
          />
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={cancelEditTitle}
              style={{
                background: 'none',
                border: '1px solid var(--border-strong)',
                color: 'var(--ink)',
                padding: '9px 16px',
                borderRadius: 100,
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              onClick={saveTitle}
              disabled={!draftTitle.trim()}
              style={{
                background: 'var(--accent)',
                border: 'none',
                color: 'var(--on-accent)',
                padding: '9px 18px',
                borderRadius: 100,
                fontWeight: 600,
                fontSize: 13,
                cursor: draftTitle.trim() ? 'pointer' : 'not-allowed',
                opacity: draftTitle.trim() ? 1 : 0.6,
              }}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 8 }}>
          <h1 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 36, lineHeight: 1.15, margin: 0 }}>{recipe.title}</h1>
          <button
            onClick={startEditTitle}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--ink-muted)',
              textDecoration: 'underline',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            Edit
          </button>
        </div>
      )}
      <div style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: 20 }}>from {recipe.sourceSite}</div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 32,
          padding: '16px 20px',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 12,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-muted)' }}>Your rating:</span>
        <StarRow rating={recipe.rating} onRate={(v) => onRate(recipe.id, v)} size={22} gap={4} />
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 12 }}>
        <h3 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 19, margin: 0 }}>Ingredients</h3>
        {!isEditingIngredients && (
          <button
            onClick={startEditIngredients}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--ink-muted)',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Edit
          </button>
        )}
      </div>

      {isEditingIngredients ? (
        <div style={{ marginBottom: 32 }}>
          {draftIngredients.map((ing, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <input
                type="text"
                value={ing}
                autoFocus={i === draftIngredients.length - 1 && ing === ''}
                onChange={(e) => updateIngredientAt(i, e.target.value)}
                placeholder="e.g. 2 cups flour"
                style={{
                  flex: 1,
                  boxSizing: 'border-box',
                  fontSize: 15,
                  padding: '10px 12px',
                  border: '1px solid var(--border-strong)',
                  borderRadius: 8,
                  background: 'var(--card)',
                  color: 'var(--ink)',
                }}
              />
              <button
                onClick={() => removeIngredientAt(i)}
                aria-label="Remove ingredient"
                style={{
                  background: 'none',
                  border: '1px solid var(--border-strong)',
                  color: 'var(--ink-muted)',
                  width: 34,
                  height: 34,
                  flexShrink: 0,
                  borderRadius: 8,
                  fontSize: 16,
                  lineHeight: 1,
                  cursor: 'pointer',
                }}
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={addIngredientRow}
            style={{
              background: 'none',
              border: '1px dashed var(--border-strong)',
              color: 'var(--ink)',
              padding: '9px 16px',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
              marginBottom: 16,
              width: '100%',
            }}
          >
            + Add ingredient
          </button>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={cancelEditIngredients}
              style={{
                background: 'none',
                border: '1px solid var(--border-strong)',
                color: 'var(--ink)',
                padding: '9px 16px',
                borderRadius: 100,
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              onClick={saveIngredients}
              style={{
                background: 'var(--accent)',
                border: 'none',
                color: 'var(--on-accent)',
                padding: '9px 18px',
                borderRadius: 100,
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Save
            </button>
          </div>
        </div>
      ) : recipe.ingredients.length > 0 ? (
        <ul style={{ margin: '0 0 32px', paddingLeft: 20, lineHeight: 1.9, fontSize: 15 }}>
          {recipe.ingredients.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      ) : (
        <div style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: 32 }}>
          Not detected — see the original recipe for ingredients, or click Edit to add your own.
        </div>
      )}

      <h3 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 19, margin: '0 0 12px' }}>My Notes</h3>
      <textarea
        placeholder="Jot down tweaks, substitutions, or how it turned out..."
        value={draftNotes}
        onChange={(e) => setDraftNotes(e.target.value)}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          minHeight: 100,
          padding: '14px 16px',
          fontSize: 14,
          fontFamily: "'Work Sans', sans-serif",
          lineHeight: 1.6,
          border: '1px solid var(--border)',
          borderRadius: 12,
          background: 'var(--card)',
          color: 'var(--ink)',
          resize: 'vertical',
          marginBottom: 12,
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <button
          onClick={saveNotes}
          disabled={!notesDirty}
          style={{
            background: notesDirty ? 'var(--accent)' : 'transparent',
            border: `1px solid ${notesDirty ? 'var(--accent)' : 'var(--border-strong)'}`,
            color: notesDirty ? 'var(--on-accent)' : 'var(--ink-muted)',
            padding: '10px 20px',
            borderRadius: 100,
            fontWeight: 600,
            fontSize: 13,
            cursor: notesDirty ? 'pointer' : 'not-allowed',
          }}
        >
          Save Note
        </button>
        {justSavedNotes && <span style={{ fontSize: 13, color: 'var(--star-filled)', fontWeight: 600 }}>Saved ✓</span>}
      </div>

      <a
        href={recipe.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          background: 'var(--accent)',
          color: 'var(--on-accent)',
          textDecoration: 'none',
          padding: '13px 24px',
          borderRadius: 100,
          fontWeight: 600,
          fontSize: 14,
        }}
      >
        View Original Recipe →
      </a>
    </main>
  );
}
