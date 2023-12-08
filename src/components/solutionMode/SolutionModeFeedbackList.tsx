import { Divider } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { MockExamQuestion } from 'types';
import SolutionModeFeedbackListItem from './SolutionModeFeedbackListItem';

const SolutionModeFeedbackListBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

interface SolutionModeFeedbackListProps {
  question: MockExamQuestion;
}

const SolutionModeFeedbackList: React.FC<SolutionModeFeedbackListProps> = ({
  question,
}) => {
  return (
    <SolutionModeFeedbackListBlock>
      {question.mockExamQuestionFeedback.map((feedback, index) => (
        <>
          {index === 0 && <Divider style={{ margin: '12px 0' }} />}
          <SolutionModeFeedbackListItem
            key={feedback.id}
            feedback={feedback}
            question={question}
          />
          {index !== question.mockExamQuestionFeedback.length - 1 && (
            <Divider style={{ margin: '12px 0' }} />
          )}
        </>
      ))}
    </SolutionModeFeedbackListBlock>
  );
};

export default SolutionModeFeedbackList;
