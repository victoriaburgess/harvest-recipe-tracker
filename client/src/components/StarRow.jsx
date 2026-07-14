import { starColor } from '../lib/data';

export default function StarRow({ rating, onRate, size = 14, gap = 3 }) {
  return (
    <div style={{ display: 'flex', gap }}>
      {[1, 2, 3, 4, 5].map((v) => (
        <span
          key={v}
          onClick={(e) => {
            e.stopPropagation();
            onRate(v);
          }}
          style={{ fontSize: size, cursor: 'pointer', color: starColor(v <= rating) }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
