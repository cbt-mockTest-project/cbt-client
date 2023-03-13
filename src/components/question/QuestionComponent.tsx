import GoogleAd from '@components/common/ad/GoogleAd';
import ExamSolutionList from '@components/exam/solution/ExamSolutionList';
import { useLazyReadQuestion } from '@lib/graphql/user/hook/useExamQuestion';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { READ_QUESTION } from '@lib/graphql/user/query/questionQuery';
import { ReadMockExamQuestionQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { useApollo } from '@modules/apollo';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';

interface QuestionComponentProps {
  questionQuery: ReadMockExamQuestionQuery;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  questionQuery,
}) => {
  const router = useRouter();
  const client = useApollo({}, '');
  const [
    readQuestion,
    { data: questionQueryOnClientSide, refetch: refetchReadQuestion },
  ] = useLazyReadQuestion('network-only');
  const { data: meQuery } = useMeQuery();
  const question = (questionQueryOnClientSide || questionQuery)
    .readMockExamQuestion.mockExamQusetion;
  useEffect(() => {
    (async () => {
      if (router.query.Id) {
        const res = await readQuestion({
          variables: {
            input: { questionId: Number(String(router.query.Id)) },
          },
        });
        if (res.data?.readMockExamQuestion.ok) {
          client.writeQuery<ReadMockExamQuestionQuery>({
            query: READ_QUESTION,
            data: {
              readMockExamQuestion: res.data.readMockExamQuestion,
            },
          });
        }
      }
    })();
  }, [router.query.Id, meQuery]);
  const title = `${
    question.mockExam.title + ' ' + question.number + '번 문제'
  }`;
  return (
    <QuestionComponentContainer>
      <h3>{title}</h3>
      <GoogleAd type="display" />
      <ExamSolutionList
        refetch={refetchReadQuestion}
        isSolutionAllHide={false}
        title={question.question}
        commentType="basic"
        question={question}
        hasNewWindowButton={false}
      />
    </QuestionComponentContainer>
  );
};

export default QuestionComponent;

const QuestionComponentContainer = styled.div`
  li {
    list-style: none;
  }
  padding: 20px;
`;
