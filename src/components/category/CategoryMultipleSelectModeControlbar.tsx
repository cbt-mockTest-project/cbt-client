import { Button, Checkbox } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import ExamMultipleSelectModal from './ExamMultipleSelectModal';

const CategoryMultipleSelectModeControlbarBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 17px;
  .category-study-button {
    margin-top: 20px;
  }
  .category-exam-all-checkbox-wrapper {
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 17px;
  }
`;

interface CategoryMultipleSelectModeControlbarProps {
  checkbox: {
    categoryAllChecked: boolean;
    handleAllExamsSelect: () => void;
  };
  button: {
    isButtonDisabled: boolean;
  };
  categoryId: number;
  examIds: number[];
}

const CategoryMultipleSelectModeControlbar: React.FC<
  CategoryMultipleSelectModeControlbarProps
> = ({
  checkbox: { categoryAllChecked, handleAllExamsSelect },
  button: { isButtonDisabled },
  categoryId,
  examIds,
}) => {
  const [examMutipleSelectModalOpen, setExamMultipleSelectModalOpen] =
    useState(false);
  return (
    <CategoryMultipleSelectModeControlbarBlock>
      <div className="category-exam-all-checkbox-wrapper">
        <Checkbox checked={categoryAllChecked} onClick={handleAllExamsSelect} />
        <span>전체 선택</span>
      </div>
      <Button
        className="category-study-button"
        type="primary"
        disabled={isButtonDisabled}
        onClick={() => setExamMultipleSelectModalOpen(true)}
      >
        다중 학습하기
      </Button>
      {examMutipleSelectModalOpen && (
        <ExamMultipleSelectModal
          categoryId={categoryId}
          examIds={examIds}
          open={examMutipleSelectModalOpen}
          onCancel={() => setExamMultipleSelectModalOpen(false)}
        />
      )}
    </CategoryMultipleSelectModeControlbarBlock>
  );
};

export default CategoryMultipleSelectModeControlbar;
