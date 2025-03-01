import React from 'react';
import type { LodgingProps } from '../utils/types';

const DescriptionSection: React.FC<Pick<LodgingProps, 'description' >> = ({ description }) => {
  return (
    <section className="description-section p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Sobre el hospedaje</h2>
      <p className="text-lg">{description}</p>
    </section>
  );
};

export default DescriptionSection;