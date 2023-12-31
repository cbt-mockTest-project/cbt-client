import { EllipsisOutlined, FolderOutlined } from '@ant-design/icons';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  MenuProps,
  Modal,
  Switch,
  message,
} from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReadMockExamCategoryByCategoryIdInput } from 'types';
import ExamList from './ExamList';
import ExamMultipleSelectModal from './ExamMultipleSelectModal';
import useExamSettingHistory from '@lib/hooks/useExamSettingHistory';
import useExamSetting from '@lib/hooks/useExamSetting';
import useExamCategory from '@lib/hooks/useExamCategory';
import CategoryEmpty from './CategoryEmpty';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import SaveCategoryModal from '@components/moduStorage/SaveCategoryModal';
import EditExamsModal from './EditExamsModal';
import TextInput from '@components/common/input/TextInput';
import { useRouter } from 'next/router';
import CategoryHeader from './CategoryHeader';
import CategoryControlbar from './CategoryControlbar';

const CategoryComponentBlock = styled.div`
  padding: 30px;
  position: relative;

  .category-study-button {
    margin-top: 20px;
  }
  .category-exam-all-checkbox-wrapper {
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 17px;
  }

  .category-all-checkbox-and-study-button-wrapper {
    display: flex;
    align-items: center;
    gap: 17px;
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
  const { data: meQuery } = useMeQuery();
  const {
    handleFilterExams,
    category,
    originalCategory,
    fetchCategory,
    handleDeleteCategory,
    storageType,
  } = useExamCategory();
  const {
    examSetting,
    setExamSetting,
    handleAllExamsSelect,
    handleExamSelect,
    handleChangeMultipleSelectMode,
  } = useExamSetting({ category });

  const [editExamsModalOpen, setEditExamsModalOpen] = useState(false);
  const [saveCategoryModalOpen, setSaveCategoryModalOpen] = useState(false);
  const [examMutipleSelectModalOpen, setExamMultipleSelectModalOpen] =
    useState(false);

  const { getExamSettingHistory } = useExamSettingHistory();

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
  ];

  useEffect(() => {
    if (!meQuery) return;
    if (meQuery.me.user) {
      fetchCategory(categoryQueryInput, 'no-cache').then((res) => {
        if (!res?.hasAccess) {
          message.error('접근 권한이 없습니다.');
          router.push('/');
        }
      });
      if (!category) return;
      const examSetting = getExamSettingHistory(category.id);
      if (!examSetting) return;
      const { examIds, isMultipleSelectMode } = examSetting;
      if (examIds) setExamSetting({ categoryId: category.id, examIds });
      if (isMultipleSelectMode)
        setExamSetting({ categoryId: category.id, isMultipleSelectMode });
    }
    if (!meQuery.me.user && category && !category.isPublic) {
      message.error('접근 권한이 없습니다.');
      router.push('/');
    }
  }, [meQuery]);

  if (!category) return null;

  return (
    <CategoryComponentBlock>
      <CategoryHeader
        userName={category.user.nickname}
        categoryName={category.name}
        categoryDescription={category.description}
      />
      {originalCategory && originalCategory.mockExam.length >= 1 ? (
        <>
          <CategoryControlbar
            switch={{
              checked: examSetting.isMultipleSelectMode,
              onChangeSwitch: handleChangeMultipleSelectMode,
            }}
            textInput={{
              onChangeText: (v) => handleFilterExams(v),
            }}
          />
          {examSetting.isMultipleSelectMode && (
            <div className="category-all-checkbox-and-study-button-wrapper">
              <div className="category-exam-all-checkbox-wrapper">
                <Checkbox
                  checked={
                    category?.mockExam.length === examSetting.examIds.length
                  }
                  onClick={handleAllExamsSelect}
                />
                <span>전체 선택</span>
              </div>
              <Button
                className="category-study-button"
                type="primary"
                disabled={examSetting.examIds.length === 0}
                onClick={() => setExamMultipleSelectModalOpen(true)}
              >
                다중 학습하기
              </Button>
            </div>
          )}
          <ExamList handleExamSelect={handleExamSelect} />
          <ExamMultipleSelectModal
            categoryId={category.id}
            examIds={examSetting.examIds}
            open={examMutipleSelectModalOpen}
            onCancel={() => setExamMultipleSelectModalOpen(false)}
          />
        </>
      ) : (
        <CategoryEmpty
          hasButton={category.user.id === meQuery?.me.user?.id}
          handleButtonClick={() => {
            setEditExamsModalOpen(true);
          }}
        />
      )}
      {meQuery?.me.user?.id === category.user.id && (
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
          open={editExamsModalOpen}
          onCancel={() => setEditExamsModalOpen(false)}
        />
      )}
    </CategoryComponentBlock>
  );
};

export default CategoryComponent;
