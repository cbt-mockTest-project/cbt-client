import { ReadMockExamQuestionsByStateQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { responsive } from '@lib/utils/responsive';
import { convertStateToIcon } from '@lib/utils/utils';
import palette from '@styles/palette';
import { Image } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import EditorStyle from '@styles/editorStyle';

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
      <h3 className="selected-result-page-title">{router.query.title}</h3>
      <ul>
        {readMockExamQuestionsByState.mockExamQusetions.map((state, index) => {
          return (
            <li key={index}>
              <div className="selected-result-question-top-wrapper">
                <div className="selected-result-question-label-achievement-icon-wrapper">
                  <div
                    className={`selected-result-question-label-achievement-icon ${state.state}`}
                  >
                    {convertStateToIcon(state.state)}
                  </div>
                </div>
                <p className="selected-result-page-sub-title">{`${state.exam.title}  ${state.question.number}번 문제`}</p>
              </div>
              <div className="selected-result-page-question-wrapper">
                <div className="selected-result-page-question-pre-wrapper">
                  <pre className="selected-result-page-question">
                    {parse(
                      `Q${state.question.number}. ${state.question.question}`
                    )}
                  </pre>
                </div>
                {state.question.question_img &&
                  state.question.question_img.length >= 1 && (
                    <div className="selected-result-page-question-image-wrapper">
                      <Image
                        src={state.question.question_img[0].url}
                        alt="question_image"
                        className="selected-result-page-question-image"
                      />
                    </div>
                  )}
              </div>
              <div className="selected-result-page-question-wrapper">
                <div className="selected-result-page-solution-pre-wrapper">
                  <pre className={`selected-result-page-question`}>
                    <b>[solution]</b>
                    <br />
                    <br />
                    {parse(`${state.question.solution}`)}
                  </pre>
                </div>
                {state.question.solution_img &&
                  state.question.solution_img.length >= 1 && (
                    <div
                      className={`selected-result-page-question-image-wrapper`}
                    >
                      <Image
                        src={state.question.solution_img[0].url}
                        alt="question_image"
                        className="selected-result-page-question-image"
                      />
                    </div>
                  )}
              </div>
            </li>
          );
        })}
      </ul>
    </SelectedResultComponentContainer>
  );
};

export default SelectedResultComponent;

const SelectedResultComponentContainer = styled.div`
  margin: 30px 0 100px 0;
  .selected-result-question-label-achievement-icon {
    svg {
      width: 100% !important;
    }

    color: ${palette.antd_blue_02};
  }
  .selected-result-question-top-wrapper {
    display: flex;
    top: 25px;
    position: relative;
    gap: 10px;
  }
  .selected-result-question-label-achievement-icon-wrapper {
    width: 40px;
    height: 30px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: ${palette.gray_100};
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .selected-result-page-title {
    font-size: 1.2rem;
  }
  .selected-result-page-sub-title {
    font-size: 0.8rem;
    color: ${palette.gray_700};
  }
  .selected-result-page-question-solution-header {
    display: flex;
    justify-content: space-between;
  }
  .selected-result-page-solution {
    white-space: pre-wrap;
    margin: 20px 0 20px 20px;
  }

  .selected-result-page-question {
    white-space: pre-wrap;
    ${EditorStyle}
    b {
      font-size: 1.1.rem;
      font-weight: bold;
    }
  }
  .selected-result-page-question-pre-wrapper {
    background-color: ${palette.gray_100};
    border-radius: 5px;
    border-top-left-radius: 0;
    padding: 20px;
    flex: 4;
  }
  .selected-result-page-solution-pre-wrapper {
    position: relative;
    border-radius: 5px;
    border-top-left-radius: 0;
    border: 1px solid ${palette.gray_400};
    padding: 20px;
    flex: 4;
  }
  .selected-result-page-question-image-wrapper {
    flex: 6;
    text-align: center;
    border: 1px solid ${palette.gray_400};
  }
  .selected-result-page-question-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .selected-result-page-question-wrapper {
    display: flex;
    position: relative;
    margin-top: 25px;
    gap: 20px;
  }

  @media (max-width: ${responsive.medium}) {
    .selected-result-page-question-wrapper {
      flex-direction: column;
      gap: 0px;
    }

    .selected-result-page-question-image-wrapper {
      border: none;
      border-bottom: 1px solid ${palette.gray_400};
    }
    pre {
      font-size: 0.9rem;
    }
  }
`;
