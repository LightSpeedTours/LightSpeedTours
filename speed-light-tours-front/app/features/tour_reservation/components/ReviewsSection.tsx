import type { ReviewsSectionProps } from './types';
  
  const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
    return (
      <section className="reviews-section">
        <h2>Reseñas de viajeros</h2>
        {reviews.length === 0 ? (
          <p>Aún no hay reseñas.</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="review">
              <h4>{review.user}</h4>
              <p>⭐ {review.rating} / 5</p>
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </section>
    );
  };
  
  export default ReviewsSection;  