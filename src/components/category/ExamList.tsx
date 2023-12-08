import React, { useState } from 'react';
import styled from 'styled-components';
import { MockExamCategory } from 'types';
import ExamListItem from './ExamListItem';
import useExamSetting from '@lib/hooks/useExamSetting';

const ExamListBlock = styled.ul`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

interface ExamListProps {
  category: MockExamCategory;
  handleExamSelect: (examId: number) => void;
}

const ExamList: React.FC<ExamListProps> = ({ category, handleExamSelect }) => {
  const { examSetting } = useExamSetting({ category });
  return (
    <ExamListBlock>
      {category?.mockExam.map((exam) => (
        <ExamListItem
          key={exam.id}
          exam={exam}
          examSetting={examSetting}
          handleExamSelect={handleExamSelect}
        />
      ))}
    </ExamListBlock>
  );
};

export default ExamList;
