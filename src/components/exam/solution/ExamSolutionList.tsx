import CommentModal from '@components/common/modal/CommentModal';
import ReportModal from '@components/common/modal/ReportModal';
import { loginModal } from '@lib/constants';
import { useCreateQuestionFeedBack } from '@lib/graphql/user/hook/useFeedBack';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { responsive } from '@lib/utils/responsive';
import { convertWithErrorHandlingFunc, ellipsisText } from '@lib/utils/utils';
import { coreActions } from '@modules/redux/slices/core';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import palette from '@styles/palette';
import { Button, Image, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface QuestionOption {
  title: string;
  id: number;
}

interface ExamSolutionListProps {
  question: ReadMockExamQuestionsByMockExamIdQuery['readMockExamQuestionsByMockExamId']['questions'][0];
  title: string;
}

const ExamSolutionList: React.FC<ExamSolutionListProps> = ({
  question,
  title,
}) => {
  const [commentModalState, setCommentModalState] = useState(false);
  const [reportModalState, setReportModalState] = useState(false);
  const [createFeedBack] = useCreateQuestionFeedBack();
  const reportValue = useRef('');
  const [currentQuestion, setCurrentQuestion] = useState<QuestionOption | null>(
    null
  );

  const dispatch = useAppDispatch();

  const { data: meQuery } = useMeQuery();

  const onToggleReportModalState = () => setReportModalState(!reportModalState);
  const onToggleCommentModal = () => setCommentModalState(!commentModalState);
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
        message.success('요청이 접수되었습니다.');
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
    <ExamSolutionListContainer>
      <div className="solution-page-question-wrapper">
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
        <div className="solution-page-solution-pre-wrapper">
          <pre className="solution-page-question">
            <b>[solution]</b>
            <br />
            <br />
            {`${question.solution}`}
            {question.solution_img && question.solution_img.length >= 1 && (
              <a
                className="solution-page-image-link"
                key={question.solution_img[0].url}
                href={question.solution_img[0].url}
                target="_blank"
                rel="noreferrer"
              >{`이미지${String(1).padStart(2, '0')}`}</a>
            )}
          </pre>
        </div>
        {question.solution_img && question.solution_img.length >= 1 && (
          <div className="solution-page-question-image-wrapper">
            <Image
              src={question.solution_img[0].url}
              alt="question_image"
              className="solution-page-question-image"
            />
          </div>
        )}
      </div>
      <Button
        type="primary"
        className="solution-page-report-button"
        onClick={() => openReportModal(question.question, question.id)}
      >
        문제수정 요청
      </Button>
      <Button
        type="primary"
        className="solution-page-comment-button"
        onClick={onToggleCommentModal}
      >
        댓글
      </Button>
      <CommentModal
        className="solution-page-comment-modal"
        open={commentModalState}
        onClose={onToggleCommentModal}
        title={`${title}  ${question.number}번 문제`}
        questionId={question.id || 0}
      />
      <ReportModal
        open={reportModalState}
        onChange={(value) => {
          reportValue.current = value;
        }}
        onClose={onToggleReportModalState}
        onCancel={onToggleReportModalState}
        onConfirm={tryReport}
        confirmLabel="요청하기"
        title={`${String(title)}\nQ. ${ellipsisText(
          String(currentQuestion?.title),
          10
        )}`}
      />
    </ExamSolutionListContainer>
  );
};

export default ExamSolutionList;

const ExamSolutionListContainer = styled.li`
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

  .solution-page-comment-button {
    margin-left: 15px;
  }
  .solution-page-comment-modal {
    top: 0;
    bottom: 0;
    max-width: none;
    width: 500px;
    background-color: ${palette.gray_100};
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
  }
`;
