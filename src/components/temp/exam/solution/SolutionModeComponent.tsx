import { Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { MockExamQuestion, ReadQuestionsByExamIdsInput } from 'types';
import SolutionModeCardItem from './SolutionModeCardItem';
import { useReadQuestionsByExamIds } from '@lib/graphql/user/hook/useExamQuestion';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { useDispatch } from 'react-redux';
import palette from '@styles/palette';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { mockExamActions } from '@modules/redux/slices/mockExam';
import SolutionModeHeader from './SolutionModeHeader';
import { responsive } from '@lib/utils/responsive';

const SolutionModeComponentBlock = styled.div`
  background-color: ${palette.gray_100};
  .solution-mode-body {
    max-width: 1280px;
    margin: 0 auto;
    padding: 20px;
  }
  .solution-mode-solution-card-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .solution-mode-all-hide-toggle-button {
    margin-bottom: 15px;
  }
  .solution-mode-all-hide-toggle-button-inner {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
  }
  @media (max-width: ${responsive.medium}) {
    .solution-mode-body {
      padding: 10px;
    }
  }
`;

interface SolutionModeComponentProps {
  questionsQueryInput: ReadQuestionsByExamIdsInput;
}

const SolutionModeComponent: React.FC<SolutionModeComponentProps> = ({
  questionsQueryInput,
}) => {
  const { data: meQuery } = useMeQuery();
  const questions = useAppSelector((state) => state.mockExam.questions);
  const dispatch = useDispatch();
  const { refetch } = useReadQuestionsByExamIds(questionsQueryInput);

  useEffect(() => {
    if (!meQuery?.me.user) return;
    refetch({
      input: questionsQueryInput,
    }).then((res) => {
      if (res.data?.readQuestionsByExamIds.questions) {
        dispatch(
          mockExamActions.setQuestions(
            res.data.readQuestionsByExamIds.questions as MockExamQuestion[]
          )
        );
      }
    });
  }, [meQuery]);

  const [isAnswerAllHidden, setIsAnswerAllHidden] = useState(false);

  return (
    <SolutionModeComponentBlock>
      <SolutionModeHeader title={questions[0].mockExam?.title || ''} />
      <div className="solution-mode-body">
        <Button
          className="solution-mode-all-hide-toggle-button"
          onClick={() => setIsAnswerAllHidden(!isAnswerAllHidden)}
        >
          {isAnswerAllHidden ? (
            <div className="solution-mode-all-hide-toggle-button-inner">
              <VisibilityOffIcon />
              <span>정답 모두 보이기</span>
            </div>
          ) : (
            <div className="solution-mode-all-hide-toggle-button-inner">
              <RemoveRedEyeIcon />
              <span>정답 모두 가리기</span>
            </div>
          )}
        </Button>
        <ul className="solution-mode-solution-card-list">
          {questions!.map((question, index) => (
            <SolutionModeCardItem
              key={question.id}
              question={question as MockExamQuestion}
              isAnswerAllHidden={isAnswerAllHidden}
              index={index}
            />
          ))}
        </ul>
      </div>
    </SolutionModeComponentBlock>
  );
};

export default SolutionModeComponent;
