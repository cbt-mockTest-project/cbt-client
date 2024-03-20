import useExamSetting from '@lib/hooks/useExamSetting';
import useMyAllExams from '@lib/hooks/useMyAllExams';
import React from 'react';
import styled from 'styled-components';
import { MyExamType } from './AllExamsComponent';
import AllExamListItem from './AllExamListItem';

const AllExamListBlock = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

interface AllExamListProps {
  examType: MyExamType;
}

const AllExamList: React.FC<AllExamListProps> = ({ examType }) => {
  const { exams } = useMyAllExams();
  return (
    <AllExamListBlock>
      {exams.map((exam) => (
        <AllExamListItem
          key={exam.id}
          exam={exam}
          exams={exams}
          examType={examType}
        />
      ))}
    </AllExamListBlock>
  );
};

export default AllExamList;
