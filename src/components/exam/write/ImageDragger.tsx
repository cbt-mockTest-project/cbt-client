import { InboxOutlined } from '@ant-design/icons';
import { message, UploadFile, UploadProps } from 'antd';
import Dragger, { DraggerProps } from 'antd/lib/upload/Dragger';
import axios from 'axios';
import React from 'react';
import styled from 'styled-components';

interface ImageDraggerProps {
  text?: string;
  hint?: string;
  images: UploadFile<any>[];
  setImages: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
}

const ImageDragger: React.FC<ImageDraggerProps> = ({
  text,
  hint,
  images,
  setImages,
}) => {
  const questionImageDraagerProps: UploadProps = {
    name: 'file',
    multiple: false,
    // accept: 'image/*',
    fileList:
      images.length >= 1 ? [{ ...images[0], thumbUrl: images[0].url }] : [],
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', 'exam');
        const result = await axios.post(
          `${process.env.NEXT_PUBLIC_RESTAPI_URL}uploads`,
          formData
        );
        setImages([
          {
            url: result.data.url,
            uid: result.data.url,
            name: (file as File)?.name,
          },
        ]);
        onSuccess && onSuccess('ok');
      } catch (e: any) {
        onError && onError(e);
      }
    },
    beforeUpload(file) {
      // 2MB 이하만 업로드 가능
      if (file.size > 2 * 1024 * 1024) {
        message.error('파일은 2MB 이하만 업로드 가능합니다.');
        return false;
      }
      // png, jpg, jpeg만 업로드 가능
      if (
        file.type !== 'image/png' &&
        file.type !== 'image/jpg' &&
        file.type !== 'image/jpeg'
      ) {
        message.error('파일은 png, jpg, jpeg만 업로드 가능합니다.');
        return false;
      }
    },
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`이미지가 등록되었습니다.`);
      } else if (status === 'error') {
        message.error(`이미지 등록에 실패했습니다.`);
      }
    },
    onRemove() {
      setImages([]);
    },
  };

  return (
    <ImageDraggerContainer>
      <Dragger {...questionImageDraagerProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">{text}</p>
        <p className="ant-upload-hint">{hint}</p>
      </Dragger>
    </ImageDraggerContainer>
  );
};

export default ImageDragger;

const ImageDraggerContainer = styled.div``;
