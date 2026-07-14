import { mediaStyle } from '../lib/data';

export default function MediaBlock({ seed, height, imageUrl, radius, fontSize = 11 }) {
  const style = mediaStyle(seed, height, imageUrl, radius);
  return (
    <div style={style}>
      {!imageUrl && (
        <span
          style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize,
            color: 'oklch(45% 0.02 55 / 0.65)',
            letterSpacing: '0.3px',
          }}
        >
          recipe photo
        </span>
      )}
    </div>
  );
}
