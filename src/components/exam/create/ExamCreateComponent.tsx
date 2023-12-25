import React from 'react';
import styled from 'styled-components';
import ExamCreateHeader from './ExamCreateHeader';
import palette from '@styles/palette';

const ExamCreateComponentBlock = styled.div`
  background-color: ${palette.colorContainerBg};
  width: 100%;
  top: 0;
  position: sticky;
  z-index: 10;
  border-bottom: 1px solid ${palette.colorBorder};
`;

interface ExamCreateComponentProps {}

const ExamCreateComponent: React.FC<ExamCreateComponentProps> = () => {
  return (
    <ExamCreateComponentBlock>
      <ExamCreateHeader />
    </ExamCreateComponentBlock>
  );
};

export default ExamCreateComponent;
