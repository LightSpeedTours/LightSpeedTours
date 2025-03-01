import React from 'react';

interface ButtonProps {
  onClick?: (
    e?: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>,
  ) => void | Promise<void>;
  text: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, type = 'button', disabled = false }) => {
  const buttonClasses = `bg-[#fade4b] text-black p-2 rounded transition-all duration-200 ease-in-out 
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#ffec80] hover:text-black'}`;

  return (
    <button onClick={onClick} type={type} className={buttonClasses.trim()} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
