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
  const { examSetting, handleExamSelect } = useExamSetting({
    categoryId: 0,
    exams,
  });
  return (
    <AllExamListBlock>
      {exams.map((exam) => (
        <AllExamListItem
          key={exam.id}
          exam={exam}
          examType={examType}
          examSetting={examSetting}
          handleExamSelect={handleExamSelect}
        />
      ))}
    </AllExamListBlock>
  );
};

export default AllExamList;
