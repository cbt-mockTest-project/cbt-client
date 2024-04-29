import React from 'react';

interface StoreFormErrorMessageProps {
  errorMessage: string;
}

const StoreFormErrorMessage: React.FC<StoreFormErrorMessageProps> = ({
  errorMessage,
}) => {
  return <div className="text-red-500 text-sm mt-1">{errorMessage}</div>;
};

export default StoreFormErrorMessage;
