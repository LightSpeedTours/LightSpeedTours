import React from 'react';
import type { ButtonProps } from '../utils/ReservationTypes';
import './button.css';

const Button: React.FC<ButtonProps> = ({ children, variant, className, onClick }) => {
  const baseStyle = 'button';
  const variantStyles = {
    outline: 'outline',
    destructive: 'destructive',
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
