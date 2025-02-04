import React from 'react';

interface ButtonProps {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  text: string;
  type?: 'button' | 'submit';
}

const Button: React.FC<ButtonProps> = ({ onClick, text, type = 'button' }) => {
  return (
    <button onClick={onClick} type={type} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
      {text}
    </button>
  );
};

export default Button;
