import useInput from '@lib/hooks/useInput';
import { responsive } from '@lib/utils/responsive';
import { handleError } from '@lib/utils/utils';
import palette from '@styles/palette';
import { Button, Card, Image, Input, Spin } from 'antd';
import { debounce } from 'lodash';
import Link from 'next/link';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import EditorStyle from '@styles/editorStyle';
import { useLzaySearchQuestions } from '@lib/graphql/hook/useExamQuestion';

const SearchQuestionComponentBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
  margin-bottom: 100px;
  .search-questions-wrapper {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
    gap: 20px;
  }
  .search-question-card {
    width: 100%;
  }
  .search-question-card {
    width: 100%;
  }

  .search-move-button {
    margin-top: 20px;
    width: 100%;
    max-width: 300px;
  }
  .search-question-card-label {
    font-size: 14px;
    color: ${palette.gray_700};
  }
  pre {
    white-space: pre-wrap;
  }
  .search-question-content {
    ${EditorStyle}
  }

  @media (max-width: ${responsive.medium}) {
    padding: 20px;
  }
`;

interface SearchQuestionComponentProps {}

const SearchQuestionComponent: React.FC<SearchQuestionComponentProps> = () => {
  const { value: searchValue, onChange: onSearchChange } = useInput('');
  const [
    searchQuestions,
    { loading: searchLoading, data: searchedQuestionsQuery },
  ] = useLzaySearchQuestions();
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
            (question) => (
              <Card
                key={question.id}
                className="search-question-card"
                title={
                  question.mockExam?.title + ' - ' + question.number + '번 문제'
                }
              >
                <p className="search-question-card-label">문제</p>
                <pre className="search-question-content">
                  {parse(question.question || '')}
                </pre>

                {question.question_img && question.question_img.length >= 1 && (
                  <Image
                    src={question.question_img[0].url}
                    alt="question-image"
                  />
                )}
                <br />
                <br />
                <p className="search-question-card-label">정답</p>
                <pre className="search-question-content">
                  {parse(question.solution || '')}
                </pre>
                {question.solution_img && question.solution_img.length >= 1 && (
                  <Image
                    src={question.solution_img[0].url}
                    alt="question-image"
                  />
                )}
                <Link href={`/question/${question.id}`}>
                  <Button
                    className="search-move-button"
                    type="primary"
                    size="large"
                  >
                    상세 페이지 보기
                  </Button>
                </Link>
              </Card>
            )
          )}
      </div>
    </SearchQuestionComponentBlock>
  );
};

export default SearchQuestionComponent;
