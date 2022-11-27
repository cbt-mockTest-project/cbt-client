import BasicBox from '@components/common/box/BasicBox';
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
  label?: string;
}

const QuestionAndSolutionBox: React.FC<QuestionAndSolutionBoxProps> = ({
  content,
  visible = true,
  label,
}) => {
  const router = useRouter();
  if (!visible) return null;
  return (
    <QuestionAndSolutionBoxContainer>
      <BasicBox minHeight={72} label={label} className="exam-solution-box">
        {content.title && (
          <p className="question-and-solution-box-title">{content.title}</p>
        )}
        <pre>{content.content}</pre>
        {content.img &&
          content.img.map((el, index) => (
            <a
              key={index}
              href={el.url}
              target="_blank"
              rel="noreferrer"
            >{`이미지${String(index).padStart(2, '0')}`}</a>
          ))}
      </BasicBox>
    </QuestionAndSolutionBoxContainer>
  );
};

export default QuestionAndSolutionBox;

const QuestionAndSolutionBoxContainer = styled.div`
  .question-and-solution-box-title {
    margin-bottom: 10px;
    font-weight: 600;
  }
`;
