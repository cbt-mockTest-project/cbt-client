import palette from '../../_styles/palette';
import { Input, App } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import SearchQuestionList from './SearchQuestionList';
import useSearchQuestions from '../../_lib/hooks/useSearchQuestions';
import QuestionIdListBox from '../question/QuestionIdListBox';
import { SessionStorage } from '../../_lib/utils/sessionStorage';
import { PUBLIC_CATEGORY_NAME } from '../../_lib/constants/sessionStorage';

const SearchComponentBlock = styled.div`
  padding: 20px;
  .search-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
    color: ${({ theme }) => theme.color('colorTextSecondary')};
  }
`;

interface SearchComponentProps {}

const SearchComponent: React.FC<SearchComponentProps> = () => {
  const { message } = App.useApp();
  const router = useRouter();
  const categoryName = router.query.categoryName as string;
  const { questions } = useSearchQuestions();
  const questionIds = questions?.map((question) => question.id);
  const sessionStorage = new SessionStorage();

  useEffect(() => {
    if (router.isReady) {
      if (!categoryName) {
        message.error('잘못된 접근입니다.');
        router.replace('/');
      }
      const publicCategoryName = sessionStorage.get(PUBLIC_CATEGORY_NAME);
      if (publicCategoryName !== categoryName) {
        message.error('잘못된 접근입니다.');
        router.replace('/');
      }
    }
  }, [router.isReady, categoryName]);

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
