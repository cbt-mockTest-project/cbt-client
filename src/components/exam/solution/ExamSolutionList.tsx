// import Bookmark from '@components/common/bookmark/Bookmark';
import CommentModal from '@components/common/modal/CommentModal';
import ReportModal from '@components/common/modal/ReportModal';
import { loginModal } from '@lib/constants';
import { useCreateQuestionFeedBack } from '@lib/graphql/user/hook/useFeedBack';
import { useEditQuestionBookmark } from '@lib/graphql/user/hook/useQuestionBookmark';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import {
  ReadMockExamQuestionQuery,
  ReadMockExamQuestionsByMockExamIdQuery,
} from '@lib/graphql/user/query/questionQuery.generated';
import useToggle from '@lib/hooks/useToggle';
import { responsive } from '@lib/utils/responsive';
import { convertWithErrorHandlingFunc, ellipsisText } from '@lib/utils/utils';
import { coreActions } from '@modules/redux/slices/core';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import palette from '@styles/palette';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button, Image, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import QuestionComment from '@components/question/QuestionComment';
import QuestionShareModal from '@components/common/modal/QuestionShareModal';

const Bookmark = dynamic(() => import('@components/common/bookmark/Bookmark'), {
  ssr: false,
  loading: () => <StarBorderOutlinedIcon />,
});

export type ExamQuestionType =
  | ReadMockExamQuestionsByMockExamIdQuery['readMockExamQuestionsByMockExamId']['questions'][0]
  | ReadMockExamQuestionQuery['readMockExamQuestion']['mockExamQusetion'];
interface ExamSolutionListProps {
  question: ExamQuestionType;
  title: string;
  isSolutionAllHide: boolean;
  commentType?: 'modal' | 'basic';
}

const ExamSolutionList: React.FC<ExamSolutionListProps> = ({
  question,
  title,
  isSolutionAllHide,
  commentType = 'modal',
}) => {
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
  const reportValue = useRef('');

  const dispatch = useAppDispatch();

  const { data: meQuery } = useMeQuery();

  useEffect(() => {
    setIsSolutionHide(isSolutionAllHide);
  }, [isSolutionAllHide]);

  useEffect(() => {
    if (question.mockExamQuestionBookmark.length >= 1) {
      setBookmarkState(true);
    } else {
      setBookmarkState(false);
    }
  }, [question.mockExamQuestionBookmark]);

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
      return dispatch(coreActions.openModal(loginModal));
    }
    setReportModalState(true);
  };
  const requestReport = async () => {
    const content = reportValue.current;
    if (content.length <= 4) {
      return message.warn('5글자 이상 입력해주세요.');
    }
    if (content) {
      const questionId = question.id;
      const res = await createFeedBack({
        variables: { input: { content, questionId } },
      });
      if (res.data?.createMockExamQuestionFeedback.ok) {
        message.success('요청이 접수되었습니다.');
        setReportModalState(false);
        return;
      }
      return message.error({
        content: res.data?.createMockExamQuestionFeedback.error,
      });
    }
  };
  const requestEditBookmark = async () => {
    const res = await editBookmark({
      variables: { input: { questionId: question.id } },
    });
    if (res.data?.editMockExamQuestionBookmark.ok) {
      if (res.data?.editMockExamQuestionBookmark.currentState) {
        setBookmarkState(true);
        message.success('문제가 저장됐습니다.');
      }
      if (!res.data?.editMockExamQuestionBookmark.currentState) {
        setBookmarkState(false);
        message.success('문제 저장이 해제됐습니다.');
      }
      return;
    }
    return message.error(res.data?.editMockExamQuestionBookmark.error);
  };
  const tryEditBookmark = convertWithErrorHandlingFunc({
    callback: requestEditBookmark,
  });
  const tryReport = convertWithErrorHandlingFunc({
    callback: requestReport,
  });
  const onToggleSolutionHide = () => {
    setIsSolutionHide(!isSolutionHide);
  };
  return (
    <ExamSolutionListContainer>
      <div className="solution-page-question-wrapper">
        <button
          className="solution-page-question-bookmark-button"
          onClick={tryEditBookmark}
        >
          <Bookmark
            className="solution-page-question-bookmark-icon"
            active={bookmarkState}
          />
          <p className="solution-page-question-bookmark-text">
            {bookmarkState ? '저장됨' : '저장하기'}
          </p>
        </button>
        <div className="solution-page-question-pre-wrapper">
          <pre className="solution-page-question">
            {`Q${question.number}. ${question.question}`}
          </pre>
        </div>
        {question.question_img && question.question_img.length >= 1 && (
          <div className="solution-page-question-image-wrapper">
            <Image
              src={question.question_img[0].url}
              alt="question_image"
              className="solution-page-question-image"
            />
          </div>
        )}
      </div>
      <div className="solution-page-question-wrapper">
        <button
          className="solution-page-solution-hide-button"
          onClick={onToggleSolutionHide}
        >
          {isSolutionHide ? (
            <VisibilityOffIcon className="solution-page-solution-hide-icon" />
          ) : (
            <VisibilityIcon className="solution-page-solution-hide-icon" />
          )}
          <p className="solution-page-solution-hide-text">
            {isSolutionHide ? '보이기' : '가리기'}
          </p>
        </button>
        <div className="solution-page-solution-pre-wrapper">
          <pre
            className={`solution-page-question ${isSolutionHide ? 'hide' : ''}`}
          >
            <b>[solution]</b>
            <br />
            <br />
            {`${question.solution}`}
          </pre>
        </div>
        {question.solution_img && question.solution_img.length >= 1 && (
          <div
            className={`solution-page-question-image-wrapper ${
              isSolutionHide ? 'hide' : ''
            }`}
          >
            {!isSolutionHide && (
              <Image
                src={question.solution_img[0].url}
                alt="question_image"
                className={'solution-page-question-image'}
              />
            )}
          </div>
        )}
      </div>

      {/* <Button
        type="primary"
        className="solution-page-report-button"
        onClick={onToggleShareModal}
      >
        공유하기
      </Button> */}
      <Button
        type="primary"
        className="solution-page-report-button"
        onClick={openReportModal}
      >
        오류신고
      </Button>
      {commentType === 'modal' ? (
        <>
          <Button
            type="primary"
            className="solution-page-comment-button"
            onClick={onToggleCommentModal}
          >
            {`댓글 ${question.mockExamQuestionComment.length}`}
          </Button>
          <CommentModal
            className="solution-page-comment-modal"
            open={commentModalState}
            onClose={onToggleCommentModal}
            title={`${title}  ${question.number}번 문제`}
            questionId={question.id || 0}
          />
        </>
      ) : (
        <QuestionComment questionId={question.id} />
      )}
      <ReportModal
        open={reportModalState}
        onChange={(value) => {
          reportValue.current = value;
        }}
        onClose={onToggleReportModal}
        onCancel={onToggleReportModal}
        onConfirm={tryReport}
        confirmLabel="요청하기"
        title={`${String(title)}\nQ. ${ellipsisText(
          String(question.question),
          10
        )}`}
      />
      <QuestionShareModal
        title={ellipsisText(question.question, 15)}
        questionId={question.id}
        open={shareModalState}
        onClose={onToggleShareModal}
        shareTitle={`${title} ${question.number}번 문제`}
        shareDescription={ellipsisText(question.question, 50)}
      />
    </ExamSolutionListContainer>
  );
};

export default ExamSolutionList;

const ExamSolutionListContainer = styled.li`
  .hide {
    filter: blur(10px);
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
    + button {
      margin-left: 10px;
    }
    margin-top: 15px;
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
    border-top-left-radius: 0;
    padding: 20px;
    flex: 4;
  }
  .solution-page-solution-pre-wrapper {
    position: relative;
    border-radius: 5px;
    border-top-left-radius: 0;
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
    position: relative;
    margin-top: 65px;
    gap: 20px;
  }

  .solution-page-comment-modal {
    max-width: none;
    width: 500px;
    background-color: ${palette.gray_100};
  }
  .solution-page-question-bookmark-button {
    display: flex;
    position: absolute;
    gap: 5px;
    align-items: center;
    width: 90px;
    height: 35px;
    top: -35px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border: 1px solid ${palette.gray_100};
    background-color: ${palette.gray_100};
    font-size: 0.8rem;
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
    border: 1px solid ${palette.gray_300};
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

  @media (max-width: ${responsive.medium}) {
    .solution-page-question-wrapper {
      flex-direction: column;
      gap: 0px;
    }

    .solution-page-question-image-wrapper {
      border: none;
      border-bottom: 1px solid ${palette.gray_300};
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
