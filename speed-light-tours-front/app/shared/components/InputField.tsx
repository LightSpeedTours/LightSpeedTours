import React, { useState } from 'react';

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: 'text' | 'number';
  minLength?: number;
  maxLength?: number;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ value, onChange, placeholder, type = 'text', minLength, maxLength, required }) => {
  const [error, setError] = useState('');

  const handleBlur = () => {
    if (required && !value.trim()) {
      setError('Este campo es obligatorio');
    } else if (minLength && value.length < minLength) {
      setError(`Debe tener al menos ${minLength} caracteres`);
    } else if (maxLength && value.length > maxLength) {
      setError(`Debe tener menos de ${maxLength} caracteres`);
    } else {
      setError('');
    }
  };

  return (
    <div>
      <input
        className="border p-2 rounded w-full"
        type={type}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
