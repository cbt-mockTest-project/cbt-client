import { Modal, message } from 'antd';
import { RcFile, UploadProps } from 'antd/es/upload';
import {
  CloseCircleOutlined,
  FullscreenOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import Dragger from 'antd/lib/upload/Dragger';
import { uploadAPI } from '@lib/apis/upload';
import Image from 'next/image';

const StoreCreateThumbnailUploaderBlock = styled.div`
  width: 100%;

  .exam-create-editor-image-hover-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    font-size: 12px;
    &:hover {
      opacity: 1;
    }
  }
  .exam-create-editor-image-hover-tool-box {
    position: absolute;
    display: flex;
    color: white;
    flex-direction: column;
    gap: 8px;
    top: 4px;
    right: 4px;
    cursor: pointer;
  }
`;

interface StoreCreateThumbnailUploaderProps {
  onChangeImage: (url: string) => void;
  defaultImgUrl?: string;
}

const StoreCreateThumbnailUploader: React.FC<
  StoreCreateThumbnailUploaderProps
> = ({ onChangeImage, defaultImgUrl = '' }) => {
  const [isImagePreviewModalOpen, setIsImagePreviewModalOpen] = useState(false);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState<string>(defaultImgUrl);
  const onChangeAndSetImage = (url: string) => {
    setImgUrl(url);
    onChangeImage(url);
  };
  const beforeUpload = (file: RcFile) => {
    setUploadImageLoading(true);
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('jpg, png 파일만 업로드 가능합니다.');
    }
    const isLt2M = file.size / 1024 / 1024 < 6;
    if (!isLt2M) {
      message.error('2MB 이하의 파일만 업로드 가능합니다.');
    }
    return isJpgOrPng && isLt2M;
  };

  const customRequest = async (options: any) => {
    try {
      const form = new FormData();
      form.append('file', options.file);
      form.append('path', 'question-img');
      const { data } = await uploadAPI(form);
      onChangeAndSetImage(data.url);
      options.onSuccess('ok', options.file);
    } catch {
      message.error('업로드에 실패했습니다.');
    } finally {
      setUploadImageLoading(false);
    }
  };

  const uploadProps: UploadProps = {
    accept: '.png, .jpg, .jpeg',
    showUploadList: false,
    multiple: false,
    beforeUpload: beforeUpload,
    customRequest: customRequest,
  };

  const uploadButton = (
    <div className="aspect-[210/297] flex items-center justify-center text-4xl">
      {uploadImageLoading ? <LoadingOutlined /> : <PlusOutlined />}
    </div>
  );

  return (
    <StoreCreateThumbnailUploaderBlock>
      <div className="w-full flex flex-col mt-5">
        <p className="mb-3 text-sm text-gray-400">
          권장사이즈: 210 x 297 (가로 x 세로) / 최대 5MB / jpg, png
        </p>
        <div className="flex gap-4 w-full">
          <div className="flex-1 shrink-0">
            {imgUrl ? (
              <div className="aspect-[210/297] relative">
                <div className="relative aspect-[210/297] border-solid border border-gray-300 ">
                  <Image
                    src={imgUrl}
                    alt="문제 이미지"
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                  <div className="exam-create-editor-image-hover-wrapper">
                    <div className="exam-create-editor-image-hover-tool-box">
                      <CloseCircleOutlined
                        role="button"
                        onClick={() => onChangeAndSetImage('')}
                      />
                      <FullscreenOutlined
                        onClick={() => {
                          setIsImagePreviewModalOpen(true);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Dragger {...uploadProps}>{uploadButton}</Dragger>
            )}
          </div>
          <div className="flex-1 shrink-0" />
        </div>
      </div>
      {isImagePreviewModalOpen && (
        <Modal
          open={isImagePreviewModalOpen}
          footer={null}
          onCancel={() => setIsImagePreviewModalOpen(false)}
        >
          {imgUrl && (
            <img alt="example" style={{ width: '100%' }} src={imgUrl} />
          )}
        </Modal>
      )}
    </StoreCreateThumbnailUploaderBlock>
  );
};

export default StoreCreateThumbnailUploader;
