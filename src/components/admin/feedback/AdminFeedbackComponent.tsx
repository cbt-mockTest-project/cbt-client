import { useReadQuestionFeedbackByRecommendationCount } from '@lib/graphql/hook/useQuestionFeedback';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const AdminFeedbackComponent = () => {
  const { data } = useReadQuestionFeedbackByRecommendationCount();
  if (!data) return null;

  return (
    <AdminFeedbackComponentContainer>
      <ul>
        {data.getFeedbacksByRecommendationCount.feedbacks?.map((feedback) => (
          <li key={feedback.id}>
            <p>{feedback.content}</p>
            {feedback.recommendation.map((recommendation) => {
              return <p key={recommendation.id}>{recommendation.type}</p>;
            })}
            <a
              href={`/question/${feedback.mockExamQuestion.id}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: 'blue' }}
            >
              문제로이동
            </a>
          </li>
        ))}
      </ul>
    </AdminFeedbackComponentContainer>
  );
};

export default AdminFeedbackComponent;

const AdminFeedbackComponentContainer = styled.div`
  ul {
    display: flex;
    flex-direction: column;
    gap: 20px;
    li {
    }
  }
`;
