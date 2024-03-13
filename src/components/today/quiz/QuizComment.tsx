import React from 'react';
import styled from 'styled-components';
import { QuizComment } from 'types';

const QuizCommentBlock = styled.div``;

interface QuizCommentProps {
  comments: QuizComment[];
}

const QuizComment: React.FC<QuizCommentProps> = ({ comments }) => {
  return (
    <QuizCommentBlock>
      {comments.map((comment) => (
        <div key={comment.id}>
          <div>{comment.user.nickname}</div>
          <div>{comment.content}</div>
        </div>
      ))}
    </QuizCommentBlock>
  );
};

export default QuizComment;
