import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import palette from '@styles/palette';
import { useAppSelector } from '@modules/redux/store/configureStore';

const blinkAnimation = keyframes`
  50% {
    opacity: 0;
  }
`;

const ExamCreateSavedTimeBlock = styled.div`
  font-size: 12px;
  color: ${palette.colorSubText};
  transition: all 0.3s;
  &.blink {
    animation: ${blinkAnimation} 0.3s forwards;
  }
`;

interface ExamCreateSavedTimeProps {}

const ExamCreateSavedTime: React.FC<ExamCreateSavedTimeProps> = () => {
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
    <ExamCreateSavedTimeBlock className={isBlinking ? 'blink' : ''}>
      {savedTime} 저장됨
    </ExamCreateSavedTimeBlock>
  );
};

export default React.memo(ExamCreateSavedTime);
