import { QueryResult } from '@apollo/client';
import BasicBox from '@components/common/box/BasicBox';
import {
  useLazyReadQuestionsByState,
  useReadQuestionsByExamId,
  useReadQuestionsByState,
} from '@lib/graphql/user/hook/useExamQuestion';
import { ReadMockExamQuestionsByStateQuery } from '@lib/graphql/user/query/questionQuery.generated';
import palette from '@styles/palette';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { Exact, ReadMockExamQuestionsByStateInput } from 'types';
import QuestionAndSolutionBox from '../QuestionAndSolutionBox';

interface SelectedResultComponentProps {
  questionsQuery: QueryResult<
    ReadMockExamQuestionsByStateQuery,
    Exact<{
      input: ReadMockExamQuestionsByStateInput;
    }>
  >;
}

const SelectedResultComponent: React.FC<SelectedResultComponentProps> = ({
  questionsQuery,
}) => {
  const router = useRouter();
  const [readQuestions, { data: questionQueryData }] =
    useReadQuestionsByExamId();
  const { data } = questionsQuery;
  return (
    <SelectedResultComponentContainer>
      <h1>{router.query.title}</h1>
      {data?.readMockExamQuestionsByState.mockExamQusetions.map(
        (question, index) => {
          return (
            <div
              key={index}
              className="selected-result-question-and-solution-wrapper"
            >
              <QuestionAndSolutionBox
                label="문제"
                content={{
                  content: `${question?.number}. ${question?.question}`,
                  img: question?.question_img,
                  title: String(router.query.t || ''),
                }}
              />
              <QuestionAndSolutionBox
                key={index}
                label="정답"
                content={{
                  content: `${question?.solution}`,
                  img: question?.solution_img,
                  title: String(router.query.t || ''),
                }}
              />
            </div>
          );
        }
      )}
    </SelectedResultComponentContainer>
  );
};

export default SelectedResultComponent;

const SelectedResultComponentContainer = styled.div`
  margin-top: 30px;
  h1 {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .selected-result-question-and-solution-wrapper {
    padding-bottom: 40px;
    border-bottom: 1px dashed ${palette.gray_300};
    + div {
      margin-top: 40px;
    }
  }
`;
