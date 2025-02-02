import React from "react";
import Button from "./Button";
import '../app.css'; // Import the CSS file

// Header Component
const Header: React.FC = () => (
  <header className="header">
    <div className="header-logo">
      <div className="logo-placeholder"></div>
      <div className="logo-placeholder"></div>
    </div>
    <nav className="header-nav">
      <Button variant="outline">Reservas</Button>
      <Button variant="outline">Usuario</Button>
    </nav>
  </header>
);

export default Header;
