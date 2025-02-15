import type {DescriptionSectionProps} from './types';
  
  const DescriptionSection: React.FC<DescriptionSectionProps> = ({ description }) => {
    return (
      <section className="description-section">
        <h2>Sobre el tour</h2>
        <p>{description}</p>
      </section>
    );
  };
  
  export default DescriptionSection;  