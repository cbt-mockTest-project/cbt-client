import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CreateItemInput } from 'types';

interface StoreFormErrorMessageProps {
  name: keyof CreateItemInput;
}

const StoreFormErrorMessage: React.FC<StoreFormErrorMessageProps> = ({
  name,
}) => {
  const { formState } = useFormContext<CreateItemInput>();
  if (!formState.errors[name]?.message) return null;
  return (
    <div className="text-red-500 text-sm mt-1">
      {formState.errors[name]?.message}
    </div>
  );
};

export default StoreFormErrorMessage;
