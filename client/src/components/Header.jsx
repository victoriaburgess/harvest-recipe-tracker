export default function Header({ onLogoClick, onAddRecipe }) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        padding: '18px 40px',
        background: 'var(--header-bg)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        <div
          onClick={onLogoClick}
          style={{
            fontFamily: "'Lora', serif",
            fontStyle: 'italic',
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: '0.2px',
            cursor: 'pointer',
          }}
        >
          Harvest
        </div>
      </div>
      <button
        onClick={onAddRecipe}
        style={{
          background: 'var(--accent)',
          color: 'var(--on-accent)',
          border: 'none',
          padding: '10px 20px',
          borderRadius: 100,
          fontWeight: 600,
          fontSize: 14,
          cursor: 'pointer',
        }}
      >
        + Add Recipe
      </button>
    </header>
  );
}
