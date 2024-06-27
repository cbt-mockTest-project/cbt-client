import palette from '@styles/palette';
import { Input } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import SearchQuestionList from './SearchQuestionList';
import useSearchQuestions from '@lib/hooks/useSearchQuestions';
import QuestionIdListBox from '@components/question/QuestionIdListBox';

const SearchComponentBlock = styled.div`
  padding: 20px;
  .search-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
    color: ${palette.colorSubText};
  }
`;

interface SearchComponentProps {}

const SearchComponent: React.FC<SearchComponentProps> = () => {
  const router = useRouter();
  const categoryName = router.query.categoryName as string;
  const { questions } = useSearchQuestions();
  const questionIds = questions?.map((question) => question.id);
  if (!categoryName) return null;

  return (
    <SearchComponentBlock>
      <div className="search-title">{`"${categoryName}" 문제 검색기`}</div>
      <Input.Search
        placeholder="문제 검색하기"
        enterButton
        size="large"
        defaultValue={router.query.q as string}
        onSearch={(value) => {
          router.push({
            query: { ...router.query, q: value },
          });
        }}
      />
      <QuestionIdListBox questionIds={questionIds || []} />
      <SearchQuestionList />
    </SearchComponentBlock>
  );
};

export default SearchComponent;
