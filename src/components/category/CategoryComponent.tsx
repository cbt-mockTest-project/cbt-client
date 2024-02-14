import { EllipsisOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Dropdown, MenuProps, Modal, Progress, message } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ReadMockExamCategoryByCategoryIdInput } from 'types';
import useExamSettingHistory from '@lib/hooks/useExamSettingHistory';
import useExamSetting from '@lib/hooks/useExamSetting';
import useExamCategory from '@lib/hooks/useExamCategory';
import CategoryEmpty from './CategoryEmpty';
import {
  useMeQuery,
  useUpdateRecentlyStudiedCategory,
} from '@lib/graphql/hook/useUser';
import SaveCategoryModal from '@components/moduStorage/SaveCategoryModal';
import EditExamsModal from './EditExamsModal';
import { useRouter } from 'next/router';
import CategoryHeader from './CategoryHeader';
import CategoryControlbar from './CategoryControlbar';
import CategoryMultipleSelectModeControlbar from './CategoryMultipleSelectModeControlbar';
import { BookmarkOutlined } from '@mui/icons-material';
import CategoryInviteModal from './CategoryInviteModal';
import { useLazyGetExamCategoryLearningProgress } from '@lib/graphql/hook/useExam';
import CategoryLearningProgress from './CategoryLearningProgress';
import SelectExamTypeModal from './SelectExamTypeModal';
import ExamList from './ExamList';
import CategoryReviewButton from './CategoryReviewButton';
import { LocalStorage } from '@lib/utils/localStorage';
import { LAST_VISITED_CATEGORY } from '@lib/constants/localStorage';

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
      color: ${palette.colorBorder};
    }
  }
  .category-bookmark-button.active {
    svg {
      color: ${palette.yellow_500};
    }
  }
  .category-setting-button-wrapper {
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid ${palette.colorBorder};
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s all ease-in;
    svg {
      font-size: 24px;
      color: ${palette.colorText};
    }
    &:hover {
      border-color: ${palette.antd_blue_02};
      svg {
        color: ${palette.antd_blue_02};
      }
    }
  }
  @media (max-width: ${responsive.medium}) {
    padding: 20px 16px;
  }
`;
interface CategoryComponentProps {
  categoryQueryInput: ReadMockExamCategoryByCategoryIdInput;
}

const CategoryComponent: React.FC<CategoryComponentProps> = ({
  categoryQueryInput,
}) => {
  const router = useRouter();
  const localStorage = new LocalStorage();
  const { data: meQuery } = useMeQuery();
  const [updateRecentlyStudiedCategory] = useUpdateRecentlyStudiedCategory();
  const [
    getExamCategoryLearningProgress,
    { data: categoryLearningProgressResponse },
  ] = useLazyGetExamCategoryLearningProgress();
  const {
    handleFilterExams,
    category,
    originalCategory,
    fetchCategory,
    handleDeleteCategory,
    storageType,
    handleToggleCategoryBookmark,
  } = useExamCategory();
  const { examSetting, setExamSetting, handleAllExamsSelect } = useExamSetting({
    categoryId: category.id,
    exams: category.mockExam,
  });

  const [isSelectExamTypeModalOpen, setIsSelectExamTypeModalOpen] =
    useState(false);
  const [editExamsModalOpen, setEditExamsModalOpen] = useState(false);
  const [inviteUserModalOpen, setInviteUserModalOpen] = useState(false);
  const [saveCategoryModalOpen, setSaveCategoryModalOpen] = useState(false);

  const { getExamSettingHistory } = useExamSettingHistory();

  const categoryLearningProgress = useMemo(() => {
    if (!categoryLearningProgressResponse) return null;
    const {
      getExamCategoryLearningProgress: {
        highScoreCount,
        lowScoreCount,
        totalQuestionCount,
      },
    } = categoryLearningProgressResponse;
    return {
      learningProgress: Math.round((highScoreCount / totalQuestionCount) * 100),
      highScoreCount,
      lowScoreCount,
      totalQuestionCount,
    };
  }, [categoryLearningProgressResponse]);

  const categorySettingDropdownItems: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <button
          style={{ color: palette.colorText }}
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
          style={{ color: palette.colorText }}
          onClick={(e) => {
            Modal.confirm({
              title: '정말로 삭제하시겠습니까?',
              onOk: () => handleDeleteCategory(),
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
          style={{ color: palette.colorText }}
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
          style={{ color: palette.colorText }}
          onClick={() => setInviteUserModalOpen(true)}
        >
          유저 초대하기
        </button>
      ),
    },
  ];

  const onClickCreateExamButton = () => {
    setEditExamsModalOpen(false);
    setIsSelectExamTypeModalOpen(true);
  };

  useEffect(() => {
    if (!meQuery) return;
    if (meQuery.me.user) {
      updateRecentlyStudiedCategory({
        variables: {
          input: {
            categoryName: categoryQueryInput.name,
          },
        },
      });
      fetchCategory(categoryQueryInput, 'no-cache').then((res) => {
        if (!res?.hasAccess) {
          message.error('접근 권한이 없습니다.');
          router.push('/main');
        }
      });
      if (!category) return;
      getExamCategoryLearningProgress({
        variables: {
          input: {
            categoryId: category.id,
          },
        },
      });
      const examSetting = getExamSettingHistory(category.id);
      if (!examSetting) return;
      const { examIds } = examSetting;
      if (examIds) setExamSetting({ categoryId: category.id, examIds });
    }
    if (!meQuery.me.user && category && !category.isPublic) {
      message.error('접근 권한이 없습니다.');
      router.push('/main');
    }
  }, [meQuery]);

  useEffect(() => {
    if (!router.asPath) return;
    localStorage.set(LAST_VISITED_CATEGORY, router.asPath);
  }, [router.asPath]);

  if (!category) return null;

  return (
    <CategoryComponentBlock>
      <CategoryLearningProgress
        categoryLearningProgress={categoryLearningProgress}
      />
      <CategoryReviewButton categoryId={category.id} />
      <CategoryHeader
        user={category.user}
        categoryName={category.name}
        categoryDescription={category.description}
      />

      {originalCategory && originalCategory.mockExam.length >= 1 ? (
        <>
          <CategoryControlbar
            textInput={{
              onChangeText: (v) => handleFilterExams(v),
            }}
          />
          <CategoryMultipleSelectModeControlbar
            checkbox={{
              categoryAllChecked:
                category?.mockExam.length === examSetting.examIds.length,
              handleAllExamsSelect,
            }}
            button={{
              isButtonDisabled: examSetting.examIds.length === 0,
            }}
            categoryId={category.id}
            examIds={examSetting.examIds}
          />
          <ExamList />
        </>
      ) : (
        <CategoryEmpty
          hasButton={category.user.id === meQuery?.me.user?.id}
          handleButtonClick={() => {
            setEditExamsModalOpen(true);
          }}
        />
      )}
      {meQuery?.me.user?.id === category.user.id ? (
        <Dropdown
          menu={{ items: categorySettingDropdownItems }}
          placement="bottomRight"
        >
          <div
            className="category-setting-button-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <EllipsisOutlined />
          </div>
        </Dropdown>
      ) : (
        <button
          onClick={() => handleToggleCategoryBookmark(category.id)}
          className={`category-bookmark-button ${
            category.isBookmarked ? 'active' : ''
          }`}
        >
          <BookmarkOutlined />
        </button>
      )}
      {saveCategoryModalOpen && (
        <SaveCategoryModal
          open={saveCategoryModalOpen}
          onCancel={() => setSaveCategoryModalOpen(false)}
          onClose={() => setSaveCategoryModalOpen(false)}
          storageType={storageType}
          categoryId={category.id}
          defaultValues={{
            name: category.name,
            description: category.description,
            isPublic: category.isPublic,
          }}
        />
      )}
      {editExamsModalOpen && (
        <EditExamsModal
          onClickCreateExamButton={onClickCreateExamButton}
          categoryId={category.id}
          open={editExamsModalOpen}
          onCancel={() => setEditExamsModalOpen(false)}
        />
      )}
      {isSelectExamTypeModalOpen && (
        <SelectExamTypeModal
          categoryId={category.id}
          open={isSelectExamTypeModalOpen}
          onCancel={() => {
            setIsSelectExamTypeModalOpen(false);
          }}
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
