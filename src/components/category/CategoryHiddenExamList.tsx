import { useAppSelector } from '@modules/redux/store/configureStore';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { MockExam } from 'types';

const CategoryHiddenListExamBlock = styled.div`
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  background-color: transparent;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
`;

interface CategoryHiddenListExamProps {
  exams: MockExam[];
}

const CategoryHiddenListExam: React.FC<CategoryHiddenListExamProps> = ({
  exams,
}) => {
  return (
    <CategoryHiddenListExamBlock>
      {exams.map((exam) => (
        <Link key={exam.id} href={`/exam/solution/${exam.id}`} prefetch={false}>
          {exam.title}
        </Link>
      ))}
    </CategoryHiddenListExamBlock>
  );
};

export default CategoryHiddenListExam;
