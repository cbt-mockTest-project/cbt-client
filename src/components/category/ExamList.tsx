import React from 'react';
import styled from 'styled-components';
import ExamListItem from './ExamListItem';
import useExamSetting from '@lib/hooks/useExamSetting';
import useExamCategory from '@lib/hooks/useExamCategory';
import DragDropContextWrapper from '@components/common/dragDrop/DragDropContextWrapper';
import { Draggable } from 'react-beautiful-dnd';
import useAuth from '@lib/hooks/useAuth';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { Skeleton } from 'antd';
import useCheckHasCategoryAccess from './hooks/useCheckHasCategoryAccess';

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
  const { isCategoryAccess } = useCheckHasCategoryAccess();
  const categoryId = useAppSelector((state) => state.examCategory.category.id);
  const isPrivate = useAppSelector(
    (state) => !state.examCategory.category.isPublic
  );
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
                if (!user)
                  return {
                    hasRecentlyStudy: false,
                    recentlyStudyQuestionNumber: 0,
                  };
                const recentlyStudyExam = user.recentlyStudiedExams?.find(
                  (el) => el.categoryId === categoryId
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
          ((isCategoryAccess && isPrivate) || !isPrivate) &&
          exams.map((exam, index) => {
            const isRecentStudy = () => {
              if (!user)
                return {
                  hasRecentlyStudy: false,
                  recentlyStudyQuestionNumber: 0,
                };
              const recentlyStudyExam = user.recentlyStudiedExams?.find(
                (el) => el.categoryId === categoryId
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
                dragHandleProps={null}
                key={exam.id}
                exam={exam}
                hasRecentlyMark={hasRecentlyStudy}
                recentlyStudyQuestionNumber={recentlyStudyQuestionNumber}
              />
            );
          })}
        {!isCategoryAccess && isPrivate && (
          <div className="flex flex-col gap-2">
            <Skeleton active />
            <Skeleton active />
          </div>
        )}
      </ExamListBlock>
    </>
  );
};

export default ExamList;
