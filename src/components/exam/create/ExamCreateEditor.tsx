import { Modal, App } from 'antd';
import { RcFile, UploadProps } from 'antd/es/upload';
import {
  CloseCircleOutlined,
  FullscreenOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import dynamic from 'next/dynamic';
import SkeletonBox from '@components/common/skeleton/SkeletonBox';
import Dragger from 'antd/lib/upload/Dragger';
import { uploadAPI } from '@lib/apis/upload';
import Image from 'next/image';

const CustomEditor = dynamic(
  async () => await import('@components/common/editor/CustomEditor'),
  {
    ssr: false,
    loading: () => <SkeletonBox width="100%" height="22.45px" />,
  }
);

const ExamCreateEditorBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  .ant-upload.ant-upload-select,
  .ant-upload-list-item,
  .ant-upload-wrapper,
  .ant-upload-list-item-container {
    width: 80px !important;
    height: 80px !important;
    flex-shrink: 0;
  }
  .exam-create-editor-image-wrapper {
    width: 80px;
    height: 80px;
    flex-shrink: 0;
    position: relative;
  }
  .exam-create-editor-image-hover-wrapper {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
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

interface ExamCreateEditorProps {
  defaultValue?: string;
  onChangeText: (text: string) => void;
  onChangeImage: (url: string) => void;
  editorPlaceholder?: string;
  defaultImgUrl?: string;
}

const ExamCreateEditor: React.FC<ExamCreateEditorProps> = ({
  defaultValue,
  onChangeText,
  onChangeImage,
  editorPlaceholder = '',
  defaultImgUrl = '',
}) => {
  const theme = useTheme();
  const { message } = App.useApp();
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
    const isLt2M = file.size / 1024 / 1024 < 2;
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
    <div
      style={{
        color: theme.color('colorText'),
      }}
    >
      {uploadImageLoading ? <LoadingOutlined /> : <PlusOutlined />}
    </div>
  );

  return (
    <ExamCreateEditorBlock>
      <CustomEditor
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        placeholder={editorPlaceholder}
      />
      {imgUrl ? (
        <div className="exam-create-editor-image-wrapper">
          <Image
            src={imgUrl}
            alt="문제 이미지"
            width={65}
            height={65}
            loading="lazy"
            style={{ borderRadius: '5px' }}
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
      ) : (
        <Dragger {...uploadProps}>{uploadButton}</Dragger>
      )}
      <Modal
        open={isImagePreviewModalOpen}
        footer={null}
        onCancel={() => setIsImagePreviewModalOpen(false)}
      >
        {imgUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt="example" style={{ width: '100%' }} src={imgUrl} />
        )}
      </Modal>
    </ExamCreateEditorBlock>
  );
};

export default ExamCreateEditor;
