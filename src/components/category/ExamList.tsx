import React, { useState } from 'react';
import styled from 'styled-components';
import { MockExamCategory } from 'types';
import ExamListItem from './ExamListItem';
import useExamSetting from '@lib/hooks/useExamSetting';
import useExamCategory from '@lib/hooks/useExamCategory';
import DragDropContextWrapper from '@components/common/dragDrop/DragDropContextWrapper';
import { Draggable, DropResult } from 'react-beautiful-dnd';

const ExamListBlock = styled.ul`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  gap: 20px;
`;

interface ExamListProps {}

const ExamList: React.FC<ExamListProps> = () => {
  const { category, handleMoveExamOrder } = useExamCategory();
  const { examSetting, handleExamSelect } = useExamSetting({
    categoryId: category.id,
    exams: category.mockExam,
  });
  return (
    <DragDropContextWrapper
      droppableId="exam-create-droppable"
      onDragEnd={handleMoveExamOrder}
    >
      <ExamListBlock>
        {category.mockExam.map((exam, index) => {
          return (
            <Draggable key={exam.id} index={index} draggableId={`${exam.id}`}>
              {(provided) => (
                <div
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                  style={{
                    ...provided.draggableProps.style,
                  }}
                >
                  <ExamListItem
                    exam={exam}
                    examSetting={examSetting}
                    handleExamSelect={handleExamSelect}
                    dragHandleProps={provided.dragHandleProps}
                  />
                </div>
              )}
            </Draggable>
          );
        })}
      </ExamListBlock>
    </DragDropContextWrapper>
  );
};

export default ExamList;
