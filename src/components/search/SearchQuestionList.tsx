import useSearchQuestions from '@lib/hooks/useSearchQuestions';
import React from 'react';
import styled from 'styled-components';
import SearchQuestionListItem from './SearchQuestionListItem';
import { MockExamQuestion } from 'types';
import useAuth from '@lib/hooks/useAuth';
import { Empty, Skeleton } from 'antd';
import ObjectiveStudyTestModeItem from '@components/study/objective/testMode/ObjectiveStudyTestModeItem';
import ObjectiveStudyItem from '@components/study/objective/ObjectiveStudyItem';
import GoogleAd from '@components/common/ad/GoogleAd';

const SearchQuestionListBlock = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  .search-objective-question-list-item {
    border: 1px solid ${({ theme }) => theme.color('colorBorder')};
    border-radius: 5px;
    padding: 10px;
  }
`;

interface SearchQuestionListProps {}

const SearchQuestionList: React.FC<SearchQuestionListProps> = () => {
  const { user } = useAuth();
  const { questions, isLoading, saveBookmark, deleteBookmark } =
    useSearchQuestions();

  return (
    <SearchQuestionListBlock>
      {questions.map((question, index) =>
        question.objectiveData ? (
          <div
            className="search-objective-question-list-item"
            key={question.id}
          >
            <ObjectiveStudyItem
              hasAddMemoButton={false}
              handleSaveBookmark={saveBookmark}
              handleDeleteBookmark={deleteBookmark}
              question={question as MockExamQuestion}
              index={index + 1}
              readOnly
            />
          </div>
        ) : (
          <SearchQuestionListItem
            key={question.id}
            question={question as MockExamQuestion}
            hasEditButton={user?.id === question.user?.id}
          />
        )
      )}
      {isLoading && <Skeleton active />}
      {!isLoading && questions.length === 0 && (
        <>
          <GoogleAd />
          <Empty
            description="검색 결과가 없습니다."
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </>
      )}
    </SearchQuestionListBlock>
  );
};

export default SearchQuestionList;
