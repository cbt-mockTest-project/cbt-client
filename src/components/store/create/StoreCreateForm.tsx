import { Input } from 'antd';
import React from 'react';
import StoreContentEditor from './StoreContentEditor';
import StoreCreateCoverImage from './StoreCreateCoverImage';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateItemInput } from 'types';
import StoreFormErrorMessage from './StoreFormErrorMessage';
import StoreFormInput from './StoreFormInput';
import StoreFileDragger from '../common/StoreFileDragger';
import StoreCreateFormCore from './StoreCreateFormCore';

interface StoreCreateFormProps {}

const StoreCreateForm: React.FC<StoreCreateFormProps> = () => {
  const methods = useForm<CreateItemInput>();
  const { handleSubmit, setValue, watch } = methods;
  const onSubmit = () => {};
  return (
    <FormProvider {...methods}>
      <StoreCreateFormCore />

      <form
        className="mt-4 w-3/5 flex flex-col gap-4 shrink-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="text-lg font-bold">제목</div>
          <StoreFormInput
            name="title"
            placeholder="자료 제목"
            size="large"
            onChange={(e) => setValue('title', e.target.value)}
          />
        </div>
        <div className="w-full">
          <div className="text-lg font-bold mb-2">가격</div>
          <StoreFormInput
            name="price"
            placeholder="가격"
            size="large"
            onChange={(e) => {
              const value = Number(e.target.value.replace(/[^0-9]/g, ''));
              setValue('price', value);
            }}
          />
        </div>
        <div className="mb-2 flex gap-4 items-center w-full">
          <div className="w-full">
            <div className="text-lg font-bold mb-2">파일 업로드</div>
            <StoreFileDragger onChage={(file) => setValue('file', file)} />
          </div>
        </div>
        <div>
          <div className="text-lg font-bold mb-2">자료소개</div>
          <StoreContentEditor
            setContent={(e) => {
              setValue('description', e);
            }}
          />
        </div>
        <div>
          <div className="text-lg font-bold mb-2">커버 이미지</div>
          <StoreCreateCoverImage />
        </div>
        <div>
          <div className="text-lg font-bold mb-2">커버 이미지</div>
          <StoreCreateCoverImage />
        </div>
      </form>
    </FormProvider>
  );
};

export default React.memo(StoreCreateForm);
