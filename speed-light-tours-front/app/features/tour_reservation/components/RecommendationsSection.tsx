import React from 'react';
import type { RecommendationsSectionProps } from './types';

const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({ recommendations }) => {
  return (
    <section className="recommendations-section p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Recomendaciones</h2>
      {recommendations.length === 0 ? (
        <p className="text-lg">No hay recomendaciones disponibles.</p>
      ) : (
        <ul className="list-disc list-inside">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="text-lg mb-2">{recommendation}</li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default RecommendationsSection;
  
  