import StarRating from './StarRating';

export default function ReviewCard({ review }) {
  const initial = review.reviewer_name?.charAt(0).toUpperCase() || '?';

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-avatar">
          {review.reviewer_avatar ? (
            <img src={review.reviewer_avatar} alt="" className="avatar" />
          ) : (
            <div className="avatar avatar-placeholder">{initial}</div>
          )}
        </div>
        <div className="review-meta">
          <p className="reviewer-name">{review.reviewer_name || 'Anonymous'}</p>
          <StarRating rating={review.rating} size="sm" />
        </div>
        <span className="review-date">
          {new Date(review.created_at).toLocaleDateString()}
        </span>
      </div>
      {review.comment && <p className="review-comment">{review.comment}</p>}
    </div>
  );
}
