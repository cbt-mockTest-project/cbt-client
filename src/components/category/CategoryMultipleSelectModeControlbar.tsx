import { Button, Tooltip } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import ExamMultipleSelectModal from './ExamMultipleSelectModal';
import useAuth from '@lib/hooks/useAuth';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { MockExamCategory } from 'types';
import useExamSetting from '@lib/hooks/useExamSetting';

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
  category: MockExamCategory;
}

const CategoryMultipleSelectModeControlbar: React.FC<
  CategoryMultipleSelectModeControlbarProps
> = ({ category }) => {
  const { handleCheckLogin } = useAuth();

  const [examMutipleSelectModalOpen, setExamMultipleSelectModalOpen] =
    useState(false);

  return (
    <CategoryMultipleSelectModeControlbarBlock>
      <Button
        className="category-study-button"
        type="primary"
        onClick={() => {
          if (!handleCheckLogin()) return;
          setExamMultipleSelectModalOpen(true);
        }}
      >
        랜덤 모의고사
      </Button>
      {examMutipleSelectModalOpen && (
        <ExamMultipleSelectModal
          categoryId={category.id}
          open={examMutipleSelectModalOpen}
          exams={category.mockExam}
          onCancel={() => setExamMultipleSelectModalOpen(false)}
        />
      )}
    </CategoryMultipleSelectModeControlbarBlock>
  );
};

export default CategoryMultipleSelectModeControlbar;
