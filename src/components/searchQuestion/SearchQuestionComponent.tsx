import { useSearchQuestions } from '@lib/graphql/user/hook/useExamQuestion';
import useInput from '@lib/hooks/useInput';
import { handleError } from '@lib/utils/utils';
import { Card, Input, Spin } from 'antd';
import { debounce } from 'lodash';
import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';

const SearchQuestionComponentBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;

  .search-questions-wrapper {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
  }
  .search-question-card {
    width: 100%;
  }
`;

interface SearchQuestionComponentProps {}

const SearchQuestionComponent: React.FC<SearchQuestionComponentProps> = () => {
  const { value: searchValue, onChange: onSearchChange } = useInput('');
  const [
    searchQuestions,
    { loading: searchLoading, data: searchedQuestionsQuery },
  ] = useSearchQuestions();
  const onSearch = async () => {
    if (searchValue.length < 2) return;
    try {
      const res = await searchQuestions({
        variables: {
          input: {
            keyword: searchValue,
          },
        },
      });
      return res.data?.searchQuestionsByKeyword.questions;
    } catch (e) {
      handleError(e);
    }
  };

  useEffect(() => {
    const debounceOnSearch = debounce(onSearch, 1000);
    debounceOnSearch();
  }, [searchValue]);
  return (
    <SearchQuestionComponentBlock>
      <Input
        size="large"
        placeholder="문제를 검색해보세요 - 2글자 이상"
        value={searchValue}
        onChange={onSearchChange}
      />
      <div className="search-questions-wrapper">
        {searchLoading && <Spin size="large" />}
        {!searchLoading &&
          searchedQuestionsQuery?.searchQuestionsByKeyword.questions?.map(
            (question) => <Card key={question.id}>{question.question}</Card>
          )}
      </div>
    </SearchQuestionComponentBlock>
  );
};

export default SearchQuestionComponent;
