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
  const { watch, getFieldState, getValues, formState } =
    useFormContext<CreateItemInput>();
  const prevData = useRef<any>(null);
  const { name, ...inputProps } = props;
  const [priceValue, setPriceValue] = useState('');

  useEffect(() => {
    watch((data) => {
      console.log(data.title);
      console.log(getValues('title'));
      if (name === 'price') {
        const value =
          typeof Number(data.price) === 'number' && data.price
            ? `￦ ${Number(data.price).toLocaleString()}`
            : `￦ 0`;
        setPriceValue(value);
      }
    });
  }, [watch]);

  // useEffect(() => {
  //   console.log(formState.errors[name]);
  // }, [formState.errors[name]]);
  return (
    <div className="flex flex-col w-full gap-0">
      <Input
        {...inputProps}
        {...(name === 'price' ? { value: priceValue } : {})}
      />
      {/* {getFieldState[name]?.error && (
        <StoreFormErrorMessage errorMessage={getFieldState[name].error} />
      )} */}
      {/* {formState.errors[name] && (
        <StoreFormErrorMessage errorMessage={formState.errors[name].message} />
      )} */}
    </div>
  );
};

export default React.memo(StoreFormInput);
