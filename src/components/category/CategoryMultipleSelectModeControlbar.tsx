import { Button, Checkbox, Tooltip } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import ExamMultipleSelectModal from './ExamMultipleSelectModal';
import useAuth from '@lib/hooks/useAuth';

const CategoryMultipleSelectModeControlbarBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 17px;
  .category-exam-all-checkbox {
    text-align: center;
    .ant-checkbox-inner {
      width: 25px;
      height: 25px;
    }
    .ant-checkbox-inner::after {
      width: 10px;
      height: 14px;
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
  const { handleCheckLogin } = useAuth();
  const [examMutipleSelectModalOpen, setExamMultipleSelectModalOpen] =
    useState(false);
  return (
    <CategoryMultipleSelectModeControlbarBlock>
      <div className="category-exam-all-checkbox-wrapper">
        <Checkbox
          className="category-exam-all-checkbox"
          checked={categoryAllChecked}
          onClick={handleAllExamsSelect}
        />
        <span style={{ cursor: 'pointer' }} onClick={handleAllExamsSelect}>
          전체 선택
        </span>
      </div>
      <Tooltip title={isButtonDisabled ? '과목을 선택해주세요.' : ''}>
        <Button
          className="category-study-button"
          type="primary"
          disabled={isButtonDisabled}
          onClick={() => {
            if (!handleCheckLogin()) return;
            setExamMultipleSelectModalOpen(true);
          }}
        >
          랜덤 모의고사
        </Button>
      </Tooltip>

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
