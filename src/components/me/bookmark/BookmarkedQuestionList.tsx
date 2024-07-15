import Portal from '@components/common/portal/Portal';
import SolutionModeCardItem from '@components/solutionMode/SolutionModeCardItem';
import useQuestions from '@lib/hooks/useQuestions';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { Empty, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const BookmarkedQuestionListBlock = styled.div``;

interface BookmarkedQuestionListProps {
  isLoading?: boolean;
}

const BookmarkedQuestionList: React.FC<BookmarkedQuestionListProps> = ({
  isLoading,
}) => {
  const [isReady, setIsReady] = useState(false);
  const { resetQuestions } = useQuestions();
  const questions = useAppSelector((state) => state.mockExam.questions);
  useEffect(() => {
    resetQuestions();
    setIsReady(true);
  }, []);

  return (
    <BookmarkedQuestionListBlock>
      {!isReady || isLoading ? (
        <Spin size="large" fullscreen />
      ) : (
        <div className="flex flex-col gap-[50px]">
          {questions.map((question, index) => (
            <SolutionModeCardItem
              key={question.id}
              index={index}
              isAnswerAllHidden={false}
            />
          ))}
          {questions.length === 0 && (
            <div className="flex justify-center items-center">
              <Empty description="북마크한 문제가 없습니다." />
            </div>
          )}
        </div>
      )}
    </BookmarkedQuestionListBlock>
  );
};

export default BookmarkedQuestionList;
