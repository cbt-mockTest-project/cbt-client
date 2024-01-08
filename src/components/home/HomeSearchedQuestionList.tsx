import React from 'react';
import styled from 'styled-components';
import { MockExamQuestion } from 'types';
import HomeSearchedListTemplate from './HomeSearchedListTemplate';

const HomeSearchedQuestionListBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  .home-searched-qusetion-list-title {
    font-size: 16px;
    font-weight: 700;
  }
`;

interface HomeSearchedQuestionListProps {
  keyword: string;
  questions: MockExamQuestion[];
}

const HomeSearchedQuestionList: React.FC<HomeSearchedQuestionListProps> = ({
  keyword,
  questions,
}) => {
  return (
    <HomeSearchedListTemplate keyword={keyword}>
      <HomeSearchedQuestionListBlock></HomeSearchedQuestionListBlock>
    </HomeSearchedListTemplate>
  );
};

export default HomeSearchedQuestionList;
