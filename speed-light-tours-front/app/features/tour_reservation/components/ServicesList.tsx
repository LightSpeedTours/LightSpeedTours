interface ServicesListProps {
    services: string[];
  }
  
  const ServicesList: React.FC<ServicesListProps> = ({ services }) => {
    return (
      <div className="services">
        <h3>Lo que ofrece este tour</h3>
        <ul>
          {services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ServicesList;