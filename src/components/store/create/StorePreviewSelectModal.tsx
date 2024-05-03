/* eslint-disable @next/next/no-img-element */
import { CheckOutlined } from '@ant-design/icons';
import { Image, Modal, ModalProps, message } from 'antd';
import clsx from 'clsx';
import React, { useState } from 'react';
import styled from 'styled-components';
import { UploadFileWithCancel } from '../common/StoreFileDragger';
import { ItemFileType } from 'types';
import StorePreviewImage from './StorePreviewImage';

const StorePreviewSelectModalBlock = styled(Modal)`
  width: 60vw !important;
  .ant-modal-content {
    width: 60vw !important;
  }
`;

interface StorePreviewSelectModalProps extends Omit<ModalProps, 'children'> {
  fileData: UploadFileWithCancel | null;
  setFileData: React.Dispatch<
    React.SetStateAction<UploadFileWithCancel | null>
  >;
  onChageFile: (value: ItemFileType) => void;
  onClose: () => void;
}

const StorePreviewSelectModal: React.FC<StorePreviewSelectModalProps> = (
  props
) => {
  const { onChageFile, onClose, setFileData, fileData, ...modalProps } = props;
  const [selectedImages, setSelectedImages] = useState<string[]>(
    fileData?.previewImages.slice(0, fileData?.previewImagesCount) || []
  );
  return (
    <StorePreviewSelectModalBlock
      {...modalProps}
      title="미리보기 이미지 선택"
      okText="저장"
      cancelText="취소"
      onOk={() => {
        if (!selectedImages.length) {
          message.error('최소 1개의 이미지를 선택해주세요.');
          return;
        }
        const sortedImages = [...fileData?.previewImages].sort((a, b) => {
          return selectedImages.indexOf(b) - selectedImages.indexOf(a);
        });
        setFileData((prev) => ({
          ...prev,
          previewImages: sortedImages,
          previewImagesCount: selectedImages.length,
        }));
        onChageFile({
          ...fileData,
          previewImages: sortedImages,
          previewImagesCount: selectedImages.length,
        } as ItemFileType);

        onClose();
      }}
    >
      <div className="text-center text-gray-500 text-sm mb-4">
        최소 1개, 최대 3개의 이미지를 선택해주세요.
      </div>
      <div className="flex flex-wrap gap-4 mt-6 mb-6">
        {fileData?.previewImages.map((image, index) => (
          <div
            key={index}
            className="w-1/6 relative"
            onClick={() => {
              if (selectedImages.includes(image)) {
                setSelectedImages(selectedImages.filter((i) => i !== image));
              } else {
                if (selectedImages.length < 3) {
                  setSelectedImages([image, ...selectedImages]);
                  return;
                }
                message.warning('최대 3개까지 선택 가능합니다.');
              }
            }}
          >
            <StorePreviewImage
              image={image}
              isActive={selectedImages.includes(image)}
            />

            <div
              className={clsx(
                'absolute bottom-4 right-4 p-1 rounded-full text-white w-8 h-8 flex items-center justify-center text-xl cursor-pointer',
                selectedImages.includes(image) ? 'bg-blue-500' : 'bg-gray-200'
              )}
            >
              <CheckOutlined />
            </div>
          </div>
        ))}
      </div>
    </StorePreviewSelectModalBlock>
  );
};
export default StorePreviewSelectModal;
