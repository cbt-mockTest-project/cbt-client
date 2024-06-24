import useSearchQuestions from '@lib/hooks/useSearchQuestions';
import React from 'react';
import styled from 'styled-components';
import SearchQuestionListItem from './SearchQuestionListItem';
import { MockExamQuestion } from 'types';
import useAuth from '@lib/hooks/useAuth';
import { Empty, Skeleton } from 'antd';

const SearchQuestionListBlock = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

interface SearchQuestionListProps {}

const SearchQuestionList: React.FC<SearchQuestionListProps> = () => {
  const { user, handleCheckLogin } = useAuth();
  const { questions, isLoading, toogleQuestionBookmark } = useSearchQuestions();

  return (
    <SearchQuestionListBlock>
      {questions.map((question) => (
        <SearchQuestionListItem
          key={question.id}
          question={question as MockExamQuestion}
          hasEditButton={user?.id === question.user?.id}
          onClickBookmark={() => {
            if (!handleCheckLogin()) return;
            toogleQuestionBookmark({
              questionId: question.id,
            });
          }}
        />
      ))}
      {isLoading && <Skeleton active />}
      {!isLoading && questions.length === 0 && (
        <Empty
          description="검색 결과가 없습니다."
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </SearchQuestionListBlock>
  );
};

export default SearchQuestionList;
