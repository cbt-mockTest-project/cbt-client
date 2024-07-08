import { useCreateQuestionCardCategory } from '../../../../_lib/graphql/hook/useQuestionCard';
import useInput from '../../../../_lib/hooks/useInput';
import { handleError } from '../../../../_lib/utils/utils';
import { Button, Input, App } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import React from 'react';
import styled from 'styled-components';
import Modal, { ModalProps } from '../Modal';
import CardCategoryItem from './CardCategoryItem';

interface CardCategoryModalProps extends Omit<ModalProps, 'children'> {
  cardCategories: DefaultOptionType[];
  setCardCategories: React.Dispatch<React.SetStateAction<DefaultOptionType[]>>;
}

const CardCategoryModal: React.FC<CardCategoryModalProps> = ({
  onClose,
  open,
  className,
  cardCategories,
  setCardCategories,
}) => {
  const { message } = App.useApp();
  const [createCategory] = useCreateQuestionCardCategory();
  const {
    value: categoryName,

    onChange: onChangeCategoryName,
  } = useInput('');
  const requestCreateCategory = async () => {
    try {
      const res = await createCategory({
        variables: {
          input: {
            name: categoryName,
          },
        },
      });
      if (res.data) {
        const { createQuestionCardCategory } = res.data;
        if (createQuestionCardCategory.ok) {
          const { category } = createQuestionCardCategory;
          if (category) {
            message.success('카테고리가 추가되었습니다.');
            setCardCategories((prev) => [
              { value: category.id, label: category.name },
              ...prev,
            ]);
          }
          return;
        }
        return message.error(createQuestionCardCategory.error);
      }
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <CardCategoryModalContainer
      onClose={onClose}
      open={open}
      className={className}
    >
      <div className="card-category-modal-input-button-wrapper">
        <Input value={categoryName} onChange={onChangeCategoryName} />
        <Button type="primary" onClick={requestCreateCategory}>
          추가
        </Button>
      </div>
      <ul className="card-category-modal-list">
        {cardCategories.map((category) => (
          <CardCategoryItem
            key={category.value}
            setCardCategories={setCardCategories}
            category={category}
          />
        ))}
      </ul>
    </CardCategoryModalContainer>
  );
};

export default CardCategoryModal;

const CardCategoryModalContainer = styled(Modal)`
  padding: 40px 20px;
  max-height: 450px;
  overflow-y: auto;
  position: fixed;
  top: 0;
  bottom: 0;
  .card-category-modal-list {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
  }

  .modal-close-button {
    top: -30px;
    right: -10px;
  }
  .card-category-modal-input-button-wrapper {
    display: flex;
    gap: 10px;
  }
`;
