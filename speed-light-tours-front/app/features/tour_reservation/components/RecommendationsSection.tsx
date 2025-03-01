import React from 'react';
import type { TourProps } from '../utils/types';

const RecommendationsSection: React.FC<Pick<TourProps, 'recommendations'>> = ({
  recommendations = '',
}) => {
  return (
    <section className="recommendations-section p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recomendaciones</h2>
      {recommendations?.trim() === '' ? (
        <p className="text-lg text-gray-600 dark:text-gray-300">
          No hay recomendaciones disponibles.
        </p>
      ) : (
        <div className="space-y-2">
          {recommendations.split('\n').map((paragraph, index) => (
            <p key={index} className="text-lg text-gray-800 dark:text-gray-200">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecommendationsSection;
