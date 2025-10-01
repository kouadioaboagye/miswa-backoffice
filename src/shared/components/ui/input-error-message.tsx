import React from 'react';

interface InputErrorMessageProps {
  message?: string;
}

const InputErrorMessage: React.FC<InputErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <p className="error-message text-red-500 text-[12px] mt-1">
      {message}
    </p>
  );
};

export default InputErrorMessage;

