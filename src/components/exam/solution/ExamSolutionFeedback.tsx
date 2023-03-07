import { useDeleteQuestionFeedback } from '@lib/graphql/user/hook/useQuestionFeedback';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import palette from '@styles/palette';
import { message } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { UserRole } from 'types';
import { ExamQuestionType } from './ExamSolutionList';

interface ExamSolutionFeedbackProps {
  question: ExamQuestionType;
  refetch: ({ ...args }?: any) => any;
}

const ExamSolutionFeedback: React.FC<ExamSolutionFeedbackProps> = ({
  question,
  refetch,
}) => {
  const { data: meQuery } = useMeQuery();
  const [deleteQuestionFeedback] = useDeleteQuestionFeedback();
  const requestFeedBackDelete = async (questionId: number) => {
    const confirmed = confirm('삭제하시겠습니까?');
    if (confirmed) {
      const res = await deleteQuestionFeedback({
        variables: { input: { id: questionId } },
      });
      if (res.data?.deleteMockExamQuestionFeedback.ok) {
        refetch();
        return message.success('삭제되었습니다.');
      }
      return message.error(res.data?.deleteMockExamQuestionFeedback.error);
    }
  };
  const tryFeedBackDelete = (questionId: number) =>
    convertWithErrorHandlingFunc({
      callback: () => requestFeedBackDelete(questionId),
    });
  if (question.mockExamQuestionFeedback.length === 0) {
    return null;
  }
  return (
    <ExamSolutionFeedbackContainer>
      <div className="exam-solution-feedback-separation" />
      {question.mockExamQuestionFeedback.map((feedback) => (
        <li className="exam-solution-feedback-item" key={feedback.id}>
          <div className="exam-solution-feedback-user-tab">
            <p className="exam-solution-feedback-user-name">{`작성자: ${feedback.user.nickname}`}</p>
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
          <p className="exam-solution-feedback-content">{feedback.content}</p>
        </li>
      ))}
      <p className="exam-solution-feedback-info">
        {`※ 오류 신고의 경우, 신고 내용 반영 후 삭제됩니다.\n※ 오류가 있는 답안은 삭제됩니다.`}
      </p>
    </ExamSolutionFeedbackContainer>
  );
};

export default ExamSolutionFeedback;

const ExamSolutionFeedbackContainer = styled.ul`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
    gap: 20px;
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
