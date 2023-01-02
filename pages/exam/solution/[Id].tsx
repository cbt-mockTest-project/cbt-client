import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Layout from '@components/common/layout/Layout';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { READ_QUESTIONS_BY_ID } from '@lib/graphql/user/query/questionQuery';
import {
  convertExamTitle,
  convertWithErrorHandlingFunc,
  ellipsisText,
} from '@lib/utils/utils';
import palette from '@styles/palette';
import { Button, Image, message } from 'antd';
import ReportModal from '@components/common/modal/ReportModal';
import { useCreateQuestionFeedBack } from '@lib/graphql/user/hook/useFeedBack';
import WithHead from '@components/common/head/WithHead';
import { READ_ALL_MOCK_EXAM } from '@lib/graphql/user/query/examQuery';
import { ReadAllMockExamQuery } from '@lib/graphql/user/query/examQuery.generated';
import { ReadMockExamQuestionsByMockExamIdInput } from 'types';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { coreActions } from '@modules/redux/slices/core';
import { loginModal } from '@lib/constants';
import { responsive } from '@lib/utils/responsive';

interface SolutionProps {
  questionsQuery: ReadMockExamQuestionsByMockExamIdQuery;
}

interface QuestionOption {
  title: string;
  id: number;
}

const Solution: NextPage<SolutionProps> = ({ questionsQuery }) => {
  const title = questionsQuery?.readMockExamQuestionsByMockExamId.title;
  const dispatch = useAppDispatch();
  const [reportModalState, setReportModalState] = useState(false);
  const { data: meQuery } = useMeQuery();
  const [createFeedBack] = useCreateQuestionFeedBack();
  const reportValue = useRef('');
  const [currentQuestion, setCurrentQuestion] = useState<QuestionOption | null>(
    null
  );
  const onToggleReportModalState = () => setReportModalState(!reportModalState);
  const openReportModal = (title: string, id: number) => {
    if (!meQuery?.me.ok) {
      return dispatch(coreActions.openModal(loginModal));
    }
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
        title={`${convertExamTitle(title)} 해설 | 모두CBT`}
        pageHeadingTitle={`${convertExamTitle(title)} 해설 페이지`}
      />
      <Layout>
        <SolutionBlock>
          <h1>{convertExamTitle(title)} 문제/해설</h1>
          <ul>
            {questionsQuery.readMockExamQuestionsByMockExamId.questions.map(
              (el, index) => (
                <li key={index}>
                  <div className="solution-page-question-wrapper">
                    <div className="solution-page-question-pre-wrapper">
                      <pre className="solution-page-question">
                        {`Q${el.number}. ${el.question}`}
                        {el.question_img && el.question_img.length >= 1 && (
                          <a
                            className="solution-page-image-link"
                            key={index}
                            href={el.question_img[0].url}
                            target="_blank"
                            rel="noreferrer"
                          >{`이미지${String(index + 1).padStart(2, '0')}`}</a>
                        )}
                      </pre>
                    </div>
                    {el.question_img && el.question_img.length >= 1 && (
                      <div className="solution-page-question-image-wrapper">
                        <Image
                          src={el.question_img[0].url}
                          alt="question_image"
                          className="solution-page-question-image"
                        />
                      </div>
                    )}
                  </div>
                  <div className="solution-page-question-wrapper">
                    <div className="solution-page-solution-pre-wrapper">
                      <pre className="solution-page-question">
                        <b>[solution]</b>
                        <br />
                        <br />
                        {`${el.solution}`}
                        {el.solution_img && el.solution_img.length >= 1 && (
                          <a
                            className="solution-page-image-link"
                            key={index}
                            href={el.solution_img[0].url}
                            target="_blank"
                            rel="noreferrer"
                          >{`이미지${String(index + 1).padStart(2, '0')}`}</a>
                        )}
                      </pre>
                    </div>
                    {el.solution_img && el.solution_img.length >= 1 && (
                      <div className="solution-page-question-image-wrapper">
                        <Image
                          src={el.solution_img[0].url}
                          alt="question_image"
                          className="solution-page-question-image"
                        />
                      </div>
                    )}
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

export const getStaticPaths: GetStaticPaths = async (context) => {
  const apolloClient = initializeApollo({}, '');
  let paths: { params: { Id: string } }[] = [];
  try {
    const res = await apolloClient.query<ReadAllMockExamQuery>({
      query: READ_ALL_MOCK_EXAM,
      variables: {
        input: {
          category: '',
          query: '',
          all: true,
        },
      },
    });
    if (res.data.readAllMockExam.mockExams) {
      paths = res.data.readAllMockExam.mockExams.map((el) => ({
        params: { Id: String(el.id) },
      }));
    }
    return { paths, fallback: false };
  } catch (err) {
    return {
      paths,
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params?.Id) {
    return {
      notFound: true,
    };
  }
  const apolloClient = initializeApollo({}, '');
  const examId = context.params?.Id;
  const questionsQueryInput: ReadMockExamQuestionsByMockExamIdInput = {
    id: Number(String(examId)),
    isRandom: false,
  };
  const request = async () => {
    return await apolloClient.query<ReadMockExamQuestionsByMockExamIdQuery>({
      query: READ_QUESTIONS_BY_ID,
      variables: {
        input: questionsQueryInput,
      },
      fetchPolicy: 'network-only',
    });
  };
  const tryRequest = convertWithErrorHandlingFunc({
    callback: request,
  });
  const res = await tryRequest();
  const questionsQuery = res?.data;
  return addApolloState(apolloClient, {
    props: { questionsQuery },
    revalidate: 86400,
  });
};

const SolutionBlock = styled.div`
  margin-bottom: 50px;
  h1 {
    padding: 0px 20px 20px 20px;
    font-size: 1.5rem;
  }

  .solution-page-solution {
    white-space: pre-wrap;
    margin: 20px 0 20px 20px;
  }

  .solution-page-report-button {
    margin-top: 20px;
  }

  .solution-page-image-link {
    display: none;
    margin-top: 20px;
    color: ${palette.antd_blue_01};
  }
  .solution-page-question {
    white-space: pre-wrap;
    b {
      font-size: 1.1.rem;
      font-weight: bold;
    }
  }
  .solution-page-question-pre-wrapper {
    background-color: ${palette.gray_100};
    border-radius: 5px;
    padding: 20px;
    flex: 4;
  }
  .solution-page-solution-pre-wrapper {
    border-radius: 5px;
    border: 1px solid ${palette.gray_300};
    padding: 20px;
    flex: 4;
  }
  .solution-page-question-image-wrapper {
    flex: 6;
    text-align: center;
    border: 1px solid ${palette.gray_300};
  }
  .solution-page-question-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    max-height: 220px;
  }

  .solution-page-question-wrapper {
    display: flex;
    margin-top: 30px;
    gap: 20px;
  }

  @media (max-width: ${responsive.medium}) {
    .solution-page-image-link {
      display: block;
    }
    .question-image-wrapper,
    .solution-page-question-image-wrapper {
      display: none;
    }
  }
`;
