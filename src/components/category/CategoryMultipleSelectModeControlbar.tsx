import { Button, Tooltip } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import ExamMultipleSelectModal from './ExamMultipleSelectModal';
import useAuth from '@lib/hooks/useAuth';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { MockExam } from 'types';
import useExamSetting from '@lib/hooks/useExamSetting';
import CategoryAllCheckbox from './CategoryAllCheckbox';

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
  categoryId: number;
  exams: MockExam[];
  isMyAllExams?: boolean;
}

const CategoryMultipleSelectModeControlbar: React.FC<
  CategoryMultipleSelectModeControlbarProps
> = ({ categoryId, isMyAllExams, exams }) => {
  const { handleCheckLogin } = useAuth();
  const { handleAllExamsSelect } = useExamSetting({
    categoryId,
    exams,
  });
  const [examMutipleSelectModalOpen, setExamMultipleSelectModalOpen] =
    useState(false);
  const isButtonDisabled = useAppSelector(
    (state) => state.examSetting.examSetting.examIds.length === 0
  );

  return (
    <CategoryMultipleSelectModeControlbarBlock>
      <div className="category-exam-all-checkbox-wrapper">
        <CategoryAllCheckbox categoryId={categoryId} exams={exams} />
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
          open={examMutipleSelectModalOpen}
          onCancel={() => setExamMultipleSelectModalOpen(false)}
        />
      )}
    </CategoryMultipleSelectModeControlbarBlock>
  );
};

export default CategoryMultipleSelectModeControlbar;
