import { useAppSelector } from '@modules/redux/store/configureStore';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

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

interface CategoryHiddenListExamProps {}

const CategoryHiddenListExam: React.FC<CategoryHiddenListExamProps> = () => {
  const exams = useAppSelector((state) => state.examCategory.category.mockExam);
  return (
    <CategoryHiddenListExamBlock>
      {exams.map((exam) => (
        <Link key={exam.id} href={`/exam/solution/${exam.id}`}>
          {exam.title}
        </Link>
      ))}
    </CategoryHiddenListExamBlock>
  );
};

export default CategoryHiddenListExam;
