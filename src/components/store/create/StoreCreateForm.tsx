import React, { useState } from 'react';
import StoreContentEditor from './StoreContentEditor';
import StoreCreateCoverImage from './StoreCreateCoverImage';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateItemInput } from 'types';
import StoreFormInput from './StoreFormInput';
import StoreFileDragger from '../common/StoreFileDragger';
import StoreCreateFormCore from './StoreCreateFormCore';
import StoreFormErrorMessage from './StoreFormErrorMessage';
import { Button, message } from 'antd';
import StoreCategorySelect from './StoreCategorySelect';
import { useCreateStoreItemMutation } from '@lib/hooks/useStoreItem.mutation';
import { handleError } from '@lib/utils/utils';
import ItemRegisterModal from './ItemRegisterModal';
import { useRouter } from 'next/router';

interface StoreCreateFormProps {
  isAgreedRef: React.MutableRefObject<boolean>;
}

const StoreCreateForm: React.FC<StoreCreateFormProps> = ({ isAgreedRef }) => {
  const router = useRouter();
  const createItemMutation = useCreateStoreItemMutation();
  const [isItemRegisterModalOpen, setIsItemRegisterModalOpen] = useState(false);
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
  const { handleSubmit, setValue, formState } = methods;
  const onSubmit = async (data: CreateItemInput) => {
    try {
      if (isAgreedRef.current === false) {
        return;
      }
      if (data.file['percent'] !== 100) {
        message.warning('파일 업로드가 진행중입니다.');
        return;
      }
      const postData: CreateItemInput = {
        ...data,
        file: {
          name: data.file.name,
          size: data.file.size,
          type: data.file.type,
          uid: data.file.uid,
        },
      };
      if (data.price > 0 && !isItemRegisterModalOpen) {
        setIsItemRegisterModalOpen(true);
        return;
      }

      const res = await createItemMutation.mutateAsync(postData);
      if (res?.createItem?.ok) {
        message.success('성공적으로 등록되었습니다.');
        router.replace(`/store`);
        return;
      }
      return message.error(res.createItem.error);
    } catch (e) {
      message.error('등록에 실패했습니다.');
      handleError(e);
    }
  };
  return (
    <FormProvider {...methods}>
      <StoreCreateFormCore isAgreedRef={isAgreedRef} />
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
        <div className="mb-2 flex gap-4 items-center w-full">
          <div className="w-full">
            <div className="text-lg font-bold mb-1" id="file">
              암기장 등록 <span className="text-sm text-gray-500">(선택)</span>
            </div>
            <pre className="text-sm text-gray-500 mb-2">
              {`암기장 등록시, 구매자에게 암기장 초대링크가 제공됩니다.`}
            </pre>
            <StoreCategorySelect
              onChange={(value) => setValue('categoryId', value)}
            />
            <StoreFormErrorMessage name="categoryId" />
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
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          loading={formState.isSubmitting}
        >
          등록하기
        </Button>
        {isItemRegisterModalOpen && (
          <ItemRegisterModal
            open={isItemRegisterModalOpen}
            onSubmit={async () => {
              await onSubmit(methods.getValues());
            }}
            onCancel={() => setIsItemRegisterModalOpen(false)}
          />
        )}
      </form>
    </FormProvider>
  );
};

export default React.memo(StoreCreateForm);
