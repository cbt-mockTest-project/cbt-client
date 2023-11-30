import React, { useState } from 'react';
import styled from 'styled-components';
import { MockExamCategory } from 'types';
import ExamListItem from './ExamListItem';

const ExamListBlock = styled.ul`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

interface ExamListProps {
  category: MockExamCategory;
  selectedExamIds: number[];
  setSelectedExamIds: (selectedStudyNoteIds: number[]) => void;
}

const ExamList: React.FC<ExamListProps> = ({
  category,
  selectedExamIds,
  setSelectedExamIds,
}) => {
  return (
    <ExamListBlock>
      {category?.mockExam.map((exam) => (
        <ExamListItem
          key={exam.id}
          exam={exam}
          selectedExamIds={selectedExamIds}
          setSelectedExamIds={setSelectedExamIds}
        />
      ))}
    </ExamListBlock>
  );
};

export default ExamList;
