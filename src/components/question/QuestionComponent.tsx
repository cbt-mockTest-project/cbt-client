import GoogleAd from '@components/common/ad/GoogleAd';
import ExamSolutionList from '@components/exam/solution/ExamSolutionList';
import {
  useLazyReadQuestion,
  useDeleteQuestion,
} from '@lib/graphql/user/hook/useExamQuestion';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { READ_QUESTION } from '@lib/graphql/user/query/questionQuery';
import { ReadMockExamQuestionQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { useApollo } from '@modules/apollo';
import { Button, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import QuestionComponentSkeleton from './QuestionComponentSkeleton';
import { handleError } from '@lib/utils/utils';

interface QuestionComponentProps {
  questionQuery?: ReadMockExamQuestionQuery;
  isSolutionAllHide?: boolean;
  isPreview?: boolean;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  questionQuery,
  isPreview = false,
  isSolutionAllHide = false,
}) => {
  const router = useRouter();
  const client = useApollo({}, '');
  const [
    readQuestion,
    { data: questionQueryOnClientSide, refetch: refetchReadQuestion },
  ] = useLazyReadQuestion('network-only');
  const { data: meQuery } = useMeQuery();
  const [deleteQuestion] = useDeleteQuestion();
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
  if (!questionQuery && !questionQueryOnClientSide)
    return <QuestionComponentSkeleton />;

  const requestDeleteQuestion = async () => {
    try {
      const confirmed = confirm('정말 삭제하시겠습니까?');
      if (confirmed) {
        const res = await deleteQuestion({
          variables: { input: { id: Number(String(router.query.Id)) } },
        });
        if (res.data?.deleteMockExamQuestion.ok) {
          message.success('삭제되었습니다.');
          return;
        }
        return message.error(res.data?.deleteMockExamQuestion.error);
      }
    } catch (e) {
      handleError(e);
    }
  };

  const question = (
    (questionQueryOnClientSide || questionQuery) as ReadMockExamQuestionQuery
  ).readMockExamQuestion.mockExamQusetion;

  const title = `${
    question.mockExam?.title + ' ' + question.number + '번 문제'
  }`;
  return (
    <QuestionComponentContainer>
      {(questionQueryOnClientSide?.readMockExamQuestion.isCoAuthor ||
        question.user.id === meQuery?.me.user?.id) && (
        <div className="question-component-top-button-wrapper">
          <Link
            href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/question/${router.query.Id}/edit`}
          >
            <Button>수정하기</Button>
          </Link>
          <Button onClick={requestDeleteQuestion}>삭제하기</Button>
        </div>
      )}
      <h3>{title}</h3>
      <ExamSolutionList
        isSolutionAllHide={isSolutionAllHide}
        title={question.question}
        commentType="basic"
        question={question}
        hasNewWindowButton={false}
        isPreview={isPreview}
        isDetailPage={true}
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
  .question-component-top-button-wrapper {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
`;
