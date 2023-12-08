import { FolderOutlined } from '@ant-design/icons';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Button, Checkbox, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MockExamCategory } from 'types';
import ExamList from './ExamList';
import ExamSelectModal from './ExamSelectModal';
import useExamSettingHistory from '@lib/hooks/useExamSettingHistory';
import useExamSetting from '@lib/hooks/useExamSetting';

const CategoryComponentBlock = styled.div`
  padding: 30px;
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
  @media (max-width: ${responsive.medium}) {
    padding: 20px 16px;
  }
`;

interface CategoryComponentProps {
  category: MockExamCategory;
}

const CategoryComponent: React.FC<CategoryComponentProps> = ({ category }) => {
  const {
    examSetting,
    setExamSetting,
    handleAllExamsSelect,
    handleExamSelect,
    handleChangeMultipleSelectMode,
  } = useExamSetting({ category });

  const [examSelectModalVisible, setExamSelectModalVisible] = useState(false);
  const { getExamSettingHistory } = useExamSettingHistory();

  useEffect(() => {
    const examSetting = getExamSettingHistory(category.id);
    if (!examSetting) return;
    const { examIds, isMultipleSelectMode } = examSetting;
    if (examIds) setExamSetting({ categoryId: category.id, examIds });
    if (isMultipleSelectMode)
      setExamSetting({ categoryId: category.id, isMultipleSelectMode });
  }, []);

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
      <div className="category-multiple-select-toggle-switch-wrapper">
        <Switch
          checked={examSetting.isMultipleSelectMode}
          onChange={handleChangeMultipleSelectMode}
        />
        <span>다중 선택 모드</span>
      </div>
      {examSetting.isMultipleSelectMode && (
        <div className="category-all-checkbox-and-study-button-wrapper">
          <div className="category-exam-all-checkbox-wrapper">
            <Checkbox
              checked={category.mockExam.length === examSetting.examIds.length}
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

      <ExamList category={category} handleExamSelect={handleExamSelect} />
      <ExamSelectModal
        categoryId={category.id}
        examIds={examSetting.examIds}
        open={examSelectModalVisible}
        onCancel={() => setExamSelectModalVisible(false)}
      />
    </CategoryComponentBlock>
  );
};

export default CategoryComponent;
