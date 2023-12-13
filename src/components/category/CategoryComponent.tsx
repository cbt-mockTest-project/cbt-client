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
} from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReadMockExamCategoryByCategoryIdInput } from 'types';
import ExamList from './ExamList';
import ExamSelectModal from './ExamSelectModal';
import useExamSettingHistory from '@lib/hooks/useExamSettingHistory';
import useExamSetting from '@lib/hooks/useExamSetting';
import useExamCategory from '@lib/hooks/useExamCategory';
import CategoryEmpty from './CategoryEmpty';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import SaveCategoryModal from '@components/moduStorage/SaveCategoryModal';

const CategoryComponentBlock = styled.div`
  padding: 30px;
  position: relative;
  .category-creator-info {
    display: flex;
    gap: 3px;
    align-items: flex-end;
  }
  .category-creator-name {
    font-size: 18px;
    font-weight: bold;
  }

  .category-creator-label {
    font-size: 14px;
    font-weight: bold;
    color: ${palette.gray_700};
  }
  .category-info {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
    svg {
      font-size: 24px;
    }
  }
  .category-description {
    margin-top: 10px;
    font-size: 14px;
  }
  .category-study-button {
    margin-top: 20px;
  }
  .category-exam-all-checkbox-wrapper {
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 17px;
  }
  .category-multiple-select-toggle-switch-wrapper {
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
  .category-exam-filter-input {
    margin-top: 20px;
    border-radius: 0;
    border-top: none;
    border-left: none;
    border-right: none;
    max-width: 500px;

    &:focus {
      box-shadow: none;
    }
  }
  .category-setting-button-wrapper {
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid ${palette.textColor};
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s all ease-in;

    svg {
      font-size: 24px;
      color: ${palette.textColor};
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
  const { data: meQuery } = useMeQuery();
  const {
    originalCategory,
    category,
    fetchCategory,
    setExamCategory,
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

  const [saveCategoryModalOpen, setSaveCategoryModalOpen] = useState(false);
  const [examSelectModalVisible, setExamSelectModalVisible] = useState(false);
  const { getExamSettingHistory } = useExamSettingHistory();

  const categorySettingDropdownItems: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <button
          style={{ color: palette.textColor }}
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
          style={{ color: palette.textColor }}
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
        <button style={{ color: palette.textColor }}>시험지 추가하기</button>
      ),
    },
  ];

  const onChangeExamFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!originalCategory) return;
    const filteredCategory = {
      ...originalCategory,
      mockExam: originalCategory.mockExam.filter((exam) =>
        exam.title.includes(e.target.value)
      ),
    };
    setExamCategory(filteredCategory, false);
  };

  useEffect(() => {
    fetchCategory(categoryQueryInput);
    if (!category) return;
    const examSetting = getExamSettingHistory(category.id);
    if (!examSetting) return;
    const { examIds, isMultipleSelectMode } = examSetting;
    if (examIds) setExamSetting({ categoryId: category.id, examIds });
    if (isMultipleSelectMode)
      setExamSetting({ categoryId: category.id, isMultipleSelectMode });
  }, []);

  if (!category) return null;

  return (
    <CategoryComponentBlock>
      <div className="category-creator-info">
        <span className="category-creator-name">{category?.user.nickname}</span>
        <span className="category-creator-label">의 암기장</span>
      </div>
      <div className="category-info">
        <FolderOutlined />
        <span className="category-name">{category?.name}</span>
      </div>
      <div className="category-description">{category.description}</div>
      {category.mockExam.length >= 1 ? (
        <>
          <div className="category-multiple-select-toggle-switch-wrapper">
            <Switch
              checked={examSetting.isMultipleSelectMode}
              onChange={handleChangeMultipleSelectMode}
            />
            <span>다중 선택 모드</span>
          </div>
          <div>
            <Input
              onChange={onChangeExamFilter}
              className="category-exam-filter-input"
              placeholder="암기장 필터링"
            />
          </div>
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
                onClick={() => setExamSelectModalVisible(true)}
              >
                학습하기
              </Button>
            </div>
          )}
          <ExamList handleExamSelect={handleExamSelect} />
          <ExamSelectModal
            categoryId={category.id}
            examIds={examSetting.examIds}
            open={examSelectModalVisible}
            onCancel={() => setExamSelectModalVisible(false)}
          />
        </>
      ) : (
        <CategoryEmpty />
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
    </CategoryComponentBlock>
  );
};

export default CategoryComponent;
