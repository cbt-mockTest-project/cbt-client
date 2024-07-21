import SolutionModeCardItem from '@components/solutionMode/SolutionModeCardItem';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { Button } from 'antd';
import React, { useState } from 'react';
import { shallowEqual } from 'react-redux';
import styled from 'styled-components';

const BookmarkedExtraQuestionListBlock = styled.div``;

interface BookmarkedExtraQuestionListProps {}

const BookmarkedExtraQuestionList: React.FC<
  BookmarkedExtraQuestionListProps
> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);
  const questionIds = useAppSelector(
    (state) => state.mockExam.questions.map((question) => question.id),
    shallowEqual
  );
  if (questionIds.length <= 30) return null;
  return (
    <BookmarkedExtraQuestionListBlock className="flex flex-col gap-[50px] mt-[50px]">
      {isShowMore ? (
        questionIds
          .slice(30)
          .map((questionId, index) => (
            <SolutionModeCardItem key={questionId} index={30 + index} />
          ))
      ) : (
        <Button
          type="primary"
          className="w-full"
          size="large"
          loading={isLoading}
          onClick={() => {
            setIsLoading(true);
            setIsShowMore(true);
          }}
        >
          더보기
        </Button>
      )}
    </BookmarkedExtraQuestionListBlock>
  );
};

export default BookmarkedExtraQuestionList;
