import React from 'react';
import type { ReviewsSectionProps } from './types';
import StarRating from 'app/shared/components/StarRating';

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <section className="reviews-section p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Reseñas de huespedes</h2>
      {reviews.length === 0 ? (
        <p className="text-lg">Aún no hay reseñas.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((review, index) => (
            <div key={index} className="review p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
              <h4 className="text-lg font-semibold mb-2">{review.user}</h4>
              <StarRating rating={review.rating} />
              <p className="text-lg mt-2">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;