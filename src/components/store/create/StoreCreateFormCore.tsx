import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { CreateItemInput } from 'types';
import { validateStoreCreateForm } from './StoreCreate.util';

interface StoreCreateFormCoreProps {}

const StoreCreateFormCore: React.FC<StoreCreateFormCoreProps> = () => {
  const { watch, setError, clearErrors, getFieldState } =
    useFormContext<CreateItemInput>();
  useEffect(() => {
    watch((data) => {
      if (!data.file) {
        setError('file', {
          type: 'error',
          message: '파일을 업로드해주세요.',
        });
      } else if (getFieldState('file').error) {
        clearErrors('file');
      }
      if (!data.title || data.title?.length < 3 || data.title?.length > 30) {
        setError('title', {
          type: 'error',
          message: '제목은 3글자 이상 30글자 이하로 입력해주세요.',
        });
      } else if (getFieldState('title')?.error) {
        clearErrors('title');
      }
    });
  }, [watch]);
  return null;
};

export default StoreCreateFormCore;
