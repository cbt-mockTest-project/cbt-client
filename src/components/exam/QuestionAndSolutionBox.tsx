import BasicBox from '@components/common/box/BasicBox';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Image } from 'antd';
import { QuestionType } from 'customTypes';
import dynamic from 'next/dynamic';
import React from 'react';
import styled, { css } from 'styled-components';
import ExamSolutionFeedback from './solution/ExamSolutionFeedback';
import { ExamQuestionType } from './solution/ExamSolutionList';

const GoogleAd = dynamic(() => import('@components/common/ad/GoogleAd'), {
  ssr: false,
});
export interface QuestionAndSolutionContent {
  content?: string;
  img?: QuestionType['question_img'];
  title?: string;
}

interface QuestionAndSolutionBoxProps {
  content: QuestionAndSolutionContent;
  question?: ExamQuestionType;
  visible?: boolean;
  label?: string | JSX.Element;
  feedback?: boolean;
  refetch?: ({ ...args }: any) => any;
}

const QuestionAndSolutionBox: React.FC<QuestionAndSolutionBoxProps> = ({
  content,
  visible = true,
  label,
  feedback,
  question,
  refetch,
}) => {
  if (!visible) return null;
  const hasImage = content.img && content.img.length >= 1;
  return (
    <QuestionAndSolutionBoxContainer hasImage={hasImage ? 'true' : 'false'}>
      <BasicBox minHeight={72} className="question-and-solution-box">
        <p>{content.content}</p>
        {feedback && question && (
          <ExamSolutionFeedback question={question} refetch={refetch} />
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

interface QuestionAndSolutionBoxContainerProps {
  hasImage: string;
}

const QuestionAndSolutionBoxContainer = styled.div<QuestionAndSolutionBoxContainerProps>`
  display: flex;
  gap: 20px;
  pre,
  p {
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
    flex: 5;
  }
  .question-and-solution-image-box {
    height: 100%;
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
  ${(props) =>
    props.hasImage === 'false' &&
    css`
      flex-direction: column;
    `}
  @media (max-width: ${responsive.medium}) {
    flex-direction: column;
    pre {
      font-size: 0.9rem;
    }
  }
`;
