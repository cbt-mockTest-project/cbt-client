import { Button } from 'antd';
import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
const slideUpAnimation = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;
const ExamListContentViewMoreBlock = styled.div`
  .view-mode {
    animation-delay: 1s;
    animation: ${slideUpAnimation} 0.3s ease-out;
    > div {
      margin-bottom: 15px;
    }
  }
`;

const StyledButton = styled(Button)<{ isViewMode: boolean }>`
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  width: 100%;
  height: 50px;
  ${(props) =>
    props.isViewMode &&
    css`
      opacity: 0;
      visibility: hidden;
    `};
`;

interface ExamListContentViewMoreProps {
  renderExamItem: (
    exam: any,
    index: number,
    isMyCategory: boolean
  ) => React.ReactNode;
  categoryExams: any;
  isMyCategory: boolean;
}

const ExamListContentViewMore: React.FC<ExamListContentViewMoreProps> = ({
  renderExamItem,
  categoryExams,
  isMyCategory,
}) => {
  const [isViewMode, setIsViewMode] = useState(false);
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  return (
    <>
      <ExamListContentViewMoreBlock>
        {isAnimationStarted ? (
          <div className="view-mode">
            {categoryExams
              .slice(10)
              .map((exam, index) => renderExamItem(exam, index, isMyCategory))}
          </div>
        ) : (
          <StyledButton
            size="large"
            type="primary"
            onClick={() => {
              setIsViewMode(true);
              setTimeout(() => {
                setIsAnimationStarted(true);
              }, 200);
            }}
            isViewMode={isViewMode}
          >
            더보기
          </StyledButton>
        )}
      </ExamListContentViewMoreBlock>
    </>
  );
};

export default ExamListContentViewMore;
