import {
  useDeleteQuestionCardCategory,
  useUpdateQuestionCardCategory,
} from '../../../../_lib/graphql/hook/useQuestionCard';
import useInput from '../../../../_lib/hooks/useInput';
import useToggle from '../../../../_lib/hooks/useToggle';
import { handleError } from '../../../../_lib/utils/utils';
import palette from '../../../../_styles/palette';
import { DefaultOptionType } from 'antd/lib/select';
import { App, Input } from 'antd';
import React from 'react';
import styled from 'styled-components';

interface CardCategoryItemProps {
  category: DefaultOptionType;
  setCardCategories: React.Dispatch<React.SetStateAction<DefaultOptionType[]>>;
}

const CardCategoryItem: React.FC<CardCategoryItemProps> = ({
  category,
  setCardCategories,
}) => {
  const { message } = App.useApp();
  const [deleteCategory] = useDeleteQuestionCardCategory();
  const [editCategory] = useUpdateQuestionCardCategory();
  const {
    value: editMode,
    setValue: setEditMode,
    onToggle: onToggleEditMode,
  } = useToggle(false);
  const { value: editCategoryName, onChange: onChangeEditCategoryName } =
    useInput(category.label as string);
  const requestDeleteCategory = async () => {
    try {
      const id = category.value as number;
      const confirmed = confirm('카테고리를 삭제하시겠습니까?');
      if (!confirmed) return;
      const res = await deleteCategory({
        variables: {
          input: {
            id,
          },
        },
      });
      if (res.data) {
        const { deleteQuestionCardCategory } = res.data;
        if (deleteQuestionCardCategory.ok) {
          message.success('카테고리가 삭제되었습니다.');
          setCardCategories((prev) =>
            prev.filter((category) => category.value !== id)
          );
          return;
        }
        return message.error(deleteQuestionCardCategory.error);
      }
    } catch (e) {
      handleError(e);
    }
  };

  const requestUpdateCategory = async () => {
    try {
      const id = category.value as number;
      const confirmed = confirm('카테고리를 수정하시겠습니까?');
      if (!confirmed) return;
      const res = await editCategory({
        variables: {
          input: {
            id,
            name: editCategoryName,
          },
        },
      });
      if (res.data) {
        const { updateQuestionCardCategory } = res.data;
        if (updateQuestionCardCategory.ok) {
          message.success('카테고리가 수정되었습니다.');
          setEditMode(false);
          setCardCategories((prev) =>
            prev.map((category) => {
              if (category.value === id) {
                return { ...category, label: editCategoryName };
              }
              return category;
            })
          );
          return;
        }
        return message.error(updateQuestionCardCategory.error);
      }
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <CardCategoryItemContainer>
      <p className="card-category-modal-list-item-label">
        {editMode ? (
          <Input value={editCategoryName} onChange={onChangeEditCategoryName} />
        ) : (
          category.label
        )}
      </p>

      <div className="card-category-modal-list-item-button-wrapper">
        {editMode ? (
          <>
            <button
              onClick={requestUpdateCategory}
              className="card-category-modal-list-item-button"
            >
              수정
            </button>
            <button
              onClick={onToggleEditMode}
              className="card-category-modal-list-item-button"
            >
              취소
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onToggleEditMode}
              className="card-category-modal-list-item-button"
            >
              수정
            </button>
            <button
              onClick={requestDeleteCategory}
              className="card-category-modal-list-item-button"
            >
              삭제
            </button>
          </>
        )}
      </div>
    </CardCategoryItemContainer>
  );
};

export default CardCategoryItem;

const CardCategoryItemContainer = styled.li`
  padding: 10px;
  border-bottom: 1px solid ${palette.gray_200};
  display: flex;
  gap: 15px;
  .card-category-modal-list-item-label {
    flex: 7;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .card-category-modal-list-item-button-wrapper {
    display: flex;
    gap: 10px;
    flex: 3;
    justify-content: flex-end;
  }
  .card-category-modal-list-item-button {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.color('colorTextTertiary')};
    transition: 0.2s;
    :hover {
      color: ${palette.antd_blue_01};
    }
  }
`;
