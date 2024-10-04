import { Button, Pagination, Switch, Tooltip } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import ExamMultipleSelectModal from './ExamMultipleSelectModal';
import useAuth from '@lib/hooks/useAuth';
import { ExamType, MockExamCategory } from 'types';
import { responsive } from '@lib/utils/responsive';
import ObjectiveExamMultipleSelectModal from './objective/ObjectiveExamMultipleSelectModal';

const CategoryMultipleSelectModeControlbarBlock = styled.div`
  border-top: 1px solid ${({ theme }) => theme.color('colorSplit')};
  margin-top: 15px;
  padding: 5px 20px;
  .category-multiple-select-mode-controlbar {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .category-mutiple-select-pagination {
    @media (max-width: ${responsive.medium}) {
      position: sticky;
      top: 57px;
      background-color: white;
      z-index: 10;
    }
  }
`;

interface CategoryMultipleSelectModeControlbarProps {
  category: MockExamCategory;
  setIsOrderChangableMode: React.Dispatch<React.SetStateAction<boolean>>;
  isOrderChangableMode: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
}

const CategoryMultipleSelectModeControlbar: React.FC<
  CategoryMultipleSelectModeControlbarProps
> = ({
  category,
  setIsOrderChangableMode,
  isOrderChangableMode,
  page,
  setPage,
  pageSize,
}) => {
  const isObjective = category.examType === ExamType.Objective;
  const { handleCheckLogin, user } = useAuth();
  const isMyCategory = category.user.id === user?.id;
  const [examMutipleSelectModalOpen, setExamMultipleSelectModalOpen] =
    useState(false);

  const RandomSelectModal = isObjective
    ? ObjectiveExamMultipleSelectModal
    : ExamMultipleSelectModal;
  return (
    <CategoryMultipleSelectModeControlbarBlock>
      <div className="category-multiple-select-mode-controlbar">
        <Button
          className="category-study-button"
          type="primary"
          size="large"
          onClick={() => {
            if (!handleCheckLogin()) return;
            setExamMultipleSelectModalOpen(true);
          }}
        >
          랜덤 모의고사
        </Button>
        {isMyCategory && (
          <div className="ml-auto flex items-center gap-2">
            <span>순서 변경 모드</span>
            <Switch
              className="category-order-changable-switch"
              checked={isOrderChangableMode}
              onChange={(value) => setIsOrderChangableMode(value)}
            />
          </div>
        )}
      </div>
      {category.mockExam.length > pageSize && (
        <Pagination
          align="center"
          current={page}
          total={category.mockExam.length}
          pageSize={pageSize}
          onChange={(v) => setPage(v)}
        />
      )}
      {examMutipleSelectModalOpen && (
        <RandomSelectModal
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
