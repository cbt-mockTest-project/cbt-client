import { CaretDownOutlined, ClearOutlined } from '@ant-design/icons';
import * as _ from 'lodash';
import Bookmark from '@components/common/bookmark/Bookmark';
import Label from '@components/common/label/Label';
import CommentModal from '@components/common/modal/CommentModal';
import ConfirmModal from '@components/common/modal/ConfirmModal';
import ProgressModal from '@components/common/modal/ProgressModal';
import ReportModal from '@components/common/modal/ReportModal';
import { loginModal, tempAnswerKey } from '@lib/constants';
import { useCreateQuestionFeedBack } from '@lib/graphql/user/hook/useFeedBack';
import { useEditQuestionBookmark } from '@lib/graphql/user/hook/useQuestionBookmark';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { READ_QUESTIONS_BY_ID } from '@lib/graphql/user/query/questionQuery';
import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { LocalStorage } from '@lib/utils/localStorage';
import { responsive } from '@lib/utils/responsive';
import {
  convertWithErrorHandlingFunc,
  ellipsisText,
  extractKeysOfCache,
} from '@lib/utils/utils';
import { useApollo } from '@modules/apollo';
import { coreActions } from '@modules/redux/slices/core';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import palette from '@styles/palette';
import { Button, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRef } from 'react';
import styled, { css } from 'styled-components';
import AchievementCheck from './AchievementCheck';
import MoveQuestion from './MoveQuestion';
import QuestionAndSolutionBox from './QuestionAndSolutionBox';
import SolutionWriteModal from '@components/common/modal/SolutionWriteModal';
import MovePannel from './MovePannel';
import Tooltip from '@components/common/tooltip/Tooltip';
import useIsMobile from '@lib/hooks/useIsMobile';
import { useLazyReadQuestionsByExamId } from '@lib/graphql/user/hook/useExamQuestion';
import ExamSkeleton from './ExamSkeleton';
import useToggle from '@lib/hooks/useToggle';
import QuestionShareModal from '@components/common/modal/QuestionShareModal';
import { ReadMockExamQuestionsByMockExamIdInput } from 'types';
import { makeVar } from '@apollo/client';

export const questionsVar =
  makeVar<ReadMockExamQuestionsByMockExamIdQuery | null>(null);

interface ExamComponentProps {
  isPreview?: boolean;
}

type Question =
  ReadMockExamQuestionsByMockExamIdQuery['readMockExamQuestionsByMockExamId']['questions'][0];

const ExamComponent: React.FC<ExamComponentProps> = ({ isPreview = false }) => {
  const [
    readQuestions,
    { data: questionsQuery, refetch: refetchReadQuestions },
  ] = useLazyReadQuestionsByExamId('cache-and-network');
  const questions = questionsQuery?.readMockExamQuestionsByMockExamId.questions;
  const client = useApollo({}, '');
  const router = useRouter();
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const { data: meQuery } = useMeQuery();
  const onOpenLoginModal = () => dispatch(coreActions.openModal(loginModal));
  const storage = new LocalStorage();
  const isRandomExam = router.query.es ? true : false;
  const questionIndex = Number(router.query.q);
  const reportValue = useRef('');
  const [answerboxVisible, setAnswerboxVisible] = useState(false);
  const [bookmarkState, setBookmarkState] = useState(false);
  const [answerValue, setAnswerValue] = useState('');
  const [questionAndSolution, setQuestionAndSolution] = useState<Question>();
  const [finishModalState, setFinishModalState] = useState(false);
  const [feedBackModalState, setFeedBackModalState] = useState(false);
  const [progressModalState, setProgressModalState] = useState(false);
  const [commentModalState, setCommentModalState] = useState(false);
  const {
    value: questionShareModalState,
    onToggle: onToggleQuestionShareModal,
  } = useToggle();
  const [solutionWriteModalState, setSolutionWriteModalState] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [editBookmark] = useEditQuestionBookmark();
  const [createFeedBack] = useCreateQuestionFeedBack();
  const [readQuestionInput, setReadQuestionInput] =
    useState<ReadMockExamQuestionsByMockExamIdInput>();
  useEffect(() => {
    (async () => {
      if (router.isReady) {
        if (!questionsQuery) {
          const id = Number(router.query.e);
          const answerRecords = storage.get(tempAnswerKey);
          delete answerRecords['랜덤모의고사'];
          storage.set(tempAnswerKey, answerRecords);
          const ids = router.query.es
            ? JSON.parse(String(router.query.es))
            : null;
          const readQuestionInput: ReadMockExamQuestionsByMockExamIdInput = {
            id,
            ids,
            isRandom: router.query.r === 'true' ? true : false,
          };
          setReadQuestionInput(readQuestionInput);
          await readQuestions({
            variables: {
              input: readQuestionInput,
            },
          });
        }
      }
    })();
  }, [router.isReady]);

  useEffect(() => {
    if (questions) {
      const savedAnswer = storage.get(tempAnswerKey)[tempAnswerIndex] || '';
      let currentAnswer = '';
      if (savedAnswer) {
        if (isRandomExam) {
          currentAnswer = savedAnswer[questionIndex] || '';
        } else {
          currentAnswer =
            savedAnswer[String(questions[questionIndex - 1].number)] || '';
        }

        setAnswerValue(currentAnswer);
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
      /**
       * 문제번호가 바뀔 때 마다 데이터를 초기화해준다.
       */

      setProgressModalState(false);
      setFeedBackModalState(false);
      setFinishModalState(false);
      setAnswerboxVisible(false);
      setCommentModalState(false);
      setBookmarkState(
        questions[questionIndex - 1].mockExamQuestionBookmark.length >= 1
      );
      setQuestionAndSolution(questions[questionIndex - 1]);
    }
  }, [router.query.q, questions]);

  if (!questionsQuery) {
    return <ExamSkeleton />;
  }

  const examTitle = questionsQuery.readMockExamQuestionsByMockExamId.title;
  const tempAnswerIndex = String(examTitle);
  const pageSubTitle = `${examTitle}-${questionIndex}번 문제`;
  const onToggleAnswerboxVisible = () => setAnswerboxVisible(!answerboxVisible);
  const onToggleFinishModal = () => {
    setFinishModalState(!finishModalState);
  };
  const onToggleProgressModal = () => {
    if (!meQuery?.me.user) {
      onOpenLoginModal();
      return;
    }
    setProgressModalState(!progressModalState);
  };
  const onToggleFeedBackModal = () => {
    if (!meQuery?.me.user) {
      onOpenLoginModal();
      return;
    }
    setFeedBackModalState(!feedBackModalState);
  };
  const onToggleCommentModal = () => {
    setCommentModalState(!commentModalState);
  };
  const onToggleSolutionWriteModal = () => {
    if (window && window.innerWidth < 500) {
      setSolutionWriteModalState(!solutionWriteModalState);
      window.scrollTo(0, 0);
    }
    return;
  };

  const onFinishConfirmModal = () => {
    if (isPreview) {
      return message.success('미리보기 모드에서는 지원하지 않습니다.');
    }
    questionsVar(questionsQuery);
    setFinishModalState(false);
    router.push({
      pathname: '/exam/result',
      query: {
        title: String(examTitle || ''),
        e: router.query.e,
        es: router.query.es,
      },
    });
  };
  const requestReport = async () => {
    const content = reportValue.current;
    if (content.length <= 4) {
      return message.warn('5글자 이상 입력해주세요.');
    }
    if (questionAndSolution && content) {
      const questionId = questionAndSolution.id;
      const res = await createFeedBack({
        variables: { input: { content, questionId } },
      });
      if (res.data?.createMockExamQuestionFeedback.ok) {
        refetchReadQuestions();
        message.success('요청이 접수되었습니다.');
        setFeedBackModalState(false);
        return;
      }
    }
  };
  const requestEditBookmark = async () => {
    const res = await editBookmark({
      variables: { input: { questionId: Number(questionAndSolution?.id) } },
    });
    if (res.data?.editMockExamQuestionBookmark.ok) {
      const queryResult =
        client.readQuery<ReadMockExamQuestionsByMockExamIdQuery>({
          query: READ_QUESTIONS_BY_ID,
          variables: {
            input: readQuestionInput,
          },
        });
      if (res.data?.editMockExamQuestionBookmark.currentState && queryResult) {
        setBookmarkState(true);
        const newQuestions =
          queryResult.readMockExamQuestionsByMockExamId.questions.map(
            (prevQuestion) => {
              if (prevQuestion.id === questionAndSolution?.id) {
                return {
                  ...prevQuestion,
                  mockExamQuestionBookmark: [
                    {
                      ...prevQuestion.mockExamQuestionBookmark[0],
                      user: _.omit(meQuery?.me.user, 'nickname'),
                    },
                  ],
                };
              }
              return prevQuestion;
            }
          );
        client.writeQuery<ReadMockExamQuestionsByMockExamIdQuery>({
          query: READ_QUESTIONS_BY_ID,
          data: {
            readMockExamQuestionsByMockExamId: {
              ...queryResult.readMockExamQuestionsByMockExamId,
              questions: newQuestions,
            },
          },
        });

        message.success('문제가 저장됐습니다.');
      }
      if (!res.data?.editMockExamQuestionBookmark.currentState && queryResult) {
        setBookmarkState(false);
        const newQuestions =
          queryResult.readMockExamQuestionsByMockExamId.questions.map(
            (prevQuestion) => {
              if (prevQuestion.id === questionAndSolution?.id) {
                return { ...prevQuestion, mockExamQuestionBookmark: [] };
              }
              return prevQuestion;
            }
          );

        client.writeQuery<ReadMockExamQuestionsByMockExamIdQuery>({
          query: READ_QUESTIONS_BY_ID,
          data: {
            readMockExamQuestionsByMockExamId: {
              ...queryResult.readMockExamQuestionsByMockExamId,
              questions: newQuestions,
            },
          },
        });

        message.success('문제 저장이 해제됐습니다.');
      }
      return;
    }
    return message.error(res.data?.editMockExamQuestionBookmark.error);
  };

  const tryEditBookmark = convertWithErrorHandlingFunc({
    callback: requestEditBookmark,
  });

  const tryReport = convertWithErrorHandlingFunc({ callback: requestReport });

  const saveAnswerInStorage = (value: string) => {
    const prevAnswer = storage.get(tempAnswerKey) || {};
    const tempAnswer: { [key: string]: { [key: string]: string } } = prevAnswer;
    let valueObj: { [key: string]: string } = {};
    if (isRandomExam) {
      valueObj[questionIndex] = value;
    } else {
      valueObj[String(questionAndSolution?.number)] = value;
    }

    tempAnswer[tempAnswerIndex] = {
      ...prevAnswer[tempAnswerIndex],
      ...valueObj,
    };
    storage.set(tempAnswerKey, tempAnswer);
  };

  const onChangeAnswer = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const currentValue = e.target.value;
    setAnswerValue(currentValue);
    saveAnswerInStorage(currentValue);
  };

  const onClearAnswer = () => {
    setAnswerValue('');
    saveAnswerInStorage('');
  };
  const onShareAction = () => {
    if (window && (window as any)?.Share) {
      const questionPageLink = `${process.env.NEXT_PUBLIC_CLIENT_URL}/question/${questionAndSolution?.number}`;
      return (window as any).Share.postMessage(questionPageLink);
    }
    onToggleQuestionShareModal();
  };

  return (
    <>
      <ExamContainer answerboxVisible={answerboxVisible}>
        <div className="exam-container-title-wrapper">
          {!isPreview && (
            <div className="exam-container-bookmark-button-wrapper">
              <Tooltip
                position="bottom"
                className="exam-container-bookmark-tooltip"
              >
                <p className="exam-container-bookmark-tooltip-text">
                  {`저장된 문제는 ${
                    isMobile ? '북마크탭' : '활동내역'
                  }에서\n확인할 수 있습니다.`}
                </p>
              </Tooltip>
              <button
                className="exam-container-bookmark-button"
                onClick={tryEditBookmark}
              >
                <Bookmark
                  active={bookmarkState}
                  className="exam-container-bookmark-icon"
                />
                <p className="exam-container-bookmark-text">
                  {bookmarkState ? '저장됨' : '저장하기'}
                </p>
              </button>
              <button
                className="exam-container-share-button"
                onClick={onShareAction}
              >
                공유
              </button>
            </div>
          )}
          <h2 className="exam-container-title">{pageSubTitle}</h2>
          {isRandomExam && (
            <h3 className="exam-container-sub-title">
              {`${questionAndSolution?.mockExam.title}
                ${questionAndSolution?.number}번 문제`}
            </h3>
          )}
        </div>
        <div ref={scrollRef} />
        <QuestionAndSolutionBox
          label="문제"
          content={{
            content: questionAndSolution
              ? `${questionAndSolution.question}`
              : '',
            img: questionAndSolution?.question_img,
            title: String(examTitle || ''),
          }}
        />
        <div className="exam-solution-write-label-wrapper">
          <Label content="답 작성" />
          <button
            className="exam-solution-write-clear-button"
            onClick={onClearAnswer}
          >
            <ClearOutlined />
          </button>
        </div>
        <TextArea
          autoSize={{ minRows: 3, maxRows: 8 }}
          value={answerValue}
          onChange={onChangeAnswer}
          onMouseEnter={onToggleSolutionWriteModal}
          placeholder="답을 확인하기 전에 먼저 답을 작성해 보세요."
        />
        <button
          className="exam-solution-check-wrapper"
          onClick={onToggleAnswerboxVisible}
        >
          <Label content="답 확인" className="exam-solution-check-label" />
          <CaretDownOutlined className="exam-answer-visible-button" />
        </button>
        <QuestionAndSolutionBox
          content={{
            content:
              (questionAndSolution && questionAndSolution.solution) ?? '',
            img: questionAndSolution && questionAndSolution.solution_img,
          }}
          refetch={refetchReadQuestions}
          question={questionAndSolution}
          feedback={true}
          visible={answerboxVisible}
        />

        {!isPreview && (
          <div className="exam-question-menubar-wrapper">
            <AchievementCheck
              questionIndex={questionIndex}
              questionsQuery={questionsQuery}
            />
            <div className="exam-question-menubar-modal-button-wrapper">
              <Button
                type="primary"
                className="exam-question-menubar-report-button"
                onClick={onToggleFeedBackModal}
              >
                답안추가 및 오류신고
              </Button>
              <Button
                type="primary"
                className="exam-question-menubar-check-button"
                onClick={onToggleProgressModal}
              >
                성취도
              </Button>
              <Button
                type="primary"
                className="exam-question-menubar-check-button"
                onClick={onToggleCommentModal}
              >
                {`댓글 ${questionAndSolution?.mockExamQuestionComment.length}`}
              </Button>
            </div>
          </div>
        )}
        <MoveQuestion
          questionIndex={questionIndex}
          questionCount={questionsQuery.readMockExamQuestionsByMockExamId.count}
          setModalState={setFinishModalState}
        />
        <MovePannel
          setModalState={setFinishModalState}
          questionCount={questionsQuery.readMockExamQuestionsByMockExamId.count}
          questionIndex={questionIndex}
        />
      </ExamContainer>
      <ConfirmModal
        open={finishModalState}
        content={'학습을 종료하시겠습니까?'}
        onClose={onToggleFinishModal}
        onCancel={onToggleFinishModal}
        onConfirm={onFinishConfirmModal}
        confirmLabel="종료하기"
      />
      <ReportModal
        open={feedBackModalState}
        onClose={onToggleFeedBackModal}
        onCancel={onToggleFeedBackModal}
        onConfirm={tryReport}
        onChange={(value) => {
          reportValue.current = value;
        }}
        confirmLabel="등록하기"
        title={`${String(examTitle)}  ${questionAndSolution?.number}번 문제`}
        placeholder={`1.암기팁 또는 추가적인 답안을 공유해주세요.\n2.문제 오류가 있다면 공유해주세요.\n3.함께 풍성한 답안을 만들어 봅시다.`}
      />
      <ProgressModal
        open={progressModalState}
        onClose={onToggleProgressModal}
        questionQueryDataProps={questionsQuery}
        readQuestionInput={readQuestionInput}
      />
      <CommentModal
        open={commentModalState}
        onClose={onToggleCommentModal}
        title={`${questionAndSolution?.mockExam.title}
        ${questionAndSolution?.number}번 문제`}
        questionId={questionAndSolution ? questionAndSolution.id : 0}
      />
      <QuestionShareModal
        onClose={onToggleQuestionShareModal}
        open={questionShareModalState}
        questionId={questionAndSolution?.id || 0}
        title={`${String(examTitle)}  ${questionAndSolution?.number}번 문제`}
        shareTitle={`${String(examTitle)}  ${
          questionAndSolution?.number
        }번 문제`}
        shareDescription={ellipsisText(questionAndSolution?.question || '', 50)}
      />
      <SolutionWriteModal
        open={solutionWriteModalState}
        onClose={onToggleSolutionWriteModal}
        questionAndSolutionContent={{
          content: questionAndSolution ? `${questionAndSolution.question}` : '',
          img: questionAndSolution?.question_img,
          title: String(examTitle || ''),
        }}
        pageSubTitle={pageSubTitle}
        textAreaOption={{
          autoSize: { minRows: 3, maxRows: 8 },
          value: answerValue,
          onChange: onChangeAnswer,
          placeholder: '답을 확인하기 전에 먼저 답을 작성해 보세요.',
        }}
        onClearAnswer={onClearAnswer}
      />
    </>
  );
};

export default ExamComponent;

interface ExamContainerProps {
  answerboxVisible: boolean;
}

const ExamContainer = styled.div<ExamContainerProps>`
  display: flex;
  flex-direction: column;
  .exam-container-title-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    gap: 5px;
  }
  .exam-container-title {
    font-size: 1.3rem;
  }
  .exam-container-sub-title {
    font-size: 0.9rem;
    color: ${palette.gray_700};
  }
  .exam-container-bookmark-button-wrapper {
    display: flex;
    gap: 15px;
  }
  .exam-container-bookmark-button,
  .exam-container-share-button {
    display: flex;
    gap: 5px;
    width: 110px;
    height: 35px;
    border: 1px solid ${palette.gray_100};
    border-radius: 5px;
    padding: 0 10px;
    background-color: ${palette.gray_100};
    justify-content: center;
    align-items: center;
  }
  .exam-container-bookmark-tooltip {
    top: 4px;
  }
  .exam-container-bookmark-tooltip-text {
    color: white;
    font-size: 0.8rem;
    width: 150px;
  }
  .exam-container-bookmark-icon {
    flex: 1;
    height: 25px;
  }
  .exam-container-bookmark-text {
    flex: 2;
    font-size: 0.9rem;
    text-align: left;
  }

  .exam-answer-visible-button {
    transition: transform 0.3s linear;
    ${(props) =>
      props.answerboxVisible &&
      css`
        transform: rotate(-180deg);
      `}
  }

  .exam-question-menubar-wrapper {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
    align-items: center;
  }
  .exam-question-menubar {
    display: flex;
    align-items: center;
    font-weight: 600;
    color: ${palette.gray_700};
  }

  .exam-solution-check-wrapper {
    display: flex;
    align-items: center;
    margin: 15px 0 2px 0;
  }
  .exam-solution-check-label {
    margin: 0;
  }
  .exam-question-menubar-modal-button-wrapper {
    font-size: 0.8rem;
    button {
      + button {
        margin-left: 5px;
      }
    }
  }
  .exam-question-solution-label-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .exam-solution-write-label-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .exam-solution-write-clear-button {
    top: 5px;
    height: 18px;
    width: 18px;
    margin-top: 4px;
    svg {
      transition: all 0.3s;
      width: 18px;
      height: 18px;
    }
    :hover {
      svg {
        color: ${palette.antd_blue_01};
      }
    }
  }

  pre {
    white-space: pre-wrap;
  }
  @media (max-width: ${responsive.medium}) {
    padding: 20px;
    .exam-question-menubar-wrapper {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: flex-start;
    }
  }
  @media (max-width: ${responsive.small}) {
    .exam-container-title {
      font-size: 1rem;
    }
  }
`;
