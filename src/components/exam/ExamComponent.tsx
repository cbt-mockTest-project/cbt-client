import { CaretDownOutlined, ClearOutlined } from '@ant-design/icons';
import { makeVar } from '@apollo/client';
import Bookmark from '@components/common/bookmark/Bookmark';
import Label from '@components/common/label/Label';
import CommentModal from '@components/common/modal/CommentModal';
import ConfirmModal from '@components/common/modal/ConfirmModal';
import ProgressModal from '@components/common/modal/ProgressModal';
import QuestionShareModal from '@components/common/modal/QuestionShareModal';
import ReportModal from '@components/common/modal/ReportModal';
import SolutionWriteModal from '@components/common/modal/SolutionWriteModal';
import { loginModal, tempAnswerKey } from '@lib/constants';
import { useCreateExamHistory } from '@lib/graphql/user/hook/useExamHistory';
import { useLazyReadQuestionsByExamId } from '@lib/graphql/user/hook/useExamQuestion';
import { useCreateQuestionFeedBack } from '@lib/graphql/user/hook/useFeedBack';
import { useEditQuestionBookmark } from '@lib/graphql/user/hook/useQuestionBookmark';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/user/query/questionQuery.generated';
import useToggle from '@lib/hooks/useToggle';
import { LocalStorage } from '@lib/utils/localStorage';
import { responsive } from '@lib/utils/responsive';
import { ellipsisText, handleError } from '@lib/utils/utils';
import { coreActions } from '@modules/redux/slices/core';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import palette from '@styles/palette';
import { Button, Input, message } from 'antd';
import * as _ from 'lodash';
import { useRouter } from 'next/router';
import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
import {
  MockExamQuestionFeedback,
  QuestionFeedbackType,
  ReadMockExamQuestionsByMockExamIdInput,
} from 'types';
import AchievementCheck from './AchievementCheck';
import ExamSkeleton from './ExamSkeleton';
import MovePannel from './MovePannel';
import MoveQuestion from './MoveQuestion';
import QuestionAndSolutionBox from './QuestionAndSolutionBox';
import { examActions } from '@modules/redux/slices/exam';
import {
  직8딴_건설안전기사_리스트,
  직8딴_대기환경기사_리스트,
  직8딴_산업안전기사_리스트,
  직8딴_위험물산업기사_리스트,
} from '@lib/constants/exam';
import Dimmed from '@components/common/dimmed/Dimmed';
import Link from 'next/link';

export const questionsVar =
  makeVar<ReadMockExamQuestionsByMockExamIdQuery | null>(null);

interface ExamComponentProps {
  isPreview?: boolean;
  coAuthor?: string;
}

const ExamComponent: React.FC<ExamComponentProps> = ({ isPreview = false }) => {
  const [readQuestions, { data: questionsQuery }] =
    useLazyReadQuestionsByExamId('cache-and-network');

  const questionList = useAppSelector((state) => state.exam.questionList);
  const currentQuestion = useAppSelector((state) => state.exam.currentQuestion);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storage = new LocalStorage();
  const isRandomExam = router.query.es ? true : false;
  const questionIndex = Number(router.query.q);
  const examTitle = questionsQuery?.readMockExamQuestionsByMockExamId.title;
  const tempAnswerIndex = String(examTitle);
  const pageSubTitle = `${examTitle}-${questionIndex}번 문제`;
  const [answerboxVisible, setAnswerboxVisible] = useState(false);
  const [bookmarkState, setBookmarkState] = useState(false);
  const [answerValue, setAnswerValue] = useState('');

  const [finishModalState, setFinishModalState] = useState(false);
  const [feedBackModalState, setFeedBackModalState] = useState(false);
  const [progressModalState, setProgressModalState] = useState(false);
  const [commentModalState, setCommentModalState] = useState(false);
  const [solutionWriteModalState, setSolutionWriteModalState] = useState(false);

  const [readQuestionInput, setReadQuestionInput] =
    useState<ReadMockExamQuestionsByMockExamIdInput>();

  const scrollRef = useRef<HTMLDivElement>(null);
  const reportValue = useRef({
    content: '',
    type: QuestionFeedbackType.Public,
  });
  const examId = Number(router.query.e);
  const examIds = router.query.es ? JSON.parse(String(router.query.es)) : null;

  const isPremium = questionsQuery?.readMockExamQuestionsByMockExamId.isPremium;
  const [editBookmark] = useEditQuestionBookmark();
  const [createFeedBack] = useCreateQuestionFeedBack();
  const { data: meQuery } = useMeQuery();
  const [createExamHistory] = useCreateExamHistory();

  const examPermissionCheck = (checkExamList: number[], roleId: number) => {
    if (
      checkExamList.includes(examId) ||
      (Array.isArray(examIds) &&
        examIds.some((id: number) => checkExamList.includes(id)))
    ) {
      if (
        meQuery?.me.user &&
        (!meQuery.me.user.userRoles.find((role) => role.role.id === roleId) ||
          meQuery.me.user.userRoles.length === 0)
      ) {
        return false;
      }
      if (meQuery && !meQuery.me.user) {
        // 비로그인시
        return false;
      }
    }
    return true;
  };

  const 직8딴_산업안전기사_권한체크 = useMemo(
    () => examPermissionCheck(직8딴_산업안전기사_리스트, 4),
    [examId, examIds, meQuery]
  );

  const 직8딴_건설안전기사_권한체크 = useMemo(
    () => examPermissionCheck(직8딴_건설안전기사_리스트, 5),
    [examId, examIds, meQuery]
  );

  const 직8딴_위험물산업기사_권한체크 = useMemo(
    () => examPermissionCheck(직8딴_위험물산업기사_리스트, 6),
    [examId, examIds, meQuery]
  );

  const 직8딴_대기환경기사_권한체크 = useMemo(
    () => examPermissionCheck(직8딴_대기환경기사_리스트, 7),
    [examId, examIds, meQuery]
  );

  const unAuthorizedExam = useMemo(
    () =>
      !직8딴_산업안전기사_권한체크 ||
      !직8딴_건설안전기사_권한체크 ||
      !직8딴_위험물산업기사_권한체크 ||
      !직8딴_대기환경기사_권한체크,
    [
      직8딴_산업안전기사_권한체크,
      직8딴_건설안전기사_권한체크,
      직8딴_위험물산업기사_권한체크,
      직8딴_대기환경기사_권한체크,
    ]
  );

  const {
    value: questionShareModalState,
    onToggle: onToggleQuestionShareModal,
  } = useToggle();

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        if (!questionsQuery) {
          const id = Number(router.query.e);
          const answerRecords = storage.get(tempAnswerKey);
          delete answerRecords['랜덤모의고사'];
          storage.set(tempAnswerKey, answerRecords);
          const l = router.query.l ? Number(router.query.l) : null;
          const s = router.query.s ? JSON.parse(String(router.query.s)) : null;
          const ids = router.query.es
            ? JSON.parse(String(router.query.es))
            : null;
          const readQuestionInput: ReadMockExamQuestionsByMockExamIdInput = {
            id,
            ids,
            isRandom: router.query.r === 'true' ? true : false,
            limit: l,
            states: s && s.length > 0 ? s : null,
          };
          setReadQuestionInput(readQuestionInput);
          const res = await readQuestions({
            variables: {
              input: readQuestionInput,
            },
          });
          dispatch(
            examActions.setQuestionList(
              res.data?.readMockExamQuestionsByMockExamId.questions || []
            )
          );
          if (!res.data?.readMockExamQuestionsByMockExamId.ok) {
            return message.error(
              res.data?.readMockExamQuestionsByMockExamId.error
            );
          }
        }
      }
    })();
  }, [router.isReady]);

  useEffect(() => {
    try {
      if (questionList) {
        const savedAnswer = storage.get(tempAnswerKey)[tempAnswerIndex] || '';
        let currentAnswer = '';
        if (savedAnswer) {
          if (isRandomExam) {
            currentAnswer = savedAnswer[questionIndex] || '';
          } else {
            currentAnswer =
              savedAnswer[String(questionList[questionIndex - 1].number)] || '';
          }

          setAnswerValue(currentAnswer);
        }

        setBookmarkState(
          questionList[questionIndex - 1].mockExamQuestionBookmark.length >= 1
        );
        dispatch(
          examActions.setCurrentQuestion({
            question: questionList[questionIndex - 1],
          })
        );
      }
    } catch {
      router.push({
        pathname: '/exam',
        query: {
          ...router.query,
          q: questionList?.length || 1,
        },
      });
    }
  }, [router.query.q, questionList]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setProgressModalState(false);
    setFeedBackModalState(false);
    setFinishModalState(false);
    setAnswerboxVisible(false);
  }, [router.query.q]);

  if (!questionsQuery) {
    return <ExamSkeleton />;
  }

  const openLonginModal = () => dispatch(coreActions.openModal(loginModal));

  const onToggleAnswerboxVisible = () => setAnswerboxVisible(!answerboxVisible);

  const onToggleFinishModal = () => setFinishModalState(!finishModalState);

  const onToggleProgressModal = () => {
    if (!meQuery?.me.user) {
      openLonginModal();
      return;
    }
    setProgressModalState(!progressModalState);
  };

  const onToggleFeedBackModal = () => {
    if (!meQuery?.me.user) {
      openLonginModal();
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
    if (!meQuery?.me.user) {
      setFinishModalState(false);
      return openLonginModal();
    }
    // 랜덤모의고사가 아니고, 로그인 상태일때
    if (!isRandomExam && meQuery?.me.user) {
      createExamHistory({
        variables: {
          input: {
            examId: Number(router.query.e),
          },
        },
      });
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
    try {
      const content = reportValue.current.content;
      const type = reportValue.current.type;
      if (content.length <= 4) {
        return message.warning('5글자 이상 입력해주세요.');
      }
      if (currentQuestion && content) {
        const questionId = currentQuestion.id;
        const res = await createFeedBack({
          variables: { input: { type, content, questionId } },
        });
        if (res.data?.createMockExamQuestionFeedback.ok) {
          const newCurrentQuestion = {
            ...currentQuestion,
            mockExamQuestionFeedback: [
              res.data.createMockExamQuestionFeedback
                .feedback as MockExamQuestionFeedback,
              ...currentQuestion.mockExamQuestionFeedback,
            ],
          };
          dispatch(
            examActions.setCurrentQuestion({
              question: newCurrentQuestion,
              updateList: true,
            })
          );
          message.success('추가되었습니다.');
          setFeedBackModalState(false);
          return;
        }
      }
    } catch (e) {
      handleError(e);
    }
  };

  const requestEditBookmark = async () => {
    const prevBookmarkState = bookmarkState;
    const rollbackBookmarkState = () => {
      if (prevBookmarkState) {
        setBookmarkState(true);
        message.error('문제 저장에 실패했습니다.');
      }
      if (!prevBookmarkState) {
        setBookmarkState(false);
        message.error('문제 저장 해제에 실패했습니다.');
      }
    };
    try {
      if (!meQuery?.me.user) {
        openLonginModal();
        return;
      }
      if (!currentQuestion) return;
      if (bookmarkState) {
        setBookmarkState(false);
      }
      if (!bookmarkState) {
        setBookmarkState(true);
      }
      const res = await editBookmark({
        variables: { input: { questionId: Number(currentQuestion.id) } },
      });
      if (res.data?.editMockExamQuestionBookmark.ok) {
        if (res.data?.editMockExamQuestionBookmark.currentState) {
          const newQuestions = questionList.map((prevQuestion) => {
            if (prevQuestion.id === currentQuestion.id) {
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
          });
          dispatch(examActions.setQuestionList(newQuestions));
        }
        if (!res.data?.editMockExamQuestionBookmark.currentState) {
          const newQuestions = questionList.map((prevQuestion) => {
            if (prevQuestion.id === currentQuestion.id) {
              return { ...prevQuestion, mockExamQuestionBookmark: [] };
            }
            return prevQuestion;
          });
          dispatch(examActions.setQuestionList(newQuestions));
        }
        return;
      }
      rollbackBookmarkState();
      return message.error(res.data?.editMockExamQuestionBookmark.error);
    } catch (e) {
      rollbackBookmarkState();
      handleError(e);
    }
  };

  const saveAnswerInStorage = (value: string) => {
    const prevAnswer = storage.get(tempAnswerKey) || {};
    const tempAnswer: { [key: string]: { [key: string]: string } } = prevAnswer;
    let valueObj: { [key: string]: string } = {};
    if (isRandomExam) {
      valueObj[questionIndex] = value;
    } else {
      valueObj[String(currentQuestion?.number)] = value;
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
    if (window && (window as any)?.Share && currentQuestion) {
      const questionPageLink = `${process.env.NEXT_PUBLIC_CLIENT_URL}/question/${currentQuestion.number}`;
      return (window as any).Share.postMessage(questionPageLink);
    }
    onToggleQuestionShareModal();
  };

  return (
    <>
      <ExamContainer
        answerboxVisible={answerboxVisible}
        isPremium={isPremium || false}
      >
        <div className="exam-container-title-wrapper">
          {!isPreview && (
            <div className="exam-container-bookmark-button-wrapper">
              <button
                className="exam-container-bookmark-button"
                onClick={requestEditBookmark}
              >
                <Bookmark
                  active={bookmarkState}
                  className="exam-container-bookmark-icon"
                />
                <p className="exam-container-bookmark-text">
                  {bookmarkState ? '저장됨' : '저장'}
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
          <h2 className="exam-container-title">
            {pageSubTitle}
            {/* {!isRandomExam && (
              <p className="exam-container-author-name">
                {`제작자:${questionsQuery.readMockExamQuestionsByMockExamId.author}`}
              </p>
            )} */}
          </h2>
          {isRandomExam && currentQuestion?.mockExam && (
            <h3 className="exam-container-sub-title">
              {`${currentQuestion.mockExam.title}
                ${currentQuestion.number}번 문제`}
            </h3>
          )}
        </div>
        {currentQuestion?.label && (
          <p className="exam-container-label">
            기출 {currentQuestion?.label}회
          </p>
        )}
        <div ref={scrollRef} />
        <QuestionAndSolutionBox
          className="exam-question-and-video-content"
          content={{
            content: currentQuestion ? `${currentQuestion.question}` : '',
            img: currentQuestion?.question_img,
            title: String(examTitle || ''),
          }}
        />

        <div className="exam-solution-write-label-wrapper">
          <span>답 작성</span>
          <button
            className="exam-solution-write-clear-button"
            onClick={onClearAnswer}
          >
            <ClearOutlined />
          </button>
        </div>
        <Input.TextArea
          autoSize={{ minRows: 3, maxRows: 8 }}
          value={answerValue}
          onChange={onChangeAnswer}
          onMouseEnter={onToggleSolutionWriteModal}
          placeholder="답을 확인하기 전에 먼저 답을 작성해 보세요."
        />
        <Button
          className="exam-solution-check-wrapper"
          type="primary"
          onClick={onToggleAnswerboxVisible}
        >
          <Label content="답 확인" className="exam-solution-check-label" />
          <CaretDownOutlined className="exam-answer-visible-button" />
        </Button>
        <QuestionAndSolutionBox
          content={{
            content: (currentQuestion && currentQuestion.solution) ?? '',
            img: currentQuestion && currentQuestion.solution_img,
          }}
          question={currentQuestion}
          feedback={true}
          visible={answerboxVisible}
        />

        {!isPreview && (
          <div className="exam-question-menubar-wrapper">
            <AchievementCheck />
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
                {`댓글 ${currentQuestion?.mockExamQuestionComment.length || 0}`}
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
      {finishModalState && (
        <ConfirmModal
          open={finishModalState}
          content={'학습을 종료하시겠습니까?'}
          onClose={onToggleFinishModal}
          onCancel={onToggleFinishModal}
          onConfirm={onFinishConfirmModal}
          confirmLabel="종료하기"
        />
      )}
      {feedBackModalState && (
        <ReportModal
          open={feedBackModalState}
          onClose={onToggleFeedBackModal}
          onCancel={onToggleFeedBackModal}
          onConfirm={requestReport}
          onChangeContent={(value) => {
            reportValue.current.content = value;
          }}
          onChangeType={(value) => {
            reportValue.current.type = value;
          }}
          confirmLabel="등록하기"
          title={`${
            isRandomExam ? currentQuestion?.mockExam?.title : examTitle
          }  ${currentQuestion?.number}번 문제`}
          placeholder={`1.암기팁 또는 추가적인 답안을 공유해주세요.\n2.문제 오류가 있다면 공유해주세요.\n3.함께 풍성한 답안을 만들어 봅시다.`}
        />
      )}
      {progressModalState && (
        <ProgressModal
          open={progressModalState}
          onClose={onToggleProgressModal}
          questionList={questionList}
          readQuestionInput={readQuestionInput}
        />
      )}
      {commentModalState && (
        <CommentModal
          open={commentModalState}
          onClose={onToggleCommentModal}
          title={`${isRandomExam ? currentQuestion?.mockExam?.title : examTitle}
        ${currentQuestion?.number}번 문제`}
          questionId={currentQuestion ? currentQuestion.id : 0}
        />
      )}
      {questionShareModalState && (
        <QuestionShareModal
          onClose={onToggleQuestionShareModal}
          open={questionShareModalState}
          questionId={currentQuestion?.id || 0}
          title={`${String(examTitle)}  ${currentQuestion?.number}번 문제`}
          shareTitle={`${String(examTitle)}  ${currentQuestion?.number}번 문제`}
          shareDescription={ellipsisText(currentQuestion?.question || '', 50)}
        />
      )}
      {solutionWriteModalState && (
        <SolutionWriteModal
          open={solutionWriteModalState}
          onClose={onToggleSolutionWriteModal}
          questionAndSolutionContent={{
            content: currentQuestion ? `${currentQuestion.question}` : '',
            img: currentQuestion?.question_img,
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
      )}
      {unAuthorizedExam && (
        <Dimmed content="직8딴 플랜 구매후 이용가능 합니다.">
          <Link href="/pricing">
            <Button type="primary" size="large">
              구매하러 가기
            </Button>
          </Link>
        </Dimmed>
      )}
    </>
  );
};

export default ExamComponent;

interface ExamContainerProps {
  answerboxVisible: boolean;
  isPremium: boolean;
}

const ExamContainer = styled.div<ExamContainerProps>`
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.isPremium &&
    css`
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    `}
  .exam-container-title-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    gap: 5px;
  }
  .exam-container-author-name {
    font-size: 0.9rem;
    color: ${palette.gray_700};
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
    cursor: pointer;
    width: 110px;
    height: 35px;
    border: 1px solid ${palette.gray_100};
    border-radius: 5px;
    padding: 0 10px;
    background-color: ${palette.gray_100};
    justify-content: center;
    align-items: center;
  }
  .exam-container-label {
    font-size: 14px;
    position: relative;
    top: -10px;
    color: ${palette.gray_700};
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
    gap: 5px;
    margin: 15px 0 2px 0;
    width: max-content;
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
    font-size: 14px;
    color: ${palette.gray_900};
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 5px;
  }
  .exam-solution-write-clear-button {
    height: 18px;
    width: 18px;
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
  .exam-question-and-video-content {
    width: 100%;
    .question-and-solution-box {
      max-height: none;
    }
  }

  pre {
    white-space: pre-wrap;
  }
  @media (max-width: ${responsive.medium}) {
    padding: 0 20px;
    .exam-question-and-video-wrapper {
      flex-direction: column;
    }
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
