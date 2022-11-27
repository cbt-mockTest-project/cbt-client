import { CaretDownOutlined } from '@ant-design/icons';
import MainBanner from '@components/banner/MainBanner';
import Label from '@components/common/label/Label';
import ConfirmModal from '@components/common/modal/ConfirmModal';
import { useReadQuestionsByExamId } from '@lib/graphql/user/hook/useExamQuestion';
import palette from '@styles/palette';
import { Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { QuestionType } from 'customTypes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import AchievementCheck from './AchievementCheck';
import MoveQuestion from './MoveQuestion';
import QuestionAndSolutionBox from './QuestionAndSolutionBox';

const ExamComponent = () => {
  const router = useRouter();
  const [answerboxVisible, setAnswerboxVisible] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [questionState, setQuestionState] = useState('core');
  const [questionAndSolution, setQuestionAndSolution] =
    useState<QuestionType>(null);
  const [modalState, setModalState] = useState(false);
  const questionIndex = Number(router.query.q);
  const [readQuestions, { data: questionQueryData }] =
    useReadQuestionsByExamId();

  useEffect(() => {
    if (router.query.e) {
      readQuestions({
        variables: { input: { id: Number(router.query.e) } },
      });
    }
  }, [router.query.e]);
  useEffect(() => {
    if (questionQueryData) {
      const {
        readMockExamQuestionsByMockExamId: { count, questions },
      } = questionQueryData;

      if (questionCount === 0) {
        setQuestionCount(count);
      }
      setQuestionAndSolution(() => ({
        question: questions[questionIndex - 1].question,
        number: questions[questionIndex - 1].number,
        question_img: questions[questionIndex - 1].question_img,
        solution: questions[questionIndex - 1].solution,
        solution_img: questions[questionIndex - 1].solution_img,
      }));
      const currentQuestionState =
        questions[questionIndex - 1].state.length >= 1
          ? questions[questionIndex - 1].state[0].state
          : 'core';
      setQuestionState(currentQuestionState);
      setAnswerboxVisible(false);
    }
  }, [questionQueryData, router.query.q]);

  const onToggleAnswerboxVisible = () => setAnswerboxVisible(!answerboxVisible);
  const onToggleModal = () => setModalState(!modalState);
  const onConfirmModal = () => {
    setModalState(false);
    router.push('/exam/result');
  };

  return (
    <>
      <ExamContainer answerboxVisible={answerboxVisible}>
        <MainBanner />
        <QuestionAndSolutionBox
          label="문제"
          content={{
            content: `${questionAndSolution?.number}. ${questionAndSolution?.question}`,
            img: questionAndSolution?.question_img,
            title: String(router.query.t || ''),
          }}
        />
        <Label content="답 작성" />
        <TextArea autoSize={{ minRows: 3, maxRows: 8 }} />
        <button
          className="exam-solution-check-wrapper"
          onClick={onToggleAnswerboxVisible}
        >
          <Label content="답 확인" className="exam-solution-check-label" />
          <CaretDownOutlined className="exam-answer-visible-button" />
        </button>
        <QuestionAndSolutionBox
          content={{
            content: questionAndSolution?.solution,
            img: questionAndSolution?.solution_img,
          }}
          visible={answerboxVisible}
        />

        <div className="exam-question-menubar-wrapper">
          <Button
            type="primary"
            className="exam-question-menubar-report-button"
          >
            잘못된 문제 신고
          </Button>
          <div className="exam-question-menubar">
            <AchievementCheck
              questionIndex={questionIndex}
              questionQueryData={questionQueryData}
              setQuestionState={setQuestionState}
              questionState={questionState}
            />
            <MoveQuestion
              questionIndex={questionIndex}
              questionCount={questionCount}
              setModalState={setModalState}
            />
          </div>
        </div>
      </ExamContainer>
      <ConfirmModal
        open={modalState}
        content={['마지막 문제입니다.', '결과를 확인하시겠습니까?']}
        onClose={onToggleModal}
        onCancel={onToggleModal}
        onConfirm={onConfirmModal}
      />
    </>
  );
};

export default ExamComponent;

const ExamContainer = styled.div<{ answerboxVisible: boolean }>`
  display: flex;
  flex-direction: column;
  .exam-answer-visible-button {
    transition: transform 0.3s linear;
    ${(props) =>
      props.answerboxVisible &&
      css`
        transform: rotate(-180deg);
      `}
  }

  .exam-question-menubar-wrapper {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
    align-items: center;
  }
  .exam-question-menubar {
    display: flex;
    align-items: center;
    font-weight: 600;
    color: ${palette.gray_700};
  }

  .exam-question-move-button-label {
    margin-left: 40px;
    margin-right: 5px;
  }
  .exam-question-move-button {
    position: relative;
    top: 2px;
    transition: all 0.2s ease-in;
    svg {
      width: 25px;
      height: 25px;
    }
    :hover {
      color: ${palette.antd_blue_02};
    }
  }
  .exam-solution-check-wrapper {
    display: flex;
    align-items: center;
    margin: 15px 0 2px 0;
  }
  .exam-solution-check-label {
    margin: 0;
  }

  pre {
    white-space: pre-wrap;
  }
`;
