import React from 'react';
import styled from 'styled-components';
import ExamListItem from './ExamListItem';
import useExamSetting from '@lib/hooks/useExamSetting';
import useExamCategory from '@lib/hooks/useExamCategory';
import DragDropContextWrapper from '@components/common/dragDrop/DragDropContextWrapper';
import { Draggable } from 'react-beautiful-dnd';
import useAuth from '@lib/hooks/useAuth';
import { useAppSelector } from '@modules/redux/store/configureStore';

const ExamListBlock = styled.ul`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

interface ExamListProps {}

const ExamList: React.FC<ExamListProps> = () => {
  const { handleMoveExamOrder } = useExamCategory();
  const { user } = useAuth();
  const categoryId = useAppSelector((state) => state.examCategory.category.id);
  const isMyCategory = useAppSelector(
    (state) =>
      state.examCategory.category &&
      state.examCategory.category.user.id === user?.id
  );
  const exams = useAppSelector((state) => state.examCategory.category.mockExam);

  return (
    <>
      <DragDropContextWrapper
        droppableId="exam-create-droppable"
        onDragEnd={(result) => handleMoveExamOrder({ result, categoryId })}
      >
        <ExamListBlock>
          {isMyCategory &&
            exams.map((exam, index) => {
              const isRecentStudy = () => {
                if (!user) return false;
                return !!user.recentlyStudiedExams
                  ?.find((el) => el.categoryId === categoryId)
                  ?.examIds.includes(exam.id);
              };
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
                        dragHandleProps={provided.dragHandleProps}
                        hasRecentlyMark={isRecentStudy()}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
        </ExamListBlock>
      </DragDropContextWrapper>
      <ExamListBlock>
        {!isMyCategory &&
          exams.map((exam, index) => {
            return (
              <ExamListItem dragHandleProps={null} key={exam.id} exam={exam} />
            );
          })}
      </ExamListBlock>
    </>
  );
};

export default ExamList;
