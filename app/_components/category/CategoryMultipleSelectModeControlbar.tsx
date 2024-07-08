import { Button, Tooltip } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import ExamMultipleSelectModal from './ExamMultipleSelectModal';
import useAuth from '../../_lib/hooks/useAuth';
import { useAppSelector } from '../../_modules/redux/store/configureStore';
import { MockExam, MockExamCategory } from '../../types';
import useExamSetting from '../../_lib/hooks/useExamSetting';
import CategoryAllCheckbox from './CategoryAllCheckbox';
import { queryClient } from '../../../pages/_app';

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
  const { handleAllExamsSelect } = useExamSetting({
    categoryId: category?.id,
    exams: category?.mockExam,
  });
  const [examMutipleSelectModalOpen, setExamMultipleSelectModalOpen] =
    useState(false);
  const isButtonDisabled = useAppSelector(
    (state) => state.examSetting.examSetting.examIds.length === 0
  );

  return (
    <CategoryMultipleSelectModeControlbarBlock>
      <div className="category-exam-all-checkbox-wrapper">
        <CategoryAllCheckbox
          categoryId={category?.id}
          exams={category?.mockExam}
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
          categoryId={category?.id}
          open={examMutipleSelectModalOpen}
          onCancel={() => setExamMultipleSelectModalOpen(false)}
        />
      )}
    </CategoryMultipleSelectModeControlbarBlock>
  );
};

export default CategoryMultipleSelectModeControlbar;
