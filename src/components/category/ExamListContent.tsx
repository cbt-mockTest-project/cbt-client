import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ExamListItem from './ExamListItem';
import { Draggable } from 'react-beautiful-dnd';
import useAuth from '@lib/hooks/useAuth';
import { MockExamCategory, User } from 'types';
import { responsive } from '@lib/utils/responsive';
import { useInView } from 'react-intersection-observer';
import { Skeleton } from 'antd';

const ExamListContentBlock = styled.ul`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  & > div {
    margin-bottom: 15px;
  }
  @media (max-width: ${responsive.medium}) {
    padding: 0 16px;
  }
`;

export const ITEMS_PER_PAGE = 10;

const ExamListContent = ({
  category,
  isMyCategory,
  isOrderChangableMode,
  categoryExams,
}) => {
  const { user } = useAuth();
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px 0px',
  });

  const isRecentStudy = (
    user: User,
    category: MockExamCategory,
    examId: number
  ) => {
    if (!user)
      return { hasRecentlyStudy: false, recentlyStudyQuestionNumber: 0 };

    const recentlyStudyExam = user.recentlyStudiedExams?.find(
      (el) => el.categoryId === category.id
    );

    return {
      hasRecentlyStudy: recentlyStudyExam?.examIds.includes(examId) || false,
      recentlyStudyQuestionNumber: recentlyStudyExam?.questionIndex || 0,
    };
  };

  useEffect(() => {
    if (inView) {
      setVisibleItems((prevItems) =>
        Math.min(prevItems + ITEMS_PER_PAGE, categoryExams.length)
      );
    }
  }, [inView, categoryExams.length]);

  const renderExamItem = (exam: any, index: number, isDraggable: boolean) => {
    const { hasRecentlyStudy, recentlyStudyQuestionNumber } = isRecentStudy(
      user as User,
      category,
      exam.id
    );

    const examItem = (
      <ExamListItem
        category={category}
        exam={exam}
        isOrderChangableMode={isOrderChangableMode}
        dragHandleProps={null}
        hasRecentlyMark={hasRecentlyStudy}
        recentlyStudyQuestionNumber={recentlyStudyQuestionNumber}
      />
    );

    return isDraggable ? (
      <Draggable key={exam.id} index={index} draggableId={`${exam.id}`}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            style={{ ...provided.draggableProps.style }}
          >
            {React.cloneElement(examItem, {
              dragHandleProps: provided.dragHandleProps,
            })}
          </div>
        )}
      </Draggable>
    ) : (
      <React.Fragment key={exam.id}>{examItem}</React.Fragment>
    );
  };

  const examItems = categoryExams
    .slice(0, visibleItems)
    .map((exam, index) => renderExamItem(exam, index, isMyCategory));

  return (
    <ExamListContentBlock>
      {examItems}
      {visibleItems < categoryExams.length ? (
        <>
          <div ref={ref} style={{ height: '1px' }} />
          <Skeleton active />
        </>
      ) : null}
    </ExamListContentBlock>
  );
};

export default ExamListContent;
