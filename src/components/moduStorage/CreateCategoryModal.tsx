import useModuCategories from '@lib/hooks/useModuCategories';
import { Input, Modal, ModalProps, Radio, message } from 'antd';
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
  categoryId?: number;
  onClose: () => void;
}

const SaveCategoryModal: React.FC<SaveCategoryModalProps> = (props) => {
  const {
    createCategoryLoading,
    handleCreateCategory,
    editCategoryLoading,
    handleEditCategory,
  } = useModuCategories();

  const { onClose, categoryId, defaultValues, ...modalProps } = props;
  const [isPublic, setIsPublic] = React.useState<boolean>(
    defaultValues ? defaultValues.isPublic || false : false
  );
  const [name, setName] = React.useState<string>(
    defaultValues ? defaultValues.name : ''
  );
  const [description, setDescription] = React.useState<string>(
    defaultValues ? defaultValues.description || '' : ''
  );
  const handleSaveFolder = async () => {
    if (!name) return message.error('제목을 입력해주세요.');
    if (categoryId) {
      await handleEditCategory({
        id: categoryId,
        name,
        description,
        isPublic,
      });
      return;
    }
    const res = await handleCreateCategory({
      name,
      description,
      isPublic,
    });
    if (res.error) return message.error(res.error);
    onClose();
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
        onChange={(e) => setName(e.target.value)}
      />
      <Input.TextArea
        className="save-category-modal-description"
        placeholder="설명(선택)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </SaveCategoryModalBlock>
  );
};

export default SaveCategoryModal;
