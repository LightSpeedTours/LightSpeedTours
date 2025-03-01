import React from 'react';

interface ButtonProps {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  text: string;
  type?: 'button' | 'submit';
}

const Button: React.FC<ButtonProps> = ({ onClick, text, type = 'button' }) => {
  // Combine the default classes with any additional classes passed via props
  const buttonClasses = `bg-[#fade4b] text-black p-2 rounded hover:bg-[#ffec80] hover:text-black transition-all duration-200 ease-in-out break-words`;

  return (
    <button onClick={onClick} type={type} className={buttonClasses.trim()}>
      {text}
    </button>
  );
};

export default Button;