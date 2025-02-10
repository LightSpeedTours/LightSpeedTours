import React from 'react';

interface ButtonProps {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  text: string;
  type?: 'button' | 'submit';
  className?: string; // Add className to the props
}

const Button: React.FC<ButtonProps> = ({ onClick, text, type = 'button', className }) => {
  // Combine the default classes with any additional classes passed via props
  const buttonClasses = `bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${className || ''}`;

  return (
    <button onClick={onClick} type={type} className={buttonClasses.trim()}>
      {text}
    </button>
  );
};

export default Button;