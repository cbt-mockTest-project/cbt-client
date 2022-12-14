import { CaretDownOutlined } from '@ant-design/icons';
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
import { convertWithErrorHandlingFunc, ellipsisText } from '@lib/utils/utils';
import { useApollo } from '@modules/apollo';
import { coreActions } from '@modules/redux/slices/core';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import palette from '@styles/palette';
import { Button, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { QuestionType } from 'customTypes';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRef } from 'react';
import styled, { css } from 'styled-components';
import AchievementCheck from './AchievementCheck';
import MoveQuestion from './MoveQuestion';
import QuestionAndSolutionBox from './QuestionAndSolutionBox';

interface ExamComponentProps {
  questionsQuery: ReadMockExamQuestionsByMockExamIdQuery;
}

const ExamComponent: React.FC<ExamComponentProps> = ({ questionsQuery }) => {
  const {
    readMockExamQuestionsByMockExamId: { questions },
  } = questionsQuery;
  const client = useApollo({}, '');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: meQuery } = useMeQuery();
  const onOpenLoginModal = () => dispatch(coreActions.openModal(loginModal));
  const storage = new LocalStorage();
  const examTitle = questionsQuery.readMockExamQuestionsByMockExamId.title;
  const questionIndex = Number(router.query.q);
  const tempAnswerIndex = String(examTitle) + questionIndex;
  const reportValue = useRef('');
  const [answerboxVisible, setAnswerboxVisible] = useState(false);
  const [bookmarkState, setBookmarkState] = useState(false);
  const [answerValue, setAnswerValue] = useState('');
  const [questionAndSolution, setQuestionAndSolution] =
    useState<QuestionType | null>(null);
  const [finishModalState, setFinishModalState] = useState(false);
  const [feedBackModalState, setFeedBackModalState] = useState(false);
  const [progressModalState, setProgressModalState] = useState(false);
  const [commentModalState, setCommentModalState] = useState(false);
  const [editBookmark] = useEditQuestionBookmark();
  const [createFeedBack] = useCreateQuestionFeedBack();

  useEffect(() => {
    const currentAnswer = storage.get(tempAnswerKey)[tempAnswerIndex] || '';
    /**
     * ??????????????? ?????? ??? ?????? ???????????? ??????????????????.
     */
    setAnswerValue(currentAnswer);
    setProgressModalState(false);
    setFeedBackModalState(false);
    setFinishModalState(false);
    setAnswerboxVisible(false);
    setCommentModalState(false);
    setBookmarkState(
      questions[questionIndex - 1].mockExamQuestionBookmark.length >= 1
    );
    setQuestionAndSolution({
      question: questions[questionIndex - 1].question,
      number: questions[questionIndex - 1].number,
      question_img: questions[questionIndex - 1].question_img,
      solution: questions[questionIndex - 1].solution,
      solution_img: questions[questionIndex - 1].solution_img,
      id: questions[questionIndex - 1].id,
      state: questions[questionIndex - 1].state,
      mockExamQuestionBookmark:
        questions[questionIndex - 1].mockExamQuestionBookmark,
    });
  }, [router.query.q]);

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

  const onFinishConfirmModal = () => {
    storage.remove(tempAnswerKey);
    setFinishModalState(false);
    router.push({
      pathname: '/exam/result',
      query: { title: String(examTitle || ''), e: router.query.e },
    });
  };
  const requestReport = async () => {
    const content = reportValue.current;
    if (content.length <= 4) {
      return message.warn('5?????? ?????? ??????????????????.');
    }
    if (questionAndSolution && content) {
      const questionId = questionAndSolution.id;
      const res = await createFeedBack({
        variables: { input: { content, questionId } },
      });
      if (res.data?.createMockExamQuestionFeedback.ok) {
        message.success('????????? ?????????????????????.');
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
            input: {
              id: Number(router.query.e),
              isRandom: router.query.r === 'true' ? true : false,
            },
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

        message.success('????????? ??????????????????.');
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

        message.success('?????? ????????? ??????????????????.');
      }
      return;
    }
    return message.error(res.data?.editMockExamQuestionBookmark.error);
  };

  const tryEditBookmark = convertWithErrorHandlingFunc({
    callback: requestEditBookmark,
  });

  const tryReport = convertWithErrorHandlingFunc({ callback: requestReport });

  const onChangeAnswer = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const currentValue = e.target.value;
    setAnswerValue(currentValue);
    const prevAnswer = storage.get(tempAnswerKey) || {};
    const tempAnswer: { [key: string]: string } = prevAnswer;
    tempAnswer[tempAnswerIndex] = currentValue;
    storage.set(tempAnswerKey, tempAnswer);
  };

  return (
    <>
      <ExamContainer answerboxVisible={answerboxVisible}>
        <h2 className="exam-container-title">
          {examTitle}-{questionIndex}??? ??????{' '}
          <Bookmark
            active={bookmarkState}
            onClick={tryEditBookmark}
            className="exam-container-bookmark"
          />
        </h2>
        <QuestionAndSolutionBox
          label="??????"
          content={{
            content: questionAndSolution
              ? `${questionAndSolution.question}`
              : '',
            img: questionAndSolution?.question_img,
            title: String(examTitle || ''),
          }}
        />
        <Label content="??? ??????" />
        <TextArea
          autoSize={{ minRows: 3, maxRows: 8 }}
          value={answerValue}
          onChange={onChangeAnswer}
          placeholder="?????? ???????????? ?????? ?????? ?????? ????????? ?????????."
        />
        <button
          className="exam-solution-check-wrapper"
          onClick={onToggleAnswerboxVisible}
        >
          <Label content="??? ??????" className="exam-solution-check-label" />
          <CaretDownOutlined className="exam-answer-visible-button" />
        </button>
        <QuestionAndSolutionBox
          content={{
            content: questionAndSolution ? questionAndSolution.solution : '',
            img: questionAndSolution && questionAndSolution.solution_img,
          }}
          visible={answerboxVisible}
        />

        <div className="exam-question-menubar-wrapper">
          <div className="exam-question-menubar-modal-button-wrapper">
            <Button
              type="primary"
              className="exam-question-menubar-report-button"
              onClick={onToggleFeedBackModal}
            >
              ???????????? ??????
            </Button>
            <Button
              type="primary"
              className="exam-question-menubar-check-button"
              onClick={onToggleProgressModal}
            >
              ?????? ??????
            </Button>
            <Button
              type="primary"
              className="exam-question-menubar-check-button"
              onClick={onToggleCommentModal}
            >
              ??????
            </Button>
          </div>
          <div className="exam-question-menubar" id="exam-question-menubar">
            <AchievementCheck
              questionIndex={questionIndex}
              questionsQuery={questionsQuery}
            />
            <MoveQuestion
              questionIndex={questionIndex}
              questionCount={
                questionsQuery.readMockExamQuestionsByMockExamId.count
              }
              setModalState={setFinishModalState}
            />
          </div>
        </div>
      </ExamContainer>
      <ConfirmModal
        open={finishModalState}
        content={'????????? ???????????????.\n????????? ?????????????????????????'}
        onClose={onToggleFinishModal}
        onCancel={onToggleFinishModal}
        onConfirm={onFinishConfirmModal}
        confirmLabel="????????????"
      />
      <ReportModal
        open={feedBackModalState}
        onClose={onToggleFeedBackModal}
        onCancel={onToggleFeedBackModal}
        onConfirm={tryReport}
        onChange={(value) => {
          reportValue.current = value;
        }}
        confirmLabel="????????????"
        title={`${String(examTitle)}\nQ. ${ellipsisText(
          String(questionAndSolution?.question),
          10
        )}`}
      />
      <ProgressModal
        open={progressModalState}
        onClose={onToggleProgressModal}
      />
      <CommentModal
        open={commentModalState}
        onClose={onToggleCommentModal}
        title={`${String(examTitle)}  ${questionAndSolution?.number}??? ??????`}
        questionId={questionAndSolution ? questionAndSolution.id : 0}
      />
    </>
  );
};

export default ExamComponent;

const ExamContainer = styled.div<{ answerboxVisible: boolean }>`
  display: flex;
  flex-direction: column;
  .exam-container-title {
    font-size: 1.3rem;
    margin-bottom: 20px;
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

  .exam-question-move-button-label {
    margin-left: 40px;
    margin-right: 5px;
  }
  .exam-question-move-button {
    position: relative;
    top: 2px;
    transition: all 0.2s ease-in;
    svg {
      width: 25px;
      height: 25px;
    }
    :hover {
      color: ${palette.antd_blue_02};
    }
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
    button {
      + button {
        margin-left: 15px;
      }
    }
  }
  .exam-question-solution-label-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .exam-container-bookmark {
    position: relative;
    top: 3px;
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
    .exam-container-title {
      font-size: 1rem;
    }
    .exam-container-bookmark {
      top: 5px;
    }
  }
`;
