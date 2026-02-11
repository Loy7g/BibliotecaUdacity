import { useState } from 'react';
import './StarRating.css';

const StarRating = ({ rating = 0, onRatingChange, readonly = false, size = 'medium' }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value) => {
    if (!readonly && onRatingChange) {
      if (value === rating) {
        onRatingChange(0);
      } else {
        onRatingChange(value);
      }
    }
  };

  const handleMouseEnter = (value) => {
    if (!readonly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div className={`star-rating ${size} ${readonly ? 'readonly' : 'interactive'}`}>
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star ${star <= displayRating ? 'filled' : 'empty'} ${
              hoverRating > 0 && star <= hoverRating ? 'hover' : ''
            }`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            disabled={readonly}
            aria-label={`${star} estrela${star > 1 ? 's' : ''}`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill={star <= displayRating ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ))}
      </div>
      {!readonly && rating > 0 && (
        <span className="rating-text">
          {rating === 1 && '⭐ Fraco'}
          {rating === 2 && '⭐⭐ Regular'}
          {rating === 3 && '⭐⭐⭐ Bom'}
          {rating === 4 && '⭐⭐⭐⭐ Muito Bom'}
          {rating === 5 && '⭐⭐⭐⭐⭐ Excelente'}
        </span>
      )}
      {readonly && rating > 0 && (
        <span className="rating-value">{rating}/5</span>
      )}
    </div>
  );
};

export default StarRating;
