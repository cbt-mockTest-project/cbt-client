// import Bookmark from '@components/common/bookmark/Bookmark';
import CommentModal from '@components/common/modal/CommentModal';
import ReportModal from '@components/common/modal/ReportModal';
import { loginModal } from '@lib/constants';
import { useCreateQuestionFeedBack } from '@lib/graphql/hook/useFeedBack';
import { useEditQuestionBookmark } from '@lib/graphql/hook/useQuestionBookmark';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { ReadMockExamQuestionQuery } from '@lib/graphql/query/questionQuery.generated';
import useToggle from '@lib/hooks/useToggle';
import { responsive } from '@lib/utils/responsive';
import { ellipsisText, handleError, removeHtmlTag } from '@lib/utils/utils';
import { coreActions } from '@modules/redux/slices/core';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import palette from '@styles/palette';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button, Image, message, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import styled, { css } from 'styled-components';
import dynamic from 'next/dynamic';
import QuestionComment from '@components/question/QuestionComment';
import QuestionShareModal from '@components/common/modal/QuestionShareModal';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StateSelecboxGroup from '@components/common/selectbox/StateSelecboxGroup';
import { useChangeQuestionState } from '@lib/graphql/hook/useQuestionState';
import { QuestionFeedbackType, QuestionState } from 'types';
import { checkboxOption } from 'customTypes';
import { QuestionListType } from '@modules/redux/slices/exam';
import parse from 'html-react-parser';
import EditorStyle from '@styles/editorStyle';

const ExamSolutionFeedback = dynamic(() => import('./ExamSolutionFeedback'), {
  ssr: false,
});

const Bookmark = dynamic(() => import('@components/common/bookmark/Bookmark'), {
  ssr: false,
  loading: () => <StarBorderOutlinedIcon />,
});

type ExamQuestionTypeByQuestionId =
  ReadMockExamQuestionQuery['readMockExamQuestion']['mockExamQusetion'];

export type ExamQuestionType =
  | QuestionListType[number]
  | ExamQuestionTypeByQuestionId;

interface ExamSolutionListProps {
  question: ExamQuestionType;
  title: string;
  isSolutionAllHide: boolean;
  commentType?: 'modal' | 'basic';
  hasNewWindowButton?: boolean;
  hasStateBox?: boolean;
  isPreview?: boolean;
  questionSubDescription?: string;
  isDetailPage?: boolean;
  index?: number;
}

const ExamSolutionList: React.FC<ExamSolutionListProps> = ({
  question,
  title,
  isSolutionAllHide,
  commentType = 'modal',
  hasNewWindowButton = true,
  hasStateBox = false,
  isPreview = false,
  questionSubDescription,
  isDetailPage = false,
  index,
}) => {
  const [currentQuestion, setCurrentQuestion] =
    useState<ExamQuestionType>(question);
  const [editBookmark] = useEditQuestionBookmark();
  const [isSolutionHide, setIsSolutionHide] = useState<boolean>(false);
  const [bookmarkState, setBookmarkState] = useState(false);
  const { value: commentModalState, onToggle: onToggleCommentModal } =
    useToggle();
  const { value: shareModalState, onToggle: onToggleShareModal } = useToggle();
  const {
    value: reportModalState,
    setValue: setReportModalState,
    onToggle: onToggleReportModal,
  } = useToggle();
  const [createFeedBack] = useCreateQuestionFeedBack();
  const [changeQuestionState] = useChangeQuestionState();
  const reportValue = useRef({
    content: '',
    type: QuestionFeedbackType.Public,
  });
  const isSolutionEmpty =
    question.solution?.replace(/\s+/g, '').includes('사진참고') ||
    removeHtmlTag(question.solution || '') === '';
  const isQuestionEmpty =
    question.question?.replace(/\s+/g, '').includes('사진참고') ||
    removeHtmlTag(question.question || '') === '';

  const dispatch = useAppDispatch();
  const openLoginModal = () => dispatch(coreActions.openModal(loginModal));
  const { data: meQuery } = useMeQuery();

  useEffect(() => {
    setIsSolutionHide(isSolutionAllHide);
  }, [isSolutionAllHide]);

  // useEffect(() => {
  //   if (currentQuestion.mockExamQuestionBookmark.length >= 1) {
  //     setBookmarkState(true);
  //   } else {
  //     setBookmarkState(false);
  //   }
  // }, [currentQuestion.mockExamQuestionBookmark]);

  useEffect(() => {
    if (reportModalState || commentModalState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [reportModalState, commentModalState]);
  const openReportModal = () => {
    if (!meQuery?.me.ok) {
      return openLoginModal();
    }
    setReportModalState(true);
  };

  const requestChangeQuestionState = async (state: checkboxOption['value']) => {
    try {
      const res = await changeQuestionState({
        variables: {
          input: {
            questionId: currentQuestion.id,
            state: state as QuestionState,
          },
        },
      });
      if (res.data?.createOrUpdateMockExamQuestionState.ok) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const requestReport = async () => {
    const content = reportValue.current.content;
    const type = reportValue.current.type;
    if (content.length <= 4) {
      return message.warning('5글자 이상 입력해주세요.');
    }
    if (content) {
      const questionId = currentQuestion.id;
      const res = await createFeedBack({
        variables: { input: { type, content, questionId } },
      });
      if (res.data?.createMockExamQuestionFeedback.ok) {
        const newFeedback = res.data.createMockExamQuestionFeedback.feedback;
        const newQuestion = {
          ...currentQuestion,
          mockExamQuestionFeedback: [
            ...currentQuestion.mockExamQuestionFeedback,
            newFeedback,
          ],
        };
        message.success('답안에 추가됐습니다.');
        // refetch();
        setCurrentQuestion(newQuestion as QuestionListType[number]);
        setReportModalState(false);
        return;
      }
      return message.error({
        content: res.data?.createMockExamQuestionFeedback.error,
      });
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
      if (!meQuery?.me.ok) {
        return openLoginModal();
      }
      if (bookmarkState) {
        setBookmarkState(false);
      }
      if (!bookmarkState) {
        setBookmarkState(true);
      }
      const res = await editBookmark({
        variables: { input: { questionId: currentQuestion.id } },
      });
      if (!res.data?.editMockExamQuestionBookmark.ok) {
        rollbackBookmarkState();
        return message.error(res.data?.editMockExamQuestionBookmark.error);
      }
    } catch (e) {
      rollbackBookmarkState();
      handleError(e);
    }
  };

  const onToggleSolutionHide = () => {
    setIsSolutionHide(!isSolutionHide);
  };

  const onShareAction = () => {
    if (window && (window as any)?.Share) {
      const questionPageLink = `${process.env.NEXT_PUBLIC_CLIENT_URL}/question/${currentQuestion.id}`;
      return (window as any).Share.postMessage(questionPageLink);
    }
    onToggleShareModal();
  };

  useEffect(() => {
    setCurrentQuestion(question);
  }, [question]);

  return (
    <ExamSolutionListContainer
      isDetailPage={isDetailPage}
    ></ExamSolutionListContainer>
  );
};

export default ExamSolutionList;

interface ExamSolutionListContainerProps {
  isDetailPage: boolean;
}

const ExamSolutionListContainer = styled.li<ExamSolutionListContainerProps>`
  .hide {
    filter: blur(10px);
  }
  .solution-page-state-select-box-group {
    margin-top: 10px;
  }

  .solution-page-question-solution-header {
    display: flex;
    justify-content: space-between;
  }
  .solution-page-solution {
    white-space: pre-wrap;
    margin: 20px 0 20px 20px;
  }

  .solution-page-report-button,
  .solution-page-comment-button {
    font-size: 0.8rem;
    + button {
      margin-left: 10px;
    }
    margin-top: 15px;
  }

  .solution-page-question {
    ${EditorStyle}
    white-space: pre-wrap;
    b {
      font-size: 1.1.rem;
      font-weight: bold;
    }
  }
  .solution-page-question-pre-wrapper {
    background-color: ${palette.gray_100};
    border-radius: 5px;
    border-top-left-radius: 0;
    padding: 20px;
    flex: 4;
  }
  .solution-page-solution-pre-wrapper {
    position: relative;
    border-radius: 5px;
    border-top-left-radius: 0;
    border: 1px solid ${palette.gray_400};
    padding: 20px;
    flex: 4;
  }
  .solution-page-question-image-wrapper {
    flex: 6;
    padding: 20px;
    text-align: left;
    border: 1px solid ${palette.gray_400};
  }
  .solution-page-question-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .solution-page-question-wrapper {
    display: flex;
    position: relative;
    margin-top: 65px;
    gap: 20px;
    ${(props) =>
      props.isDetailPage &&
      css`
        flex-direction: column;
        gap: 0px;
      `}
  }

  .solution-page-comment-modal {
    max-width: none;
    width: 500px;
    background-color: ${palette.gray_100};
  }
  .solution-page-question-bookmark-button-wrapper {
    display: flex;
    position: absolute;
    gap: 5px;
    top: -35px;
  }
  .solution-page-question-bookmark-button {
    display: flex;
    gap: 5px;
    width: 90px;
    height: 35px;
    align-items: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border: 1px solid ${palette.gray_100};
    background-color: ${palette.gray_100};
    font-size: 0.8rem;
  }
  .solution-page-question-label {
    font-size: 14px;
    color: ${palette.gray_700};
  }
  .solution-page-question-detail-link {
    svg {
      height: 35px;
      transition: color 0.2s;
      :hover {
        color: ${palette.antd_blue_01};
      }
    }
  }
  .solution-page-question-bookmark-text {
    flex: 2;
    text-align: left;
  }
  .solution-page-question-bookmark-icon {
    flex: 1;
    height: 25px;
  }
  .solution-page-solution-hide-button {
    display: flex;
    gap: 5px;
    position: absolute;
    align-items: center;
    width: 90px;
    height: 35px;
    top: -35px;
    border: 1px solid ${palette.gray_400};
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-width: 0;
    font-size: 0.8rem;
  }
  .solution-page-solution-hide-icon {
    flex: 1;
    font-size: 1.2rem;
  }
  .solution-page-solution-hide-text {
    flex: 2;
    text-align: left;
  }
  .solution-page-question-sub-description {
    margin-bottom: 10px;
    font-size: 0.8rem;
    color: ${palette.gray_500};
  }

  @media (max-width: ${responsive.medium}) {
    .solution-page-question-wrapper {
      flex-direction: column;
      gap: 0px;
    }

    .solution-page-question-image-wrapper {
      border-bottom: 1px solid ${palette.gray_400};
    }
    pre {
      font-size: 0.9rem;
    }
  }
  @media (max-width: ${responsive.small}) {
    .solution-page-comment-modal {
      width: 100%;
    }
  }
`;
