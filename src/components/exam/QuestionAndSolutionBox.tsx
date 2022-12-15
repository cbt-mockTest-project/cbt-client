import BasicBox from '@components/common/box/BasicBox';
import palette from '@styles/palette';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

interface Content {
  content?: string;
  img?:
    | {
        __typename?: 'MockExamImageType' | undefined;
        url: string;
      }[]
    | null;
  title?: string;
}

interface QuestionAndSolutionBoxProps {
  content: Content;
  visible?: boolean;
  label?: string | JSX.Element;
}

const QuestionAndSolutionBox: React.FC<QuestionAndSolutionBoxProps> = ({
  content,
  visible = true,
  label,
}) => {
  if (!visible) return null;
  return (
    <QuestionAndSolutionBoxContainer>
      <BasicBox minHeight={72} label={label} className="exam-solution-box">
        {content.title && (
          <p className="question-and-solution-box-title">{content.title}</p>
        )}
        <pre>{content.content}</pre>
        <div className="question-and-solution-box-link-wrapper">
          {content.img &&
            content.img.map((el, index) => (
              <a
                key={index}
                href={el.url}
                target="_blank"
                rel="noreferrer"
              >{`이미지${String(index + 1).padStart(2, '0')}`}</a>
            ))}
        </div>
      </BasicBox>
    </QuestionAndSolutionBoxContainer>
  );
};

export default QuestionAndSolutionBox;

const QuestionAndSolutionBoxContainer = styled.div`
  pre {
    white-space: pre-wrap;
  }
  .question-and-solution-box-title {
    margin-bottom: 10px;
    font-weight: 600;
  }
  .question-and-solution-box-link-wrapper {
    margin-top: 20px;
    a {
      color: ${palette.antd_blue_01};
      + a {
        margin-left: 15px;
      }
    }
  }
`;
