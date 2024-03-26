import { EllipsisOutlined } from '@ant-design/icons';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Dropdown, MenuProps, Modal, message } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  ExamSource,
  ReadMockExamCategoryByCategoryIdInput,
  UserRole,
} from 'types';
import useExamCategory from '@lib/hooks/useExamCategory';
import CategoryEmpty from './CategoryEmpty';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import SaveCategoryModal from '@components/moduStorage/SaveCategoryModal';
import EditExamsModal from './EditExamsModal';
import { useRouter } from 'next/router';
import CategoryControlbar from './CategoryControlbar';
import { BookmarkOutlined } from '@mui/icons-material';
import CategoryInviteModal from './CategoryInviteModal';
import ExamList from './ExamList';
import { LocalStorage } from '@lib/utils/localStorage';
import { LAST_VISITED_CATEGORY } from '@lib/constants/localStorage';
import { getExamSettingHistory } from '@lib/utils/examSettingHistory';
import CategoryProgressAndReview from './CategoryProgressAndReview';
import CategoryHeaderWrapper from './CategoryHeaderWrapper';
import CategoryMultipleSelectModeControlbarWrapper from './CategoryMultipleSelectModeControlbarWrapper';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { examSettingActions } from '@modules/redux/slices/examSetting';
import { ExamSettingType, StorageType } from 'customTypes';
import CategoryCore from './CategoryCore';

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
  const {
    handleFilterExams,
    handleDeleteCategory,
    handleToggleCategoryBookmark,
  } = useExamCategory();
  const dispatch = useAppDispatch();
  const categoryUserId = useAppSelector(
    (state) => state.examCategory.category.user.id
  );
  const categoryId = useAppSelector((state) => state.examCategory.category.id);
  const isCategoryBookmarked = useAppSelector(
    (state) => state.examCategory.category.isBookmarked
  );
  const categoryName = useAppSelector(
    (state) => state.examCategory.category.name
  );
  const categoryDescription = useAppSelector(
    (state) => state.examCategory.category.description
  );
  const isCategoryPublic = useAppSelector(
    (state) => state.examCategory.category.isPublic
  );
  const isMyCategory = useAppSelector(
    (state) => state.examCategory.category.user.id === meQuery?.me.user?.id
  );
  const categoryAccessDenied = useAppSelector(
    (state) =>
      !meQuery?.me.user &&
      state.examCategory.category &&
      !state.examCategory.category.isPublic &&
      meQuery?.me.user.role !== UserRole.Admin
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

  const setExamSetting = (examSetting: Partial<ExamSettingType>) =>
    dispatch(examSettingActions.setExamSetting(examSetting));

  const [editExamsModalOpen, setEditExamsModalOpen] = useState(false);
  const [inviteUserModalOpen, setInviteUserModalOpen] = useState(false);
  const [saveCategoryModalOpen, setSaveCategoryModalOpen] = useState(false);

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

  useEffect(() => {
    if (!meQuery) return;
    if (meQuery.me.user) {
      const examSetting = getExamSettingHistory(categoryId);
      if (!examSetting) return;
      const { examIds } = examSetting;
      if (examIds) setExamSetting({ categoryId, examIds });
    }
    if (categoryAccessDenied) {
      message.error('접근 권한이 없습니다.');
      router.push('/');
    }
  }, [meQuery]);

  useEffect(() => {
    if (!router.asPath) return;
    localStorage.set(LAST_VISITED_CATEGORY, router.asPath);
  }, [router.asPath]);

  return (
    <CategoryComponentBlock>
      <CategoryProgressAndReview />
      <CategoryHeaderWrapper />
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
        <CategoryEmpty
          hasButton={categoryUserId === meQuery?.me.user?.id}
          handleButtonClick={() => {
            setEditExamsModalOpen(true);
          }}
        />
      )}
      {isMyCategory ? (
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
          onClick={() => handleToggleCategoryBookmark(categoryId)}
          className={`category-bookmark-button ${
            isCategoryBookmarked ? 'active' : ''
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
      <CategoryCore categoryQueryInput={categoryQueryInput} />
    </CategoryComponentBlock>
  );
};

export default CategoryComponent;
