import { Collapse, Divider } from 'antd';
import React from 'react';
import { MockExamQuestion, MockExamQuestionFeedback } from 'types';
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
  feedbackList: MockExamQuestionFeedback[];
  updateFeedbackRecommendation: (
    updateFeedbackRecommendationInput: UpdateFeedbackRecommendationInput
  ) => Promise<void>;
  type?: 'collapse' | 'list';
  title?: string;
}

const SolutionModeFeedbackList: React.FC<SolutionModeFeedbackListProps> = ({
  question,
  editFeedback,
  addFeedback,
  deleteFeedback,
  updateFeedbackRecommendation,
  feedbackList,
  type = 'collapse',
  title = '추가답안',
}) => {
  return (
    <div className="mt-5">
      {type === 'collapse' && (
        <Collapse>
          <Collapse.Panel header={`${title} (${feedbackList.length})`} key="1">
            {feedbackList.map((feedback, index) => (
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
                {index !== feedbackList.length - 1 && (
                  <Divider style={{ margin: '12px 0' }} />
                )}
              </>
            ))}
          </Collapse.Panel>
        </Collapse>
      )}
      {type === 'list' &&
        feedbackList.map((feedback, index) => (
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
            {index !== feedbackList.length - 1 && (
              <Divider style={{ margin: '12px 0' }} />
            )}
          </>
        ))}
    </div>
  );
};

export default SolutionModeFeedbackList;
