import BasicCard from '@components/common/card/BasicCard';
import { responsive } from '@lib/utils/responsive';
import { Checkbox } from 'antd';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { MockExam, ReadMockExamCategoryByCategoryIdOutput } from 'types';

const ExamListItemBlock = styled.div`
  width: calc(50% - 10px);
  display: flex;
  gap: 10px;
  align-items: center;
  .exam-list-item-link {
    width: 100%;
    height: 100%;
  }
  @media (max-width: ${responsive.medium}) {
    width: 100%;
  }
`;

interface ExamListItemProps {
  exam: MockExam;
  selectedExamIds: number[];
  setSelectedExamIds: (selectedStudyNoteIds: number[]) => void;
}

const ExamListItem: React.FC<ExamListItemProps> = ({
  exam,
  selectedExamIds,
  setSelectedExamIds,
}) => {
  return (
    <ExamListItemBlock>
      <Checkbox
        checked={selectedExamIds.includes(exam.id)}
        onClick={() => {
          if (selectedExamIds.includes(exam.id)) {
            setSelectedExamIds(selectedExamIds.filter((id) => id !== exam.id));
          } else {
            setSelectedExamIds([...selectedExamIds, exam.id]);
          }
        }}
      />
      <Link className="exam-list-item-link" href={`/exam/solution/${exam.id}`}>
        <BasicCard hoverEffect>
          <span>{exam.title}</span>
        </BasicCard>
      </Link>
    </ExamListItemBlock>
  );
};

export default ExamListItem;
