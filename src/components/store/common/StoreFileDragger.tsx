import { Button, Skeleton, UploadFile, UploadProps, message } from 'antd';
import axios, { Canceler } from 'axios';
import { omit, set, uniqueId } from 'lodash';
import React, { useEffect, useState } from 'react';
import StoreCustomDragger from './StoreCustomDragger';
import { CreateItemInput, ItemFileType } from 'types';
import { apolloClient } from '@modules/apollo';
import { GET_PRESIGNED_URL } from '@lib/graphql/query/userQuery';
import { GetPresignedUrlQuery } from '@lib/graphql/query/userQuery.generated';
import { RcFile } from 'antd/es/upload';
import { pdfjs } from 'react-pdf';
import StoreGallery from './StoreGallery';
import StorePreviewSelectModal from '../create/StorePreviewSelectModal';
import { useFormContext } from 'react-hook-form';
import { uploadAPI } from '@lib/apis/upload';
import { base64ToBlob } from '@lib/utils/utils';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface StoreFileDraggerProps {
  defaultFile?: ItemFileType;
  onChageFile: (value: ItemFileType) => void;
}

export interface UploadFileWithCancel extends UploadFile {
  cancelToken?: Canceler;
  page?: number;
  previewImages?: string[];
  previewImagesCount?: number;
}

const StoreFileDragger: React.FC<StoreFileDraggerProps> = ({
  onChageFile,
  defaultFile,
}) => {
  const { watch } = useFormContext<CreateItemInput>();
  const [isPreviewSelectModalOpen, setIsPreviewSelectModalOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileData, setFileData] = useState<UploadFileWithCancel | null>(
    defaultFile
      ? {
          uid: defaultFile.uid,
          name: defaultFile.name,
          size: defaultFile.size,
          type: defaultFile.type,
          page: defaultFile.page,
          previewImages: defaultFile.previewImages,
          previewImagesCount: defaultFile.previewImagesCount,
          percent: 100,
          status: 'done',
        }
      : null
  );

  const uploadProps: UploadProps = {
    name: 'file',
    accept: '.pdf',
    multiple: false,
    fileList: fileData ? [fileData] : [],
    showUploadList: true,
    beforeUpload(uploadFile) {
      if (fileData?.cancelToken) {
        fileData.cancelToken('User canceled');
        onChageFile(null);
        setFileData(null);
      }
      // 개별 파일 1GB 제한
      if (uploadFile.size > 1024 * 1024 * 1024) {
        message.error('1GB 이하의 파일만 업로드 가능합니다.');
        return false;
      }
      return true;
    },
    // fileList: [file],
    onRemove: (file: any) => {
      if (file.cancelToken) {
        file.cancelToken('User canceled');
      }
      onChageFile(null);
      setFileData(null);
    },
    customRequest: async ({ file, onSuccess, onError, onProgress }) => {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', 'items');
        const { token, cancel } = axios.CancelToken.source();
        const uploadingId = uniqueId('uploading_');
        const arrayBuffer = await (file as RcFile).arrayBuffer();
        const loadingTask = pdfjs.getDocument(arrayBuffer);
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;
        const newFileData: UploadFileWithCancel = {
          ...watch('file'),
          name: (file as Blob).name,
          size: (file as Blob).size,
          type: (file as Blob).type,
          percent: 0,
          status: 'uploading',
          uid: uploadingId,
          cancelToken: cancel,
          page: numPages,
        };
        onChageFile(omit(newFileData, ['cancelToken']) as ItemFileType);
        setFileData(newFileData);
        const {
          data: { getPresignedUrl: getPresignedUrlForFile },
        } = await apolloClient.query<GetPresignedUrlQuery>({
          query: GET_PRESIGNED_URL,
          variables: {
            input: {
              path: 'items',
            },
          },
        });

        if (getPresignedUrlForFile.error) {
          message.error('파일 업로드에 실패했습니다.');
          throw new Error(getPresignedUrlForFile.error);
        }
        const imagePromises: Promise<string>[] = [];
        for (let i = 1; i <= Math.min(numPages, 10); i++) {
          imagePromises.push(
            pdf.getPage(i).then(async (page) => {
              const scale = 1.5;
              const viewport = page.getViewport({ scale: scale });
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              const base64 = await page
                .render({ canvasContext: context, viewport: viewport })
                .promise.then(() => {
                  return canvas.toDataURL();
                });
              const formData = new FormData();
              formData.append('file', base64ToBlob(base64));
              formData.append('path', 'previews');
              const res = await uploadAPI(formData, {
                cancelToken: token,
              });
              return res.data.url;
            })
          );
        }

        const res = await axios.put(
          getPresignedUrlForFile.presignedUrl,
          formData,
          {
            onUploadProgress: (e) => {
              if (onProgress && e.total) {
                onProgress({ percent: (e.loaded / e.total) * 95 });
                setFileData((prev) => ({
                  ...prev,
                  percent: (e.loaded / (e.total || 1)) * 95,
                }));
              }
            },
            cancelToken: token,
          }
        );
        const previewImages = await Promise.all(imagePromises);
        const successFileData: UploadFileWithCancel = {
          ...newFileData,
          percent: 100,
          status: 'done',
          uid: getPresignedUrlForFile.fileUrl,
          previewImages,
          previewImagesCount: 3,
        };
        onChageFile(omit(successFileData, ['cancelToken']) as ItemFileType);
        setFileData(successFileData);
        onSuccess && onSuccess(res);
      } catch (e: any) {
        onError && onError(e);
      } finally {
        setIsLoading(false);
      }
    },
  };

  return (
    <div>
      <StoreCustomDragger
        {...uploadProps}
        mainText="파일을 업로드해주세요."
        subText="용량 제한: 1GB 이하, 확장자 제한: PDF"
      />
      {isLoading && (
        <div className="mt-4 flex flex-col gap-4">
          <Skeleton active />
          <Skeleton active />
        </div>
      )}
      {!isLoading && fileData?.previewImages?.length > 0 && (
        <div className="mt-4">
          <div className="flex gap-4 items-end justify-between">
            <div>
              <div className="text-lg font-bold">미리보기</div>
              <div className="text-sm text-gray-500 mb-2">
                상품 상세페이지에 표시될 이미지입니다.
              </div>
            </div>
            <Button
              className="mb-2"
              type="dashed"
              onClick={() => setIsPreviewSelectModalOpen(true)}
              size="small"
            >
              미리보기 이미지 변경
            </Button>
          </div>
          <StoreGallery
            images={fileData?.previewImages.slice(
              0,
              fileData.previewImagesCount
            )}
          />
        </div>
      )}
      {isPreviewSelectModalOpen && (
        <StorePreviewSelectModal
          onChageFile={onChageFile}
          fileData={fileData}
          setFileData={setFileData}
          open={isPreviewSelectModalOpen}
          onCancel={() => {
            setIsPreviewSelectModalOpen(false);
          }}
          onClose={() => {
            setIsPreviewSelectModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default StoreFileDragger;
