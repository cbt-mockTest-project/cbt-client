import React from 'react';
import styled from 'styled-components';
import ExamListItem from './ExamListItem';
import DragDropContextWrapper from '@components/common/dragDrop/DragDropContextWrapper';
import { Draggable } from 'react-beautiful-dnd';
import useAuth from '@lib/hooks/useAuth';
import { MockExamCategory } from 'types';
import useCategoryExamList from './hooks/useCategoryExamList';

const ExamListBlock = styled.ul`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

interface ExamListProps {
  category: MockExamCategory;
}

const ExamList: React.FC<ExamListProps> = ({ category }) => {
  const { user } = useAuth();
  const isMyCategory = category.user.id === user?.id;

  const { categoryExams, handleMoveExam } = useCategoryExamList();
  return (
    <>
      <DragDropContextWrapper
        droppableId="exam-create-droppable"
        onDragEnd={handleMoveExam}
      >
        <ExamListBlock>
          {isMyCategory &&
            categoryExams.map((exam, index) => {
              const isRecentStudy = () => {
                if (!user)
                  return {
                    hasRecentlyStudy: false,
                    recentlyStudyQuestionNumber: 0,
                  };
                const recentlyStudyExam = user.recentlyStudiedExams?.find(
                  (el) => el.categoryId === category.id
                );
                const hasRecentlyStudy = recentlyStudyExam?.examIds.includes(
                  exam.id
                );
                const recentlyStudyQuestionNumber =
                  recentlyStudyExam?.questionIndex || 0;
                return {
                  hasRecentlyStudy,
                  recentlyStudyQuestionNumber,
                };
              };
              const { hasRecentlyStudy, recentlyStudyQuestionNumber } =
                isRecentStudy();
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
                        category={category}
                        exam={exam}
                        dragHandleProps={provided.dragHandleProps}
                        hasRecentlyMark={hasRecentlyStudy}
                        recentlyStudyQuestionNumber={
                          recentlyStudyQuestionNumber
                        }
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
          categoryExams.map((exam, index) => {
            const isRecentStudy = () => {
              if (!user)
                return {
                  hasRecentlyStudy: false,
                  recentlyStudyQuestionNumber: 0,
                };
              const recentlyStudyExam = user.recentlyStudiedExams?.find(
                (el) => el.categoryId === category.id
              );
              const hasRecentlyStudy = recentlyStudyExam?.examIds.includes(
                exam.id
              );
              const recentlyStudyQuestionNumber =
                recentlyStudyExam?.questionIndex || 0;
              return {
                hasRecentlyStudy,
                recentlyStudyQuestionNumber,
              };
            };
            const { hasRecentlyStudy, recentlyStudyQuestionNumber } =
              isRecentStudy();
            return (
              <ExamListItem
                category={category}
                dragHandleProps={null}
                key={exam.id}
                exam={exam}
                hasRecentlyMark={hasRecentlyStudy}
                recentlyStudyQuestionNumber={recentlyStudyQuestionNumber}
              />
            );
          })}
      </ExamListBlock>
    </>
  );
};

export default ExamList;
