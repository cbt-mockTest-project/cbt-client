import useQuestions from '@lib/hooks/useQuestions';
import { responsive } from '@lib/utils/responsive';
import { Button } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

const ExamHistoryTabBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

interface ExamHistoryTabProps {}

const ExamHistoryTab: React.FC<ExamHistoryTabProps> = () => {
  return <ExamHistoryTabBlock></ExamHistoryTabBlock>;
};

export default ExamHistoryTab;
