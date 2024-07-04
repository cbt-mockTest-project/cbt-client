import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { App, MenuProps, Skeleton } from 'antd';
import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { ExamSource } from 'types';
import useExamCategory from '@lib/hooks/useExamCategory';
import SaveCategoryModal from '@components/moduStorage/SaveCategoryModal';
import EditExamsModal from './EditExamsModal';
import CategoryControlbar from './CategoryControlbar';
import CategoryInviteModal from './CategoryInviteModal';
import ExamList from './ExamList';
import CategoryProgressAndReview from './CategoryProgressAndReview';
import CategoryHeaderWrapper from './CategoryHeaderWrapper';
import CategoryMultipleSelectModeControlbarWrapper from './CategoryMultipleSelectModeControlbarWrapper';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { StorageType } from 'customTypes';
import CategoryEmptyWrapper from './CategoryEmptyWrapper';
import CategoryBookmarkOrEditWrapper from './CategoryBookmarkOrEditWrapper';
import CategoryUtilButtonWrapper from './CategoryUtilButtonWrapper';
import CategoryHiddenExamList from './CategoryHiddenExamList';
import useCheckHasCategoryAccess from './hooks/useCheckHasCategoryAccess';
import Modal from 'antd/lib/modal/Modal';

const CategoryComponentBlock = styled.div`
  padding: 30px;
  position: relative;

  .category-all-checkbox-and-study-button-wrapper {
    display: flex;
    align-items: center;
    gap: 17px;
  }
  .category-bookmark-button {
    position: absolute;
    top: 20px;
    right: 30px;
    cursor: pointer;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s all ease-in;
    svg {
      transition: 0.2s all ease-in;
      font-size: 36px;
      color: ${({ theme }) => theme.color('colorBorder')};
    }
  }
  .category-bookmark-button.active {
    svg {
      color: ${palette.yellow_500};
    }
  }
  .category-setting-button-wrapper {
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.color('colorBorder')};
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s all ease-in;
    cursor: pointer;
    svg {
      font-size: 24px;
      color: ${({ theme }) => theme.color('colorText')};
    }
    &:hover {
      border-color: ${({ theme }) => theme.color('colorPrimary')};
      svg {
        color: ${({ theme }) => theme.color('colorPrimary')};
      }
    }
  }
  @media (max-width: ${responsive.medium}) {
    padding: 20px 16px;
  }
`;
interface CategoryComponentProps {}

const CategoryComponent: React.FC<CategoryComponentProps> = () => {
  const { modal } = App.useApp();
  const theme = useTheme();
  const { handleFilterExams, handleDeleteCategory } = useExamCategory();
  const categoryId = useAppSelector((state) => state.examCategory.category.id);
  const categoryName = useAppSelector(
    (state) => state.examCategory.category.name
  );
  const { isCategoryAccess } = useCheckHasCategoryAccess();
  const isPrivate = useAppSelector(
    (state) => !state.examCategory.category.isPublic
  );
  const categoryDescription = useAppSelector(
    (state) => state.examCategory.category.description
  );
  const isCategoryPublic = useAppSelector(
    (state) => state.examCategory.category.isPublic
  );
  const hasOriginalCategoryExams = useAppSelector(
    (state) =>
      state.examCategory.originalCategory &&
      state.examCategory.originalCategory.mockExam.length >= 1
  );
  const storageType = useAppSelector((state) => {
    if (state.examCategory.category.source === ExamSource.EhsMaster)
      return StorageType.PREMIUM;
    if (state.examCategory.category.source === ExamSource.MoudCbt)
      return StorageType.MODU;
    return StorageType.MY;
  });
  const [editExamsModalOpen, setEditExamsModalOpen] = useState(false);
  const [inviteUserModalOpen, setInviteUserModalOpen] = useState(false);
  const [saveCategoryModalOpen, setSaveCategoryModalOpen] = useState(false);

  const categorySettingDropdownItems: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <button
          style={{ color: theme.color('colorText') }}
          onClick={() => setSaveCategoryModalOpen(true)}
        >
          수정하기
        </button>
      ),
    },
    {
      key: 2,
      label: (
        <button
          style={{ color: theme.color('colorText') }}
          onClick={(e) => {
            modal.confirm({
              title: '정말로 삭제하시겠습니까?',
              onOk: () => handleDeleteCategory(categoryId),
            });
          }}
        >
          삭제하기
        </button>
      ),
    },
    {
      key: 3,
      label: (
        <button
          style={{ color: theme.color('colorText') }}
          onClick={() => setEditExamsModalOpen(true)}
        >
          시험지 추가하기
        </button>
      ),
    },
    {
      key: 4,
      label: (
        <button
          style={{ color: theme.color('colorText') }}
          onClick={() => setInviteUserModalOpen(true)}
        >
          유저 초대하기
        </button>
      ),
    },
  ];

  if (isPrivate && !isCategoryAccess) {
    return (
      <CategoryComponentBlock>
        <div className="flex flex-col gap-2">
          <Skeleton active />
          <Skeleton active />
        </div>
      </CategoryComponentBlock>
    );
  }

  return (
    <CategoryComponentBlock>
      <CategoryUtilButtonWrapper />
      <CategoryProgressAndReview />
      <CategoryHeaderWrapper />
      <CategoryHiddenExamList />
      {hasOriginalCategoryExams ? (
        <>
          <CategoryControlbar
            textInput={{
              onChangeText: (v) => handleFilterExams(v),
            }}
          />
          <CategoryMultipleSelectModeControlbarWrapper />
          <ExamList />
        </>
      ) : (
        <CategoryEmptyWrapper
          handleButtonClick={() => {
            setEditExamsModalOpen(true);
          }}
        />
      )}
      <CategoryBookmarkOrEditWrapper
        dropdownItems={categorySettingDropdownItems}
      />
      {saveCategoryModalOpen && (
        <SaveCategoryModal
          open={saveCategoryModalOpen}
          onCancel={() => setSaveCategoryModalOpen(false)}
          onClose={() => setSaveCategoryModalOpen(false)}
          storageType={storageType}
          categoryId={categoryId}
          defaultValues={{
            name: categoryName,
            description: categoryDescription,
            isPublic: isCategoryPublic,
          }}
        />
      )}
      {editExamsModalOpen && (
        <EditExamsModal
          categoryId={categoryId}
          open={editExamsModalOpen}
          onCancel={() => setEditExamsModalOpen(false)}
        />
      )}
      {inviteUserModalOpen && (
        <CategoryInviteModal
          open={inviteUserModalOpen}
          categoryId={categoryId}
          onCancel={() => setInviteUserModalOpen(false)}
        />
      )}
    </CategoryComponentBlock>
  );
};

export default CategoryComponent;
