export default function StarRating({ rating, onRate, size = 'md' }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={`stars stars-${size}`}>
      {stars.map((star) => (
        <span
          key={star}
          className={`star ${star <= Math.round(rating) ? 'filled' : ''} ${onRate ? 'clickable' : ''}`}
          onClick={() => onRate && onRate(star)}
          role={onRate ? 'button' : undefined}
          tabIndex={onRate ? 0 : undefined}
        >
          ★
        </span>
      ))}
    </div>
  );
}
