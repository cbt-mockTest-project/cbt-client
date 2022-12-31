import BasicBox from '@components/common/box/BasicBox';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Image } from 'antd';
import { QuestionType } from 'customTypes';
import React from 'react';
import styled from 'styled-components';
interface Content {
  content?: string;
  img?: QuestionType['question_img'];
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
  const hasImage = content.img && content.img.length >= 1;
  return (
    <QuestionAndSolutionBoxContainer>
      <BasicBox minHeight={72} className="question-and-solution-box">
        <pre>{content.content}</pre>
        {content.img && content.img.length >= 1 && (
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
        )}
      </BasicBox>
      {content.img && content.img.length >= 1 && (
        <BasicBox minHeight={72} className="question-and-solution-image-box">
          <div className="question-and-solution-box-question-image-wrapper">
            <Image
              src={content.img[0].url}
              className="question-and-solution-box-question-image"
              alt={content.img[0].url}
            />
          </div>
        </BasicBox>
      )}
    </QuestionAndSolutionBoxContainer>
  );
};

export default QuestionAndSolutionBox;

const QuestionAndSolutionBoxContainer = styled.div`
  display: flex;
  gap: 20px;
  pre {
    white-space: pre-wrap;
  }
  .question-and-solution-box-title {
    margin-bottom: 10px;
    font-weight: 600;
  }
  .question-and-solution-box-question-image-wrapper {
    text-align: center;
  }
  .question-and-solution-box-question-image {
    position: relative;
    height: auto;
    max-height: 220px;
  }
  .question-and-solution-box {
    flex: 4;
  }
  .question-and-solution-image-box {
    flex: 6;
  }
  .question-and-solution-box-link-wrapper {
    display: none;
    margin-top: 20px;
    a {
      color: ${palette.antd_blue_01};
      + a {
        margin-left: 15px;
      }
    }
  }
  @media (max-width: ${responsive.medium}) {
    .question-and-solution-image-box {
      display: none;
    }
    .question-and-solution-box-link-wrapper {
      display: block;
    }
  }
`;
