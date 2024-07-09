import React from 'react';
import styled from 'styled-components';
import ExamListItem from './ExamListItem';
import { FixedSizeList as List } from 'react-window';
import DragDropContextWrapper from '@components/common/dragDrop/DragDropContextWrapper';
import { Draggable } from 'react-beautiful-dnd';
import useAuth from '@lib/hooks/useAuth';
import { MockExamCategory } from 'types';
import useCategoryExamList from './hooks/useCategoryExamList';

const ExamListBlock = styled.div`
  * {
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
    .exam-item-list {
      & > div {
        transform: translateZ(0);
      }
    }
  }
`;
interface ExamListProps {
  category: MockExamCategory;
  isOrderChangableMode?: boolean;
}

const ExamList: React.FC<ExamListProps> = ({
  category,
  isOrderChangableMode,
}) => {
  const { user } = useAuth();
  const isMyCategory = category.user.id === user?.id;
  const { categoryExams, handleMoveExam } = useCategoryExamList();

  const renderVirtualizedList = () => (
    <List
      className="exam-item-list"
      height={500}
      itemCount={categoryExams.length}
      itemSize={100}
      width="100%"
    >
      {renderExamItem}
    </List>
  );

  const renderNormalList = () => (
    <div className="exam-item-list">
      {categoryExams.map((exam, index) => renderExamItem({ index, style: {} }))}
    </div>
  );

  const renderExamItem = ({ index, style }) => {
    const exam = categoryExams[index];
    const { hasRecentlyStudy, recentlyStudyQuestionNumber } = isRecentStudy(
      user,
      category,
      exam
    );

    return (
      <div style={style}>
        {isMyCategory && isOrderChangableMode ? (
          <Draggable key={exam.id} index={index} draggableId={`${exam.id}`}>
            {(provided) => (
              <div
                {...provided.draggableProps}
                ref={provided.innerRef}
                style={{
                  ...provided.draggableProps.style,
                }}
              >
                <div className="mx-[20px] h-[100px] md:mx-[16px]">
                  <ExamListItem
                    category={category}
                    exam={exam}
                    isOrderChangableMode={isOrderChangableMode}
                    dragHandleProps={provided.dragHandleProps}
                    hasRecentlyMark={hasRecentlyStudy}
                    recentlyStudyQuestionNumber={recentlyStudyQuestionNumber}
                  />
                </div>
              </div>
            )}
          </Draggable>
        ) : (
          <div className="mx-[20px] h-[100px] md:mx-[16px]">
            <ExamListItem
              category={category}
              dragHandleProps={null}
              key={exam.id}
              exam={exam}
              hasRecentlyMark={hasRecentlyStudy}
              recentlyStudyQuestionNumber={recentlyStudyQuestionNumber}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <ExamListBlock>
      <DragDropContextWrapper
        droppableId="exam-create-droppable"
        onDragEnd={handleMoveExam}
      >
        {isOrderChangableMode ? renderNormalList() : renderVirtualizedList()}
      </DragDropContextWrapper>
    </ExamListBlock>
  );
};

const isRecentStudy = (user, category, exam) => {
  if (!user)
    return {
      hasRecentlyStudy: false,
      recentlyStudyQuestionNumber: 0,
    };
  const recentlyStudyExam = user.recentlyStudiedExams?.find(
    (el) => el.categoryId === category.id
  );
  const hasRecentlyStudy = recentlyStudyExam?.examIds.includes(exam.id);
  const recentlyStudyQuestionNumber = recentlyStudyExam?.questionIndex || 0;
  return {
    hasRecentlyStudy,
    recentlyStudyQuestionNumber,
  };
};

export default ExamList;
