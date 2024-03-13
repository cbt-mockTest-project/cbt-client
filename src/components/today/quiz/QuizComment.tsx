import { convertToKST } from '@lib/utils/utils';
import palette from '@styles/palette';
import { Empty } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { QuizComment } from 'types';

const QuizCommentBlock = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .quiz-comment {
    border-bottom: 1px solid ${palette.colorBorder};
    padding-bottom: 10px;
  }
  .quiz-comment:last-child {
    border-bottom: none;
  }
  .quiz-comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .quiz-comment-user,
    .quiz-comment-date {
      font-weight: bold;
      font-size: 13px;
      color: ${palette.colorSubText};
    }
  }

  .quiz-comment-content {
    word-break: break-all;
    white-space: pre-line;
  }
`;

interface QuizCommentProps {
  comments: QuizComment[];
}

const QuizComment: React.FC<QuizCommentProps> = ({ comments }) => {
  return (
    <QuizCommentBlock>
      {comments.map((comment) => (
        <div className="quiz-comment" key={comment.id}>
          <div className="quiz-comment-header">
            <div className="quiz-comment-user">
              작성자: {comment.user.nickname}
            </div>
            <div className="quiz-comment-date">
              {convertToKST(comment.created_at, 'MM-dd hh:mm')}
            </div>
          </div>
          <pre className="quiz-comment-content">{comment.content}</pre>
        </div>
      ))}
      {comments.length === 0 && (
        <Empty
          style={{
            marginTop: '20px',
          }}
          description="아직 제출된 답안이 없습니다."
        />
      )}
    </QuizCommentBlock>
  );
};

export default QuizComment;
