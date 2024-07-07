import React, { useState } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { MockExamQuestion } from 'types';
import SolutionModeFeedbackList from '@components/solutionMode/SolutionModeFeedbackList';
import { Button, Image } from 'antd';
import palette from '@styles/palette';
import {
  AddFeedbackInput,
  DeleteFeedbackInput,
  EditFeedbackInput,
  UpdateFeedbackRecommendationInput,
} from '@lib/hooks/useQuestionFeedback';
import EditorStyle from '@styles/editorStyle';
import QuestionFeedbackModal from '@components/solutionMode/QuestionFeedbackModal';
import useAuth from '@lib/hooks/useAuth';
import { useRouter } from 'next/router';
import { useMeQuery } from '@lib/graphql/hook/useUser';

const StudyAnswerBoxBlock = styled.div`
  position: relative;
  .study-answer-box-question-card-answer-label {
    font-weight: bold;
    color: ${({ theme }) => theme.color('colorTextSecondary')};
  }
  .study-answer-box-question-card-answer {
    word-break: break-all;
    white-space: pre-wrap;
    user-select: none;
    ${EditorStyle};
  }
  .study-answer-box-question-card-answer-wrapper {
    transition: opacity 0.2s ease-in-out;
  }
  .study-answer-box-question-card-anwswer-wrapper.hidden {
    opacity: 0;
  }

  .study-answer-box-box-image {
    width: 100%;
    max-height: 400px;
    object-fit: contain;
    margin-top: 10px;
    border-radius: 5px;
  }
  .study-answer-footer {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid ${({ theme }) => theme.color('colorSplit')};
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }
`;

interface StudyAnswerBoxProps {
  isAnswerHidden?: boolean;
  question: MockExamQuestion;
  className?: string;
  isVisibleImage?: boolean;
  editFeedback: (editFeedbackInput: EditFeedbackInput) => Promise<void>;
  addFeedback: (editFeedbackInput: AddFeedbackInput) => Promise<void>;
  deleteFeedback: (deleteFeedbackInput: DeleteFeedbackInput) => Promise<void>;
  updateFeedbackRecommendation: (
    updateFeedbackRecommendationInput: UpdateFeedbackRecommendationInput
  ) => Promise<void>;
}

const StudyAnswerBox: React.FC<StudyAnswerBoxProps> = ({
  isAnswerHidden = false,
  question,
  editFeedback,
  addFeedback,
  deleteFeedback,
  updateFeedbackRecommendation,
  isVisibleImage = true,
  className = '',
}) => {
  const { data: meQuery } = useMeQuery();
  const router = useRouter();
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const hasAddAnswerButton =
    router.query.rel !== 'q' && router.pathname !== '/question/[Id]';
  const { handleCheckLogin } = useAuth();
  const myFeedbackList = question.mockExamQuestionFeedback.filter(
    (feedback) => feedback.user?.id === meQuery?.me?.user?.id
  );
  const feedbackListExceptMe = question.mockExamQuestionFeedback.filter(
    (feedback) => feedback.user?.id !== meQuery?.me?.user?.id
  );
  const onClickOpenFeedbackModal = () => {
    if (!handleCheckLogin()) {
      return;
    }
    setIsFeedbackModalOpen(true);
  };
  if (!question) return null;
  return (
    <StudyAnswerBoxBlock className={className}>
      <div
        className={`study-answer-box-question-card-anwswer-wrapper ${
          isAnswerHidden ? 'hidden' : ''
        }`}
      >
        <div className="study-answer-box-question-card-answer">
          {parse(question.solution || '')}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{
            width: 'fit-content',
          }}
        >
          {isVisibleImage &&
            question.solution_img &&
            question.solution_img.length > 0 &&
            question.solution_img[0].url && (
              <Image
                className="study-answer-box-box-image"
                src={question.solution_img[0].url}
                alt="문제이미지"
              />
            )}
        </div>
        {!!myFeedbackList.length && (
          <div className="border-t border-gray-200 mt-4  border-solid">
            <SolutionModeFeedbackList
              question={question}
              editFeedback={editFeedback}
              addFeedback={addFeedback}
              deleteFeedback={deleteFeedback}
              updateFeedbackRecommendation={updateFeedbackRecommendation}
              feedbackList={myFeedbackList}
              type="list"
            />
          </div>
        )}
        {!!feedbackListExceptMe.length && (
          <SolutionModeFeedbackList
            question={question}
            editFeedback={editFeedback}
            addFeedback={addFeedback}
            deleteFeedback={deleteFeedback}
            updateFeedbackRecommendation={updateFeedbackRecommendation}
            feedbackList={feedbackListExceptMe}
          />
        )}
      </div>
      {hasAddAnswerButton && (
        <div className="study-answer-footer" onClick={onClickOpenFeedbackModal}>
          <Button shape="circle">➕</Button>
          <div>메모</div>
        </div>
      )}
      {isFeedbackModalOpen && (
        <QuestionFeedbackModal
          addFeedback={addFeedback}
          editFeedback={editFeedback}
          question={question}
          open={isFeedbackModalOpen}
          onCancel={() => setIsFeedbackModalOpen(false)}
          onClose={() => setIsFeedbackModalOpen(false)}
          title={`${String(question.mockExam?.title)}\n${
            question.number
          }번 문제`}
        />
      )}
    </StudyAnswerBoxBlock>
  );
};

export default StudyAnswerBox;
