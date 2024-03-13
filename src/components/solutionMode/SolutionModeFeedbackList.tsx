import { Divider } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { MockExamQuestion } from 'types';
import SolutionModeFeedbackListItem from './SolutionModeFeedbackListItem';
import {
  AddFeedbackInput,
  DeleteFeedbackInput,
  EditFeedbackInput,
  UpdateFeedbackRecommendationInput,
} from '@lib/hooks/useQuestionFeedback';

const SolutionModeFeedbackListBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

interface SolutionModeFeedbackListProps {
  question: MockExamQuestion;
  editFeedback: (editFeedbackInput: EditFeedbackInput) => Promise<void>;
  addFeedback: (editFeedbackInput: AddFeedbackInput) => Promise<void>;
  deleteFeedback: (deleteFeedbackInput: DeleteFeedbackInput) => Promise<void>;
  updateFeedbackRecommendation: (
    updateFeedbackRecommendationInput: UpdateFeedbackRecommendationInput
  ) => Promise<void>;
}

const SolutionModeFeedbackList: React.FC<SolutionModeFeedbackListProps> = ({
  question,
  editFeedback,
  addFeedback,
  deleteFeedback,
  updateFeedbackRecommendation,
}) => {
  return (
    <SolutionModeFeedbackListBlock>
      {question.mockExamQuestionFeedback.map((feedback, index) => (
        <>
          {index === 0 && <Divider style={{ margin: '12px 0' }} />}
          {feedback.user && (
            <SolutionModeFeedbackListItem
              deleteFeedback={deleteFeedback}
              updateFeedbackRecommendation={updateFeedbackRecommendation}
              addFeedback={addFeedback}
              editFeedback={editFeedback}
              key={feedback.id}
              feedback={feedback}
              question={question}
            />
          )}
          {index !== question.mockExamQuestionFeedback.length - 1 && (
            <Divider style={{ margin: '12px 0' }} />
          )}
        </>
      ))}
    </SolutionModeFeedbackListBlock>
  );
};

export default SolutionModeFeedbackList;
