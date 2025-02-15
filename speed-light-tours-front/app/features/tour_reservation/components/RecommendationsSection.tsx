import type {RecommendationsSectionProps} from './types';
  
  const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({ recommendations }) => {
    return (
      <section className="recommendations-section">
        <h2>Recomendaciones</h2>
        {recommendations.length === 0 ? (
          <p>No hay recomendaciones disponibles.</p>
        ) : (
          <ul>
            {recommendations.map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        )}
      </section>
    );
  };
  
  export default RecommendationsSection;
  
  