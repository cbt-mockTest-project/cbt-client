import { QueryResult } from '@apollo/client';
import { ReadMockExamQuestionsByStateQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { convertStateToIcon } from '@lib/utils/utils';
import palette from '@styles/palette';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import QuestionAndSolutionBox from '../QuestionAndSolutionBox';

interface SelectedResultComponentProps {
  questionsQuery: ReadMockExamQuestionsByStateQuery;
}

const SelectedResultComponent: React.FC<SelectedResultComponentProps> = ({
  questionsQuery,
}) => {
  const router = useRouter();
  const { readMockExamQuestionsByState } = questionsQuery;
  return (
    <SelectedResultComponentContainer>
      <h1>{router.query.title}</h1>
      {readMockExamQuestionsByState.mockExamQusetions.map((question, index) => {
        return (
          <div
            key={index}
            className="selected-result-question-and-solution-wrapper"
          >
            <QuestionAndSolutionBox
              label={
                <div className="selected-result-question-label-wrapper">
                  <p>문제</p>
                  <div
                    className={`selected-result-question-label-achievement-icon ${question.state[0].state}`}
                  >
                    {convertStateToIcon(question.state[0].state)}
                  </div>
                </div>
              }
              content={{
                content: `${question?.number}. ${question?.question}`,
                img: question?.question_img,
                title: String(router.query.t || ''),
              }}
            />
            <QuestionAndSolutionBox
              key={index}
              label="정답"
              content={{
                content: `${question?.solution}`,
                img: question?.solution_img,
                title: String(router.query.t || ''),
              }}
            />
          </div>
        );
      })}
    </SelectedResultComponentContainer>
  );
};

export default SelectedResultComponent;

const SelectedResultComponentContainer = styled.div`
  margin-top: 30px;
  h1 {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .selected-result-question-and-solution-wrapper {
    padding-bottom: 40px;
    border-bottom: 1px dashed ${palette.gray_300};
    + div {
      margin-top: 40px;
    }
  }
  .selected-result-question-label-wrapper {
    display: flex;
    gap: 10px;
    .MIDDLE {
      position: relative;
      top: 2px;
    }
  }
  .selected-result-question-label-achievement-icon {
    width: 15px;
    height: 15px;
    position: relative;
    /* bottom: 5px; */
    color: ${palette.antd_blue_02};
  }
`;
