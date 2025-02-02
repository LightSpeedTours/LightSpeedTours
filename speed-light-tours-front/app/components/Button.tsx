import React from 'react';
import '../app.css';

interface ButtonProps {
  children: React.ReactNode;
  variant: "outline" | "destructive";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant, className }) => {
  const baseStyle = "button";
  const variantStyles = {
    outline: "outline",
    destructive: "destructive",
  };

  return (
    <button className={`${baseStyle} ${variantStyles[variant]} ${className || ''}`}>
      {children}
    </button>
  );
};

export default Button;