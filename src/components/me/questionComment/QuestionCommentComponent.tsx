import { responsive } from '@lib/utils/responsive';
import React from 'react';
import styled from 'styled-components';

interface QuestionCommentComponentProps {}

const QuestionCommentComponent: React.FC<
  QuestionCommentComponentProps
> = () => {
  return (
    <QuestionCommentComponentContainer>
      hello world
    </QuestionCommentComponentContainer>
  );
};

export default QuestionCommentComponent;

const QuestionCommentComponentContainer = styled.div`
  @media (max-width: ${responsive.medium}) {
    margin-top: 20px;
    padding: 0 20px;
  }
`;
