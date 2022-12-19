import { CaretDownOutlined } from '@ant-design/icons';
import Label from '@components/common/label/Label';
import ConfirmModal from '@components/common/modal/ConfirmModal';
import ProgressModal from '@components/common/modal/ProgressModal';
import ReportModal from '@components/common/modal/ReportModal';
import { tempAnswerKey } from '@lib/constants';
import { useCreateFeedBack } from '@lib/graphql/user/hook/useFeedBack';
import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { LocalStorage } from '@lib/utils/localStorage';
import palette from '@styles/palette';
import { Button, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { QuestionType } from 'customTypes';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRef } from 'react';
import styled, { css } from 'styled-components';
import { QuestionState } from 'types';
import AchievementCheck from './AchievementCheck';
import MoveQuestion from './MoveQuestion';
import QuestionAndSolutionBox from './QuestionAndSolutionBox';

interface ExamComponentProps {
  questionsQuery: ReadMockExamQuestionsByMockExamIdQuery;
}

const ExamComponent: React.FC<ExamComponentProps> = ({ questionsQuery }) => {
  const {
    readMockExamQuestionsByMockExamId: { questions },
  } = questionsQuery;
  const router = useRouter();
  const storage = new LocalStorage();
  const examTitle = router.query.t;
  const questionIndex = Number(router.query.q);
  const tempAnswerIndex = String(examTitle) + questionIndex;
  const reportValue = useRef('');
  const [answerboxVisible, setAnswerboxVisible] = useState(false);
  const [answerValue, setAnswerValue] = useState('');
  const [questionState, setQuestionState] = useState<QuestionState>(
    QuestionState.Core
  );
  const [questionAndSolution, setQuestionAndSolution] =
    useState<QuestionType | null>(null);
  const [finishModalState, setFinishModalState] = useState(false);
  const [feedBackModalState, setFeedBackModalState] = useState(false);
  const [progressModalState, setProgressModalState] = useState(false);
  const [createFeedBack] = useCreateFeedBack();
  useEffect(() => {
    const currentAnswer = storage.get(tempAnswerKey)[tempAnswerIndex] || '';
    const currentQuestionState =
      questions[questionIndex - 1].state.length >= 1
        ? questions[questionIndex - 1].state[0].state
        : QuestionState.Core;
    /**
     * 문제번호가 바뀔 때 마다 데이터를 초기화해준다.
     */
    setAnswerValue(currentAnswer);
    setQuestionState(currentQuestionState);
    setProgressModalState(false);
    setFeedBackModalState(false);
    setFinishModalState(false);
    setAnswerboxVisible(false);
    setQuestionAndSolution({
      question: questions[questionIndex - 1].question,
      number: questions[questionIndex - 1].number,
      question_img: questions[questionIndex - 1].question_img,
      solution: questions[questionIndex - 1].solution,
      solution_img: questions[questionIndex - 1].solution_img,
      id: questions[questionIndex - 1].id,
      state: questions[questionIndex - 1].state,
    });
  }, [router.query.q]);

  const onToggleAnswerboxVisible = () => setAnswerboxVisible(!answerboxVisible);
  const onToggleFinishModal = () => setFinishModalState(!finishModalState);
  const onToggleFeedBackModal = () =>
    setFeedBackModalState(!feedBackModalState);
  const onFinishConfirmModal = () => {
    storage.remove(tempAnswerKey);
    setFinishModalState(false);
    router.push({
      pathname: '/exam/result',
      query: { title: String(examTitle || ''), e: router.query.e },
    });
  };
  const onReport = async () => {
    try {
      const content = reportValue.current;
      if (content.length <= 4) {
        return message.warn('5글자 이상 입력해주세요.');
      }
      if (questionAndSolution && content) {
        const questionId = questionAndSolution.id;
        await createFeedBack({
          variables: { input: { content, questionId } },
        });
        message.success('신고가 접수되었습니다.');
        setFeedBackModalState(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeAnswer = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const currentValue = e.target.value;
    setAnswerValue(currentValue);
    const prevAnswer = storage.get(tempAnswerKey) || {};
    const tempAnswer: { [key: string]: string } = prevAnswer;
    tempAnswer[tempAnswerIndex] = currentValue;
    storage.set(tempAnswerKey, tempAnswer);
  };

  return (
    <>
      <ExamContainer answerboxVisible={answerboxVisible}>
        <QuestionAndSolutionBox
          label="문제"
          content={{
            content: questionAndSolution
              ? `${questionIndex}. ${questionAndSolution.question}`
              : '',
            img: questionAndSolution?.question_img,
            title: String(examTitle || ''),
          }}
        />
        <Label content="답 작성" />
        <TextArea
          autoSize={{ minRows: 3, maxRows: 8 }}
          value={answerValue}
          onChange={onChangeAnswer}
        />
        <button
          className="exam-solution-check-wrapper"
          onClick={onToggleAnswerboxVisible}
        >
          <Label content="답 확인" className="exam-solution-check-label" />
          <CaretDownOutlined className="exam-answer-visible-button" />
        </button>
        <QuestionAndSolutionBox
          content={{
            content: questionAndSolution ? questionAndSolution.solution : '',
            img: questionAndSolution && questionAndSolution.solution_img,
          }}
          visible={answerboxVisible}
        />

        <div className="exam-question-menubar-wrapper">
          <div className="exam-question-menubar-modal-button-wrapper">
            <Button
              type="primary"
              className="exam-question-menubar-report-button"
              onClick={onToggleFeedBackModal}
            >
              잘못된 문제 신고
            </Button>
            <Button
              type="primary"
              className="exam-question-menubar-check-button"
              onClick={() => setProgressModalState(true)}
            >
              진도 확인
            </Button>
          </div>
          <div className="exam-question-menubar" id="exam-question-menubar">
            <AchievementCheck
              questionIndex={questionIndex}
              questionsQuery={questionsQuery}
              setQuestionState={setQuestionState}
              questionState={questionState}
            />
            <MoveQuestion
              questionIndex={questionIndex}
              questionCount={
                questionsQuery.readMockExamQuestionsByMockExamId.count
              }
              setModalState={setFinishModalState}
            />
          </div>
        </div>
      </ExamContainer>
      <ConfirmModal
        open={finishModalState}
        content={['마지막 문제입니다.', '학습을 종료하시겠습니까?']}
        onClose={onToggleFinishModal}
        onCancel={onToggleFinishModal}
        onConfirm={onFinishConfirmModal}
        confirmLabel="종료하기"
      />
      <ReportModal
        open={feedBackModalState}
        content={String(examTitle)}
        onClose={onToggleFeedBackModal}
        onCancel={onToggleFeedBackModal}
        onConfirm={onReport}
        onChange={(value) => {
          reportValue.current = value;
        }}
        confirmLabel="신고하기"
        title={[String(examTitle), String(questionIndex) + '번 문제']}
      />
      <ProgressModal
        open={progressModalState}
        onClose={() => setProgressModalState(false)}
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
  .exam-question-menubar-modal-button-wrapper {
    button {
      + button {
        margin-left: 15px;
      }
    }
  }
  .exam-question-solution-label-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  pre {
    white-space: pre-wrap;
  }
`;
