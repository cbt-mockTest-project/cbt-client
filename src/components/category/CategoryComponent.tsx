import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { App, MenuProps, Skeleton, Spin } from 'antd';
import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import {
  ExamSource,
  ReadMockExamCategoryByCategoryIdInput,
  UserRole,
} from 'types';
import SaveCategoryModal from '@components/moduStorage/SaveCategoryModal';
import EditExamsModal from './EditExamsModal';
import CategoryInviteModal from './CategoryInviteModal';
import CategoryProgressAndReview from './CategoryProgressAndReview';
import { StorageType } from 'customTypes';
import CategoryBookmarkOrEditWrapper from './CategoryBookmarkOrEditWrapper';
import CategoryHiddenExamList from './CategoryHiddenExamList';
import useCheckHasCategoryAccess from './hooks/useCheckHasCategoryAccess';
import { useQuery } from '@tanstack/react-query';
import { getCategoryQueryOption } from '@lib/queryOptions/getCategoryQueryOption';
import CategoryUtilButtonBox from './CategoryUtilButtonBox';
import CategoryHeader from './CategoryHeader';
import CategoryEmpty from './CategoryEmpty';
import useAuth from '@lib/hooks/useAuth';
import ExamListAndController from './ExamListAndController';
import useCategoryExamList from './hooks/useCategoryExamList';
import Portal from '@components/common/portal/Portal';

const CategoryComponentBlock = styled.div`
  padding: 20px 0;
  position: relative;

  .category-all-checkbox-and-study-button-wrapper {
    display: flex;
    align-items: center;
    gap: 17px;
  }
  .category-bookmark-button {
    position: absolute;
    top: 62px;
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
    padding: 16px 0;
  }
`;
interface CategoryComponentProps {
  queryKey: string[];
  categoryQueryInput: ReadMockExamCategoryByCategoryIdInput;
}

const CategoryComponent: React.FC<CategoryComponentProps> = ({
  queryKey,
  categoryQueryInput,
}) => {
  const { user } = useAuth();
  const { modal } = App.useApp();
  const theme = useTheme();
  const { handleDeleteCategory } = useCategoryExamList();
  const { data: category } = useQuery(
    getCategoryQueryOption({
      input: categoryQueryInput,
      queryKey,
    })
  );
  const isMyCategory = category?.user.id === user?.id;
  const { isCategoryAccess } = useCheckHasCategoryAccess({ category });

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
              onOk: () => handleDeleteCategory(category!.id),
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

  if (
    !category.isPublic &&
    !isCategoryAccess &&
    user?.role !== UserRole.Admin
  ) {
    return <Spin size="large" fullscreen />;
  }

  const storageType = () => {
    if (category.source === ExamSource.EhsMaster) return StorageType.PREMIUM;
    if (category.source === ExamSource.MoudCbt) return StorageType.MODU;
    return StorageType.MY;
  };

  return (
    <CategoryComponentBlock>
      <CategoryUtilButtonBox
        exams={category.mockExam}
        categoryName={category.name}
        categoryId={category.id}
      />
      <CategoryProgressAndReview categoryId={category.id} />
      <CategoryHeader
        user={category.user}
        categoryName={category.name}
        categoryDescription={category.description}
        exams={category.mockExam}
      />
      <CategoryHiddenExamList exams={category.mockExam} />
      {category.mockExam.length > 0 ? (
        <ExamListAndController category={category} />
      ) : (
        <CategoryEmpty
          hasButton={isMyCategory}
          handleButtonClick={() => setEditExamsModalOpen(true)}
        />
      )}
      <CategoryBookmarkOrEditWrapper
        dropdownItems={categorySettingDropdownItems}
        category={category}
        defaultIsBookmarked={!!category.isBookmarked}
        key={String(category.isBookmarked)}
      />
      {saveCategoryModalOpen && (
        <SaveCategoryModal
          open={saveCategoryModalOpen}
          onCancel={() => setSaveCategoryModalOpen(false)}
          onClose={() => setSaveCategoryModalOpen(false)}
          storageType={storageType()}
          categoryId={category.id}
          urlSlug={category.urlSlug}
          defaultValues={{
            name: category.name,
            description: category.description,
            isPublic: category.isPublic,
          }}
        />
      )}
      {editExamsModalOpen && (
        <EditExamsModal
          categoryId={category.id}
          open={editExamsModalOpen}
          onCancel={() => setEditExamsModalOpen(false)}
        />
      )}
      {inviteUserModalOpen && (
        <CategoryInviteModal
          open={inviteUserModalOpen}
          categoryId={category.id}
          onCancel={() => setInviteUserModalOpen(false)}
        />
      )}
    </CategoryComponentBlock>
  );
};

export default CategoryComponent;
