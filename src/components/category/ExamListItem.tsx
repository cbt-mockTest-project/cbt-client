import BasicCard from '@components/common/card/BasicCard';
import useExamSetting from '@lib/hooks/useExamSetting';
import { responsive } from '@lib/utils/responsive';
import { Checkbox } from 'antd';
import { ExamSettingType } from 'customTypes';
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
  examSetting: ExamSettingType;
  handleExamSelect: (examId: number) => void;
}

const ExamListItem: React.FC<ExamListItemProps> = ({
  exam,
  examSetting,
  handleExamSelect,
}) => {
  return (
    <ExamListItemBlock>
      {examSetting.isMultipleSelectMode && (
        <Checkbox
          checked={examSetting.examIds.includes(exam.id)}
          onClick={() => handleExamSelect(exam.id)}
        />
      )}
      <Link className="exam-list-item-link" href={`/exam/solution/${exam.id}`}>
        <BasicCard hoverEffect>
          <span>{exam.title}</span>
        </BasicCard>
      </Link>
    </ExamListItemBlock>
  );
};

export default ExamListItem;
