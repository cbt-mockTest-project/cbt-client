import React from 'react';
import styled from 'styled-components';
import { MockExamQuestion } from 'types';
import HomeSearchedListTemplate from './HomeSearchedListTemplate';
import HomeSearchedQuestionListItem from './HomeSearchedQuestionListItem';
import HomeSearchLoader from './HomeSearchLoader';

const HomeSearchedQuestionListBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
  position: relative;
  .home-searched-qusetion-list-title {
    font-size: 16px;
    font-weight: 700;
  }
`;

interface HomeSearchedQuestionListProps {
  keyword: string;
  questions: MockExamQuestion[];
  handleSaveBookmark: (question: MockExamQuestion) => Promise<void>;
  loading?: boolean;
}

const HomeSearchedQuestionList: React.FC<HomeSearchedQuestionListProps> = ({
  keyword,
  questions,
  handleSaveBookmark,
  loading,
}) => {
  return (
    <HomeSearchedListTemplate keyword={keyword}>
      <HomeSearchedQuestionListBlock>
        {!loading &&
          questions.map((question) => (
            <HomeSearchedQuestionListItem
              key={question.id}
              question={question as MockExamQuestion}
              handleSaveBookmark={handleSaveBookmark}
            />
          ))}
      </HomeSearchedQuestionListBlock>
      {loading && <HomeSearchLoader />}
    </HomeSearchedListTemplate>
  );
};

export default HomeSearchedQuestionList;
