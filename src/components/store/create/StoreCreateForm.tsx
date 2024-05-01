import React from 'react';
import StoreContentEditor from './StoreContentEditor';
import StoreCreateCoverImage from './StoreCreateCoverImage';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateItemInput } from 'types';
import StoreFormInput from './StoreFormInput';
import StoreFileDragger from '../common/StoreFileDragger';
import StoreCreateFormCore from './StoreCreateFormCore';
import StoreFormErrorMessage from './StoreFormErrorMessage';
import { Button, message } from 'antd';

interface StoreCreateFormProps {}

const StoreCreateForm: React.FC<StoreCreateFormProps> = () => {
  const methods = useForm<CreateItemInput>({
    defaultValues: {
      title: '',
      price: 0,
      file: null,
      description: '',
      contents: '',
      thumbnail: null,
    },
  });
  const { handleSubmit, setValue } = methods;
  const onSubmit = (data: CreateItemInput) => {
    if (data.file['percent'] !== 100) {
      message.warning('파일 업로드가 진행중입니다.');
      return;
    }
    const postData = {
      ...data,
      file: {
        name: data.file.name,
        size: data.file.size,
        type: data.file.type,
        url: data.file.uid,
      },
    };
    console.log(postData);
  };
  return (
    <FormProvider {...methods}>
      <StoreCreateFormCore />
      <form
        className="mt-4 w-3/5 flex flex-col gap-4 shrink-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="text-lg font-bold" id="title">
            제목
          </div>
          <StoreFormInput
            name="title"
            placeholder="자료 제목"
            size="large"
            onChange={(e) => setValue('title', e.target.value)}
          />
        </div>
        <div className="w-full">
          <div className="text-lg font-bold mb-2" id="price">
            가격
          </div>
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
            <div className="text-lg font-bold mb-2" id="file">
              파일 업로드
            </div>
            <StoreFileDragger onChage={(file) => setValue('file', file)} />
            <StoreFormErrorMessage name="file" />
          </div>
        </div>
        <div>
          <div className="text-lg font-bold mb-2" id="description">
            자료소개
          </div>
          <StoreContentEditor
            placeholder="자료에 대한 소개를 작성해주세요."
            setContent={(e) => {
              setValue('description', e);
            }}
          />
          <StoreFormErrorMessage name="description" />
        </div>
        <div>
          <div className="text-lg font-bold mb-2" id="contents">
            목차
          </div>
          <StoreContentEditor
            placeholder="자료의 목차를 작성해주세요."
            setContent={(e) => {
              setValue('contents', e);
            }}
          />
          <StoreFormErrorMessage name="contents" />
        </div>
        <div id="thumbnail">
          <div className="text-lg font-bold mb-2">커버 이미지</div>
          <StoreCreateCoverImage />
          <StoreFormErrorMessage name="thumbnail" />
        </div>
        <Button type="primary" size="large" htmlType="submit">
          등록하기
        </Button>
      </form>
    </FormProvider>
  );
};

export default React.memo(StoreCreateForm);
