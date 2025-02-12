import React from 'react';
import '../app.css';

interface HelpAndLegalProps {
  faqLink: string;
  contactLink: string;
  termsLink: string;
  privacyLink: string;
  dataAuthLink: string;
  sicLink: string;
}

const HelpAndLegal: React.FC<HelpAndLegalProps> = ({ faqLink, contactLink, termsLink, privacyLink, dataAuthLink, sicLink }) => {
  return (
    <div className="help-legal">
      <h1><strong>Ayuda</strong></h1>
      <div>
        <a href={faqLink}>Preguntas frecuentes</a>
        <br />
        <a href={contactLink}>Contáctanos</a>
      </div>
      <h1><strong>Legal</strong></h1>
      <div>
        <a href={termsLink}>Términos y condiciones</a>
        <br />
        <a href={privacyLink}>Política de privacidad</a>
        <br />
        <a href={dataAuthLink}>Autorización de datos personales</a>
        <br />
        <a href={sicLink}>Acerca de Superintendencia de Industria y Comercio</a>
      </div>
    </div>
  );
};

export default HelpAndLegal;