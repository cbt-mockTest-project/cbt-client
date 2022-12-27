import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { GetServerSideProps, NextPage } from 'next';
import Layout from '@components/common/layout/Layout';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { ME_QUERY } from '@lib/graphql/user/query/userQuery';
import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { READ_QUESTIONS_BY_ID } from '@lib/graphql/user/query/questionQuery';
import { convertWithErrorHandlingFunc, ellipsisText } from '@lib/utils/utils';
import palette from '@styles/palette';
import { Button, message } from 'antd';
import ReportModal from '@components/common/modal/ReportModal';
import { useCreateFeedBack } from '@lib/graphql/user/hook/useFeedBack';
import WithHead from '@components/common/head/WithHead';

interface SolutionProps {
  questionsQuery: ReadMockExamQuestionsByMockExamIdQuery;
}

interface QuestionOption {
  title: string;
  id: number;
}

const Solution: NextPage<SolutionProps> = ({ questionsQuery }) => {
  const title = questionsQuery.readMockExamQuestionsByMockExamId.title;
  const [reportModalState, setReportModalState] = useState(false);
  const [createFeedBack] = useCreateFeedBack();
  const reportValue = useRef('');
  const [currentQuestion, setCurrentQuestion] = useState<QuestionOption | null>(
    null
  );
  const onToggleReportModalState = () => setReportModalState(!reportModalState);
  const openReportModal = (title: string, id: number) => {
    setCurrentQuestion({ title, id });
    setReportModalState(true);
  };
  const requestReport = async () => {
    const content = reportValue.current;
    if (content.length <= 4) {
      return message.warn('5글자 이상 입력해주세요.');
    }
    if (currentQuestion && content) {
      const questionId = currentQuestion.id;
      const res = await createFeedBack({
        variables: { input: { content, questionId } },
      });
      if (res.data?.createMockExamQuestionFeedback.ok) {
        message.success('신고가 접수되었습니다.');
        setReportModalState(false);
        return;
      }
      return message.error({
        content: res.data?.createMockExamQuestionFeedback.error,
      });
    }
  };
  const tryReport = convertWithErrorHandlingFunc({
    callback: requestReport,
  });
  return (
    <>
      <WithHead
        title={`${questionsQuery.readMockExamQuestionsByMockExamId.title} 해설 | 실기CBT`}
        pageHeadingTitle={`${questionsQuery.readMockExamQuestionsByMockExamId.title} 해설 페이지`}
      />
      <Layout>
        <SolutionBlock>
          <h1>{title} 문제/해설</h1>
          <ul>
            {questionsQuery.readMockExamQuestionsByMockExamId.questions.map(
              (el, index) => (
                <li key={index}>
                  <pre className="solution-page-question">
                    {`Q${el.number}. ${el.question}`}
                    {el.question_img &&
                      el.question_img.map((el, index) => (
                        <a
                          className="solution-page-image-link"
                          key={index}
                          href={el.url}
                          target="_blank"
                          rel="noreferrer"
                        >{`이미지${String(index + 1).padStart(2, '0')}`}</a>
                      ))}
                  </pre>
                  <pre className="solution-page-solution">{el.solution}</pre>
                  <div>
                    {el.solution_img &&
                      el.solution_img.map((el, index) => (
                        <a
                          className="solution-page-image-link"
                          key={index}
                          href={el.url}
                          target="_blank"
                          rel="noreferrer"
                        >{`이미지${String(index + 1).padStart(2, '0')}`}</a>
                      ))}
                  </div>
                  <Button
                    type="primary"
                    className="solution-page-report-button"
                    onClick={() => openReportModal(el.question, el.id)}
                  >
                    잘못된 해설신고
                  </Button>
                </li>
              )
            )}
          </ul>
          <ReportModal
            open={reportModalState}
            onChange={(value) => {
              reportValue.current = value;
            }}
            onClose={onToggleReportModalState}
            onCancel={onToggleReportModalState}
            onConfirm={tryReport}
            confirmLabel="신고하기"
            title={`${String(title)}\nQ. ${ellipsisText(
              String(currentQuestion?.title),
              10
            )}`}
          />
        </SolutionBlock>
      </Layout>
    </>
  );
};

export default Solution;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo({}, String(context.req.headers.cookie));
  const examId = context.query.e;
  const isRandom = context.query.r === 'true' ? true : false;
  const request = async () => {
    return await apolloClient.query<ReadMockExamQuestionsByMockExamIdQuery>({
      query: READ_QUESTIONS_BY_ID,
      variables: {
        input: {
          id: Number(String(examId)),
          isRandom,
        },
      },
      fetchPolicy: 'network-only',
    });
  };
  const tryRequest = convertWithErrorHandlingFunc({
    callback: request,
  });
  const res = await tryRequest();
  const questionsQuery = res?.data;
  return addApolloState(apolloClient, { props: { questionsQuery } });
};

const SolutionBlock = styled.div`
  margin-bottom: 50px;
  h1 {
    padding: 0px 20px 20px 20px;
    font-size: 1.5rem;
  }
  .solution-page-question {
    white-space: pre-wrap;
    margin-top: 20px;
    padding: 20px;
    border-radius: 5px;
    background-color: ${palette.gray_100};
  }
  .solution-page-solution {
    white-space: pre-wrap;
    margin: 20px 0 20px 20px;
  }
  .solution-page-image-link {
    margin-left: 20px;
    color: ${palette.antd_blue_01};
  }
  .solution-page-report-button {
    margin-top: 20px;
  }
`;
