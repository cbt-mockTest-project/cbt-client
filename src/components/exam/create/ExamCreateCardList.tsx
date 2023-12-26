import DragDropContextWrapper from '@components/common/dragDrop/DragDropContextWrapper';
import React, { useState } from 'react';
import { Draggable, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import ExamCreateCardItem from './ExamCreateCardItem';
import { useFormContext } from 'react-hook-form';
import { CreateExamForm } from 'customTypes';

const ExamCreateCardListBlock = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

interface ExamCreateCardListProps {}

const ExamCreateCardList: React.FC<ExamCreateCardListProps> = ({}) => {
  const { watch, setValue } = useFormContext<CreateExamForm>();
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const reorderedItems = Array.from(watch('questions'));
    const [movedItem] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, movedItem);
    setValue('questions', reorderedItems);
  };
  return (
    <DragDropContextWrapper
      droppableId="exam-create-droppable"
      onDragEnd={onDragEnd}
    >
      <ExamCreateCardListBlock>
        {watch('questions').map((question, index) => {
          return (
            <Draggable
              key={question.questionId}
              index={index}
              draggableId={`${question.questionId}`}
            >
              {(provided) => (
                <div
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                  style={{
                    ...provided.draggableProps.style,
                  }}
                >
                  <ExamCreateCardItem
                    index={index}
                    question={question}
                    dragHandleProps={provided.dragHandleProps}
                  />
                </div>
              )}
            </Draggable>
          );
        })}
      </ExamCreateCardListBlock>
    </DragDropContextWrapper>
  );
};

export default ExamCreateCardList;
