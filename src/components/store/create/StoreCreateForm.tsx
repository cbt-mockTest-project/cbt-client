import React, { useState } from 'react';
import StoreContentEditor from './StoreContentEditor';
import StoreCreateCoverImage from './StoreCreateCoverImage';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateItemInput, ItemRevision, UpdateItemInput } from 'types';
import StoreFormInput from './StoreFormInput';
import StoreFileDragger from '../common/StoreFileDragger';
import StoreCreateFormCore from './StoreCreateFormCore';
import StoreFormErrorMessage from './StoreFormErrorMessage';
import { Button, message } from 'antd';
import StoreCategorySelect from './StoreCategorySelect';
import {
  useCreateStoreItemMutation,
  useUpdateStoreItemMutation,
} from '@lib/hooks/useStoreItem.mutation';
import {
  handleError,
  replaceSpaceSlashAndSpecialCharsToHyphen,
} from '@lib/utils/utils';
import ItemRegisterModal from './ItemRegisterModal';
import { useRouter } from 'next/router';

interface StoreCreateFormProps {
  isAgreedRef: React.MutableRefObject<boolean>;
  defaultValues?: ItemRevision;
}

const StoreCreateForm: React.FC<StoreCreateFormProps> = ({
  isAgreedRef,
  defaultValues,
}) => {
  const router = useRouter();
  const createItemMutation = useCreateStoreItemMutation();
  const updateItemMutation = useUpdateStoreItemMutation();
  const [isItemRegisterModalOpen, setIsItemRegisterModalOpen] = useState(false);
  const methods = useForm<CreateItemInput | UpdateItemInput>({
    defaultValues: defaultValues
      ? {
          id: defaultValues.item.id,
          title: defaultValues.title,
          price: defaultValues.price,
          file: {
            ...defaultValues.file,
            percent: 100,
            status: 'done',
            page: defaultValues.file.page,
            previewImages: defaultValues.file.previewImages,
            previewImagesCount: defaultValues.file.previewImagesCount,
          } as unknown as ItemRevision['file'],
          description: defaultValues.description,
          contents: defaultValues.contents,
          thumbnail: defaultValues.thumbnail,
          categoryId: defaultValues.category?.id,
        }
      : {
          title: '',
          price: 0,
          file: null,
          description: '',
          contents: '',
          thumbnail: null,
        },
  });
  const { handleSubmit, setValue, formState, getValues } = methods;
  const onSubmit = async (data: CreateItemInput | UpdateItemInput) => {
    try {
      if (isAgreedRef.current === false) {
        return;
      }
      if (data.file['percent'] !== 100) {
        message.warning('파일 업로드가 진행중입니다.');
        return;
      }
      const postData: CreateItemInput | UpdateItemInput = {
        ...data,
        file: {
          name: data.file.name,
          size: data.file.size,
          type: data.file.type,
          uid: data.file.uid,
          page: data.file.page,
          previewImages: data.file.previewImages,
          previewImagesCount: data.file.previewImagesCount,
        },
      };
      if (data.price > 0 && !isItemRegisterModalOpen) {
        setIsItemRegisterModalOpen(true);
        return;
      }
      const isEditMode = !!defaultValues;
      if (isEditMode) {
        const res = await updateItemMutation.mutateAsync(
          postData as UpdateItemInput
        );
        if (res.updateItem?.ok) {
          if (data.price > 0) {
            message.success('수정요청이 완료되었습니다.');
          }
          if (data.price === 0) {
            message.success('성공적으로 수정되었습니다.');
          }
          router.replace(`/store`);
          return;
        }
      }
      if (!isEditMode) {
        (postData as CreateItemInput).urlSlug =
          replaceSpaceSlashAndSpecialCharsToHyphen(data.title);
        const res = await createItemMutation.mutateAsync(
          postData as CreateItemInput
        );
        if (res?.createItem?.ok) {
          message.success('성공적으로 등록되었습니다.');
          router.replace(`/store`);
          return;
        }
        return message.error(res.createItem.error);
      }
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
            defaultValue={getValues('title')}
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
            defaultValue={getValues('price')}
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
            <StoreFileDragger
              onChageFile={(file) => setValue('file', file)}
              defaultFile={getValues('file')}
            />
            <StoreFormErrorMessage name="file" />
          </div>
        </div>
        <div>
          <div className="text-lg font-bold mb-2" id="description">
            자료소개
          </div>
          <StoreContentEditor
            defaultValue={getValues('description')}
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
            defaultValue={getValues('contents')}
            placeholder="자료의 목차를 작성해주세요."
            setContent={(e) => {
              setValue('contents', e);
            }}
          />
          <StoreFormErrorMessage name="contents" />
        </div>
        <div id="thumbnail">
          <div className="text-lg font-bold mb-2">커버 이미지</div>
          <StoreCreateCoverImage
            onChangeImage={(url) => setValue('thumbnail', url)}
            defaultUrl={getValues('thumbnail')}
            defaultTitle={getValues('title')}
            defaultDescription={getValues('description')}
          />
          <StoreFormErrorMessage name="thumbnail" />
        </div>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          loading={formState.isSubmitting}
        >
          {defaultValues ? '수정하기' : '등록하기'}
        </Button>
        {isItemRegisterModalOpen && (
          <ItemRegisterModal
            title={defaultValues ? '판매 상품 수정신청' : '판매 상품 등록신청'}
            okText={defaultValues ? '수정 신청' : '판매 신청'}
            cancelText="취소"
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
