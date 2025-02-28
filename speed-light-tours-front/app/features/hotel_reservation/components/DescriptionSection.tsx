import React from 'react';
import type { DescriptionSectionProps } from './types';

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ description }) => {
  return (
    <section className="description-section p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Sobre el hospedaje</h2>
      <p className="text-lg">{description}</p>
    </section>
  );
};

export default DescriptionSection;