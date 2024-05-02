import { UploadFile, UploadProps, message } from 'antd';
import axios, { Canceler } from 'axios';
import { omit, uniqueId } from 'lodash';
import React, { useEffect, useState } from 'react';
import StoreCustomDragger from './StoreCustomDragger';
import { fixEncoding } from '@lib/utils/utils';
import { ItemFileType } from 'types';
import { apolloClient } from '@modules/apollo';
import { GET_PRESIGNED_URL } from '@lib/graphql/query/userQuery';
import { GetPresignedUrlQuery } from '@lib/graphql/query/userQuery.generated';

interface StoreFileDraggerProps {
  defaultFile?: ItemFileType;
  onChage: (value: ItemFileType) => void;
}

interface UploadFileWithCancel extends UploadFile {
  cancelToken?: Canceler;
}

const StoreFileDragger: React.FC<StoreFileDraggerProps> = ({
  onChage,
  defaultFile,
}) => {
  const [fileData, setFileData] = useState<UploadFileWithCancel | null>(null);
  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    fileList: fileData ? [fileData] : [],
    showUploadList: true,
    beforeUpload(uploadFile) {
      if (fileData?.cancelToken) {
        fileData.cancelToken('User canceled');
        onChage(null);
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
      onChage(null);
      setFileData(null);
    },
    customRequest: async ({ file, onSuccess, onError, onProgress }) => {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', 'items');
        const { token, cancel } = axios.CancelToken.source();
        const uploadingId = uniqueId('uploading_');
        const newFileData: UploadFileWithCancel = {
          name: (file as Blob).name,
          size: (file as Blob).size,
          type: (file as Blob).type,
          percent: 0,
          status: 'uploading',
          uid: uploadingId,
          cancelToken: cancel,
        };
        onChage(omit(newFileData, ['cancelToken']) as ItemFileType);
        setFileData(newFileData);
        const {
          data: { getPresignedUrl },
        } = await apolloClient.query<GetPresignedUrlQuery>({
          query: GET_PRESIGNED_URL,
          variables: {
            input: {
              path: 'items',
            },
          },
          fetchPolicy: 'no-cache',
        });
        if (getPresignedUrl.error) {
          message.error('파일 업로드에 실패했습니다.');
          throw new Error(getPresignedUrl.error);
        }

        const res = await axios.put(getPresignedUrl.presignedUrl, formData, {
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
        });
        const successFileData: UploadFileWithCancel = {
          ...newFileData,
          percent: 100,
          status: 'done',
          uid: getPresignedUrl.fileUrl,
        };
        onChage(omit(successFileData, ['cancelToken']) as ItemFileType);
        setFileData(successFileData);
        onSuccess && onSuccess(res);
      } catch (e: any) {
        onError && onError(e);
      }
    },
  };
  // useEffect(() => {
  //   if (!fileData?.uid || fileData?.uid.includes('uploading')) return;

  // }, [fileData]);

  useEffect(() => {
    if (!defaultFile) return;
    setFileData(() => ({
      uid: defaultFile.uid,
      name: fixEncoding(defaultFile.name),
      size: defaultFile.size,
      percent: 100,
      status: 'done',
    }));
  }, [defaultFile]);
  return (
    <StoreCustomDragger
      {...uploadProps}
      mainText="파일을 업로드해주세요."
      subText="1GB 이하의 파일만 업로드 가능합니다."
    />
  );
};

export default StoreFileDragger;
