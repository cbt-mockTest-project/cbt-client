import EditorStyle from '@styles/editorStyle';
import { Button, Collapse, Image, Input, Modal } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Quiz } from 'types';
import parse from 'html-react-parser';
import useAuth from '@lib/hooks/useAuth';
import palette from '@styles/palette';
import TextArea from 'antd/lib/input/TextArea';
import QuizComment from './QuizComment';
import useQuizs from '@lib/hooks/useQuizs';

const QuizItemBlock = styled.div`
  display: flex;
  flex-direction: column;
  .quiz-item-question,
  .quiz-item-solution {
    white-space: pre-line;
    ${EditorStyle}
  }
  .quiz-item-solution {
    margin-top: 10px;
  }
  .quiz-item-image {
    width: 100%;
    max-height: 400px;
    object-fit: contain;
    margin-top: 10px;
    border-radius: 5px;
  }
  .quiz-item-answer-form {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 10px;
  }
  .quiz-item-solution-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 15px;
  }
  .quiz-item-title-label {
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.color('colorText')};
    border-bottom: 3px solid ${({ theme }) => theme.color('colorBorder')};
  }
  .quiz-item-my-answer-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .quiz-item-my-answer-button-wrapper {
    display: flex;
    gap: 10px;
  }
`;

interface QuizItemProps {
  quiz: Quiz;
  number: number;
}

const QuizItem: React.FC<QuizItemProps> = ({ number, quiz }) => {
  const { user, handleCheckLogin } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [answer, setAnswer] = useState('');
  const {
    createQuizCommentMutation,
    editQuizCommentMutation,
    deleteQuizCommentMutation,
  } = useQuizs();

  const onClickAnswerSubmitButton = (id: number) => {
    if (!handleCheckLogin()) return;
    const isEditting = myAnswer;
    Modal.confirm({
      title: isEditting ? '수정하시겠습니까?' : '제출하시겠습니까?',
      okText: '확인',
      cancelText: '취소',
      onOk: async () => {
        const res = isEditting
          ? await editQuizCommentMutation.mutateAsync({
              content: answer,
              id,
            })
          : await createQuizCommentMutation.mutateAsync({
              content: answer,
              quizId: quiz.id,
            });
        if (res.ok) {
          setIsEditMode(false);
        }
      },
    });
  };

  const onClickDeleteMyAnswerButton = () => {
    if (!handleCheckLogin()) return;
    if (!myAnswer) return;
    Modal.confirm({
      title: '정말 삭제하시겠습니까?',
      okText: '확인',
      cancelText: '취소',
      onOk: async () => {
        const res = await deleteQuizCommentMutation.mutateAsync(myAnswer.id);
        if (res.ok) {
          setIsEditMode(false);
        }
      },
    });
  };

  const onClickEditMyAnswerButton = () => {
    if (!handleCheckLogin()) return;
    if (!myAnswer) return;
    setIsEditMode(true);
    setAnswer(myAnswer?.content || '');
  };

  const isAnswerSubmitted = quiz.comment.some(
    (comment) => comment.user.id === user?.id
  );

  const myAnswer = quiz.comment.find((comment) => comment.user.id === user?.id);

  const answersWithoutMyAnswer = quiz.comment.filter(
    (comment) => comment.user.id !== user?.id
  );

  return (
    <Collapse defaultActiveKey={[1]} key={quiz.question.id}>
      <Collapse.Panel header={`${number}번 문제`} key={number}>
        <QuizItemBlock>
          <pre className="quiz-item-question">
            {parse(quiz.question.question)}
          </pre>
          {quiz.question.question_img &&
            quiz.question.question_img.length > 0 && (
              <Image
                className="quiz-item-image"
                src={quiz.question.question_img[0].url}
                alt="문제이미지"
              />
            )}
          {(!isAnswerSubmitted || isEditMode) && (
            <div className="quiz-item-answer-form">
              <TextArea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                autoSize={{ minRows: 3, maxRows: 8 }}
                placeholder="답안을 제출하면 정답을 확인할 수 있습니다."
              />
              <Button
                onClick={() =>
                  onClickAnswerSubmitButton(
                    quiz.comment.find((comment) => comment.user.id === user?.id)
                      ?.id || 0
                  )
                }
                disabled={answer.length === 0}
                type="primary"
              >
                {isEditMode ? '수정' : '제출'}
              </Button>
            </div>
          )}
          {isAnswerSubmitted && (
            <div className="quiz-item-solution-container">
              <div>
                <div className="quiz-item-title-label">{'내 답안'}</div>
                <div className="quiz-item-my-answer-wrapper">
                  <pre className="quiz-item-solution">
                    {myAnswer?.content && parse(myAnswer.content)}
                  </pre>
                  <div className="quiz-item-my-answer-button-wrapper">
                    <Button onClick={onClickEditMyAnswerButton}>수정</Button>
                    <Button danger onClick={onClickDeleteMyAnswerButton}>
                      삭제
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <div className="quiz-item-title-label">{'정답'}</div>
                <pre className="quiz-item-solution">
                  {parse(quiz.question.solution)}
                </pre>
                {quiz.question.solution_img &&
                  quiz.question.solution_img.length > 0 && (
                    <Image
                      className="quiz-item-image"
                      src={quiz.question.solution_img[0].url}
                      alt="문제이미지"
                    />
                  )}
              </div>
              <div>
                <div className="quiz-item-title-label">
                  {'제출된 답안 리스트'}
                </div>
                <QuizComment comments={answersWithoutMyAnswer} />
              </div>
            </div>
          )}
        </QuizItemBlock>
      </Collapse.Panel>
    </Collapse>
  );
};

export default QuizItem;
