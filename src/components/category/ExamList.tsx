import React, { useState } from 'react';
import styled from 'styled-components';
import { MockExamCategory } from 'types';
import ExamListItem from './ExamListItem';
import useExamSetting from '@lib/hooks/useExamSetting';
import useExamCategory from '@lib/hooks/useExamCategory';

const ExamListBlock = styled.ul`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

interface ExamListProps {}

const ExamList: React.FC<ExamListProps> = () => {
  const { category } = useExamCategory();
  const { examSetting, handleExamSelect } = useExamSetting({
    categoryId: category.id,
    exams: category.mockExam,
  });
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
