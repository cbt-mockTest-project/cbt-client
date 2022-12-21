import { ReadMockExamQuestionsByStateQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { convertStateToIcon } from '@lib/utils/utils';
import palette from '@styles/palette';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

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
      <ul>
        {readMockExamQuestionsByState.mockExamQusetions.map((el, index) => (
          <li key={index}>
            <div className="selected-result-question-label-achievement-icon-wrapper">
              <div
                className={`selected-result-question-label-achievement-icon ${el.state[0].state}`}
              >
                {convertStateToIcon(el.state[0].state)}
              </div>
            </div>
            <pre className="selected-result-question">
              {`Q${el.number}. ${el.question}`}
              {el.question_img &&
                el.question_img.map((el, index) => (
                  <a
                    className="selected-result-image-link"
                    key={index}
                    href={el.url}
                    target="_blank"
                    rel="noreferrer"
                  >{`이미지${String(index + 1).padStart(2, '0')}`}</a>
                ))}
            </pre>

            <pre className="selected-result-solution">{el.solution}</pre>
            <div>
              {el.solution_img &&
                el.solution_img.map((el, index) => (
                  <a
                    className="selected-result-image-link"
                    key={index}
                    href={el.url}
                    target="_blank"
                    rel="noreferrer"
                  >{`이미지${String(index + 1).padStart(2, '0')}`}</a>
                ))}
            </div>
          </li>
        ))}
      </ul>
    </SelectedResultComponentContainer>
  );
};

export default SelectedResultComponent;

const SelectedResultComponentContainer = styled.div`
  margin: 50px 0 50px 0;
  h1 {
    padding: 0px 20px 20px 20px;
    font-size: 1.5rem;
  }
  .selected-result-question {
    padding: 20px;
    border-radius: 5px;
    border-top-left-radius: 0px;
    background-color: ${palette.gray_100};
  }
  .selected-result-solution {
    margin: 20px 0 20px 20px;
  }
  .selected-result-image-link {
    margin-left: 20px;
    color: ${palette.antd_blue_01};
  }
  .selected-result-report-button {
    margin-top: 20px;
  }
  .selected-result-question-label-achievement-icon {
    width: 15px;
    height: 15px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10px;
    color: ${palette.antd_blue_02};
  }
  .selected-result-question-label-achievement-icon-wrapper {
    position: relative;
    width: 40px;
    height: 30px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: ${palette.gray_100};
    margin-top: 20px;
  }
`;
