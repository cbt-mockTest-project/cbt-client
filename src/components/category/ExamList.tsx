import React from 'react';
import DragDropContextWrapper from '@components/common/dragDrop/DragDropContextWrapper';
import useAuth from '@lib/hooks/useAuth';
import { MockExamCategory } from 'types';
import useCategoryExamList from './hooks/useCategoryExamList';
import ExamListContent from './ExamListContent';
import { uniqueId } from 'lodash';

interface ExamListProps {
  category: MockExamCategory;
  isOrderChangableMode?: boolean;
}

export const ITEMS_PER_PAGE = 10;

const ExamList: React.FC<ExamListProps> = ({
  category,
  isOrderChangableMode,
}) => {
  const { user } = useAuth();
  const isMyCategory = category.user.id === user?.id;
  const { categoryExams, handleMoveExam } = useCategoryExamList();
  return (
    <>
      {isMyCategory ? (
        <DragDropContextWrapper
          droppableId="exam-create-droppable"
          onDragEnd={handleMoveExam}
        >
          <ExamListContent
            category={category}
            isMyCategory={isMyCategory}
            isOrderChangableMode={isOrderChangableMode}
            categoryExams={categoryExams}
          />
        </DragDropContextWrapper>
      ) : (
        <ExamListContent
          category={category}
          key={uniqueId()}
          isMyCategory={isMyCategory}
          isOrderChangableMode={isOrderChangableMode}
          categoryExams={categoryExams}
        />
      )}
    </>
  );
};

export default ExamList;
