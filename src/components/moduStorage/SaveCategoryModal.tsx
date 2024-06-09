import useExamCategory from '@lib/hooks/useExamCategory';
import useStorage from '@lib/hooks/useStorage';
import { replaceSpaceSlashAndSpecialCharsToHyphen } from '@lib/utils/utils';
import { Input, Modal, ModalProps, Radio, message } from 'antd';
import { StorageType } from 'customTypes';
import React from 'react';
import styled from 'styled-components';
import { CreateMockExamCategoryInput } from 'types';

const SaveCategoryModalBlock = styled(Modal)`
  .save-category-modal-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .save-category-access-radio-group {
    margin-bottom: 10px;
  }
  .save-category-modal-description {
    margin-top: 10px;
  }
`;

interface SaveCategoryModalProps extends Omit<ModalProps, 'children'> {
  defaultValues?: CreateMockExamCategoryInput;
  storageType: StorageType;
  categoryId?: number;
  onClose: () => void;
}

const SaveCategoryModal: React.FC<SaveCategoryModalProps> = (props) => {
  const { createCategoryLoading, handleCreateCategory } = useStorage(
    props.storageType
  );
  const { handleEditCategory, editCategoryLoading } = useExamCategory();

  const { onClose, categoryId, defaultValues, ...modalProps } = props;
  const [isPublic, setIsPublic] = React.useState<boolean>(
    defaultValues ? defaultValues.isPublic : true
  );
  const [name, setName] = React.useState<string>(
    defaultValues ? defaultValues.name : ''
  );
  const [description, setDescription] = React.useState<string>(
    defaultValues ? defaultValues.description || '' : ''
  );
  const handleSaveFolder = async () => {
    if (!name) return message.error('제목을 입력해주세요.');
    categoryId
      ? await handleEditCategory(
          {
            id: categoryId,
            name,
            description,
            isPublic,
          },
          onClose
        )
      : await handleCreateCategory(
          {
            name,
            description,
            isPublic,
          },
          onClose
        );
  };

  return (
    <SaveCategoryModalBlock
      {...modalProps}
      onOk={handleSaveFolder}
      okButtonProps={{
        loading: createCategoryLoading || editCategoryLoading,
      }}
    >
      <p className="save-category-modal-title">폴더 만들기</p>
      <Radio.Group
        className="save-category-access-radio-group"
        onChange={(e) => setIsPublic(e.target.value)}
        size="large"
        value={isPublic}
      >
        <Radio value={true}>공개</Radio>
        <Radio value={false}>비공개</Radio>
      </Radio.Group>
      <Input
        size="large"
        placeholder="제목을 입력하세요."
        value={name}
        onChange={(e) =>
          setName(replaceSpaceSlashAndSpecialCharsToHyphen(e.target.value))
        }
      />
      <Input.TextArea
        className="save-category-modal-description"
        placeholder="설명(선택)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {!isPublic && (
        <div className="mt-2 text-blue-500">
          * 비공개는 모두CBT내에서의 비공개를 말하며,
          <br />
          구글, 네이버등의 검색엔진에 노출 될 수 있습니다.
        </div>
      )}
    </SaveCategoryModalBlock>
  );
};

export default SaveCategoryModal;
