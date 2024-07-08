import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import palette from '../../../_styles/palette';
import { useAppSelector } from '../../../_modules/redux/store/configureStore';
import { responsive } from '../../../_lib/utils/responsive';

const blinkAnimation = keyframes`
  50% {
    opacity: 0;
  }
`;

const ExamCreateSavedTimeBlock = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.color('colorTextSecondary')};
  transition: all 0.3s;
  position: absolute;
  right: 100px;
  &.blink {
    animation: ${blinkAnimation} 0.3s forwards;
  }
  @media (max-width: ${responsive.lsmall}) {
    display: none;
  }
`;

interface ExamCreateSavedTimeProps {
  className?: string;
}

const ExamCreateSavedTime: React.FC<ExamCreateSavedTimeProps> = ({
  className = 'exam-create-saved-time',
}) => {
  const savedTime = useAppSelector((state) => state.examCreate.savedTime);
  const [isBlinking, setBlinking] = useState(false);
  const savedTimeRef = useRef(savedTime);

  useEffect(() => {
    if (savedTime !== savedTimeRef.current) {
      setBlinking(true);
      savedTimeRef.current = savedTime;
      setTimeout(() => setBlinking(false), 500);
    }
  }, [savedTime]);

  if (!savedTime) return null;

  return (
    <ExamCreateSavedTimeBlock
      className={className + ' ' + isBlinking ? 'blink' : ''}
    >
      {savedTime} 저장됨
    </ExamCreateSavedTimeBlock>
  );
};

export default React.memo(ExamCreateSavedTime);
