import { useDeleteQuestionFeedback } from '@lib/graphql/user/hook/useQuestionFeedback';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import palette from '@styles/palette';
import { message } from 'antd';
import React from 'react';
import styled, { css } from 'styled-components';
import { QuestionFeedbackType, UserRole } from 'types';
import { ExamQuestionType } from './ExamSolutionList';
import Badge from '@components/common/badge/Badge';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

interface ExamSolutionFeedbackProps {
  question: ExamQuestionType;
  setQuestion?: React.Dispatch<React.SetStateAction<ExamQuestionType>>;
  refetch?: ({ ...args }?: any) => any;
  type?: 'me' | 'others';
}

const ExamSolutionFeedback: React.FC<ExamSolutionFeedbackProps> = ({
  question,
  refetch,
  setQuestion,
  type = 'others',
}) => {
  const { data: meQuery } = useMeQuery();
  const [deleteQuestionFeedback] = useDeleteQuestionFeedback();
  const requestFeedBackDelete = async (feedbackId: number) => {
    const confirmed = confirm('삭제하시겠습니까?');
    if (confirmed) {
      const res = await deleteQuestionFeedback({
        variables: { input: { id: feedbackId } },
      });
      if (res.data?.deleteMockExamQuestionFeedback.ok) {
        if (setQuestion) {
          const newFeedback = question.mockExamQuestionFeedback.filter(
            (feedback) => feedback.id !== feedbackId
          );
          const newQuestion = {
            ...question,
            mockExamQuestionFeedback: newFeedback,
          };
          setQuestion(newQuestion);
        } else if (refetch) refetch();

        return message.success('삭제되었습니다.');
      }
      return message.error(res.data?.deleteMockExamQuestionFeedback.error);
    }
  };
  const tryFeedBackDelete = (feedbackId: number) =>
    convertWithErrorHandlingFunc({
      callback: () => requestFeedBackDelete(feedbackId),
    });
  const isAllPrivate = question.mockExamQuestionFeedback.every(
    (feedback) => feedback.type === QuestionFeedbackType.Private
  );
  const isNotAllPrivate = question.mockExamQuestionFeedback.every(
    (feedback) =>
      feedback.type === QuestionFeedbackType.Public ||
      feedback.type === QuestionFeedbackType.Report
  );

  if (question.mockExamQuestionFeedback.length === 0) {
    return null;
  }
  if (type === 'others' && isAllPrivate) return null;
  if (type === 'me' && isNotAllPrivate) return null;
  return (
    <ExamSolutionFeedbackContainer type={type}>
      {type === 'others' && (
        <div className="exam-solution-feedback-separation" />
      )}
      {question.mockExamQuestionFeedback.map(
        (feedback) =>
          ((type === 'others' &&
            feedback.type !== QuestionFeedbackType.Private) ||
            (type === 'me' &&
              feedback.type === QuestionFeedbackType.Private)) && (
            <li className="exam-solution-feedback-item" key={feedback.id}>
              <div className="exam-solution-feedback-user-tab">
                <p className="exam-solution-feedback-user-name">{`작성자: ${feedback.user.nickname}`}</p>
                {feedback.type === QuestionFeedbackType.Public && (
                  <Badge color="blue" label="추가답안" />
                )}
                {feedback.type === QuestionFeedbackType.Report && (
                  <Badge color="red" label="오류신고" />
                )}
                {feedback.type === QuestionFeedbackType.Private && (
                  <Badge color="blue" label="내답안" />
                )}
                {(meQuery?.me.user?.id === feedback.user.id ||
                  meQuery?.me.user?.role === UserRole.Admin) && (
                  <button
                    className="exam-solution-feedback-delete-button"
                    onClick={tryFeedBackDelete(feedback.id)}
                  >
                    삭제하기
                  </button>
                )}
              </div>
              <p className="exam-solution-feedback-content">
                {feedback.content}
              </p>
            </li>
          )
      )}
      {type === 'me' && <div className="exam-solution-feedback-separation" />}
    </ExamSolutionFeedbackContainer>
  );
};

export default ExamSolutionFeedback;

interface ExamSolutionFeedbackContainerProps
  extends Pick<ExamSolutionFeedbackProps, 'type'> {}

const ExamSolutionFeedbackContainer = styled.ul<ExamSolutionFeedbackContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${(props) =>
    props.type === 'others'
      ? css`
          margin-top: 10px;
        `
      : css`
          margin-bottom: 10px;
        `}
  .exam-solution-feedback-separation {
    width: 100%;
    border: 1px solid ${palette.gray_200};
  }
  .exam-solution-feedback-item {
  }
  .exam-solution-feedback-info {
    color: red;
    font-size: 0.8rem;
  }
  .exam-solution-feedback-content {
    white-space: pre-wrap;
  }
  .exam-solution-feedback-user-tab {
    display: flex;
    gap: 10px;
  }
  .exam-solution-feedback-user-name {
    font-size: 0.8rem;
    font-weight: bold;
  }
  .exam-solution-feedback-delete-button {
    font-size: 0.8rem;
    color: ${palette.gray_500};
    transition: color 0.3s;
    :hover {
      color: ${palette.antd_blue_01};
    }
  }
`;
