import React from 'react';

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: 'text' | 'number';
}

const InputField: React.FC<InputFieldProps> = ({ value, onChange, placeholder, type = 'text' }) => {
  return (
    <input
      className="border p-2 rounded w-full"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default InputField;
