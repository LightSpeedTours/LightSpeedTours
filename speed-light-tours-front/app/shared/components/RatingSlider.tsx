import React, { useState } from 'react';

interface RatingSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const RatingSlider: React.FC<RatingSliderProps> = ({ value, onChange }) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newRating = offsetX < rect.width / 2 ? index + 0.5 : index + 1;
    setHoverRating(newRating);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleClick = (newRating: number) => {
    onChange(newRating);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex text-3xl cursor-pointer">
        {[...Array(5)].map((_, index) => {
          const displayedRating = hoverRating !== null ? hoverRating : value;
          const isHalfStar = displayedRating === index + 0.5;
          const isFullStar = displayedRating >= index + 1;

          return (
            <span
              key={index}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(isHalfStar ? index + 0.5 : index + 1)}
              className={isFullStar || isHalfStar ? 'text-yellow-500' : 'text-gray-300'}
            >
              {isFullStar ? '★' : '☆'}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default RatingSlider;
