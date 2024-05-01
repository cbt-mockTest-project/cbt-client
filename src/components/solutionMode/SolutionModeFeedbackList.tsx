import { Collapse, Divider } from 'antd';
import React from 'react';
import { MockExamQuestion } from 'types';
import SolutionModeFeedbackListItem from './SolutionModeFeedbackListItem';
import {
  AddFeedbackInput,
  DeleteFeedbackInput,
  EditFeedbackInput,
  UpdateFeedbackRecommendationInput,
} from '@lib/hooks/useQuestionFeedback';

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
  if (question.mockExamQuestionFeedback.length === 0) return null;
  return (
    <div className="mt-5">
      <Collapse>
        <Collapse.Panel
          header={`추가답안 (${question.mockExamQuestionFeedback.length})`}
          key="1"
        >
          {question.mockExamQuestionFeedback.map((feedback, index) => (
            <>
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
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default SolutionModeFeedbackList;
