import React from 'react';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="flex text-yellow-500 text-2xl">
      {[...Array(5)].map((_, index) => {
        const isHalfStar = rating === index + 0.5;
        const isFullStar = rating >= index + 1;

        return (
          <span
            key={index}
            className={isFullStar || isHalfStar ? 'text-yellow-500' : 'text-gray-300'}
          >
            {isFullStar ? '★' : '☆'}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
