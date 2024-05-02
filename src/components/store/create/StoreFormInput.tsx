import { Input, InputProps } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { CreateItemInput } from 'types';
import StoreFormErrorMessage from './StoreFormErrorMessage';
import { useFormContext } from 'react-hook-form';
import { validateStoreCreateForm } from './StoreCreate.util';

interface StoreFormInputProps extends InputProps {
  errorMessage?: string;
  name: keyof CreateItemInput;
}

const StoreFormInput: React.FC<StoreFormInputProps> = (props) => {
  const { watch, register, getValues, setError } =
    useFormContext<CreateItemInput>();
  const { name, ...inputProps } = props;
  const [priceValue, setPriceValue] = useState('￦ 0');

  useEffect(() => {
    watch((data) => {
      if (name === 'price') {
        const value =
          typeof Number(data.price) === 'number' && data.price
            ? `￦ ${Number(data.price).toLocaleString()}`
            : `￦ 0`;
        setPriceValue(value);
      }
    });
  }, [watch]);

  useEffect(() => {
    if (name === 'price' && inputProps.defaultValue) {
      const value = `￦ ${Number(inputProps.defaultValue).toLocaleString()}`;
      setPriceValue(value);
    }
  }, [inputProps.defaultValue, name]);

  return (
    <div className="flex flex-col w-full gap-0">
      <Input
        {...inputProps}
        {...(name === 'price' ? { value: priceValue } : {})}
      />
      <StoreFormErrorMessage name={name} />
    </div>
  );
};

export default React.memo(StoreFormInput);
