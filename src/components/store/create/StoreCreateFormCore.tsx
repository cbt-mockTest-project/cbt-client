import React, { useEffect, useRef } from 'react';
import { DeepPartial, useFormContext } from 'react-hook-form';
import { CreateItemInput } from 'types';
import { validateStoreCreateForm } from './StoreCreate.util';
import { cloneDeep } from 'lodash';
import { useRouter } from 'next/router';

interface StoreCreateFormCoreProps {}

const StoreCreateFormCore: React.FC<StoreCreateFormCoreProps> = () => {
  const router = useRouter();
  const {
    watch,
    setError,
    clearErrors,
    getFieldState,
    getValues,
    formState: { errors, isSubmitting },
  } = useFormContext<CreateItemInput>();
  const prevData = useRef<DeepPartial<CreateItemInput>>();
  useEffect(() => {
    prevData.current = cloneDeep(getValues());
    watch((data) => {
      for (const key in data) {
        if (prevData.current[key] !== data[key]) {
          // 현재 변하고 있는 데이터
          const typedKey = key as keyof CreateItemInput;
          const error = validateStoreCreateForm(data, typedKey);
          if (error) {
            setError(typedKey, {
              type: 'error',
              message: error,
            });
          } else if (getFieldState(typedKey)?.error) {
            clearErrors(typedKey);
          }
        }
      }
      prevData.current = JSON.parse(JSON.stringify(data));
    });
  }, [watch]);

  useEffect(() => {
    if (!isSubmitting) return;
    Object.keys(getValues()).forEach((key) => {
      const typedKey = key as keyof CreateItemInput;
      const error = validateStoreCreateForm(getValues(), typedKey);
      if (error) {
        setError(typedKey, {
          type: 'error',
          message: error,
        });
      }
    });
    const errorKeys = Object.keys(errors);
    const firstErrorKey = errorKeys[0] as keyof CreateItemInput;
    if (!firstErrorKey) return;
    document.querySelector(`#${firstErrorKey}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [errors, isSubmitting]);
  return null;
};

export default StoreCreateFormCore;
