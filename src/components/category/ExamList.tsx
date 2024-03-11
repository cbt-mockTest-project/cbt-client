import React from 'react';
import styled from 'styled-components';
import ExamListItem from './ExamListItem';
import useExamSetting from '@lib/hooks/useExamSetting';
import useExamCategory from '@lib/hooks/useExamCategory';
import DragDropContextWrapper from '@components/common/dragDrop/DragDropContextWrapper';
import { Draggable } from 'react-beautiful-dnd';
import useAuth from '@lib/hooks/useAuth';

const ExamListBlock = styled.ul`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

interface ExamListProps {}

const ExamList: React.FC<ExamListProps> = () => {
  const { category, handleMoveExamOrder } = useExamCategory();
  const { examSetting, handleExamSelect } = useExamSetting({
    categoryId: category.id,
    exams: category.mockExam,
  });
  const { user } = useAuth();

  return (
    <>
      <DragDropContextWrapper
        droppableId="exam-create-droppable"
        onDragEnd={handleMoveExamOrder}
      >
        <ExamListBlock>
          {user?.id === category.user.id &&
            category.mockExam.map((exam, index) => {
              return (
                <Draggable
                  key={exam.id}
                  index={index}
                  draggableId={`${exam.id}`}
                >
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
      <ExamListBlock>
        {user?.id !== category.user.id &&
          category.mockExam.map((exam, index) => {
            return (
              <ExamListItem
                dragHandleProps={null}
                key={exam.id}
                exam={exam}
                examSetting={examSetting}
                handleExamSelect={handleExamSelect}
              />
            );
          })}
      </ExamListBlock>
    </>
  );
};

export default ExamList;
