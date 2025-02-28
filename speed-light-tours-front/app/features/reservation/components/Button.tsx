import React from 'react';
import './button.css';

interface ButtonProps {
  children: React.ReactNode;
  variant: "outline" | "destructive";
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, variant, className, onClick }) => {
  const baseStyle = "button";
  const variantStyles = {
    outline: "outline",
    destructive: "destructive",
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
