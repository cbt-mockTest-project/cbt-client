import useAuth from '@lib/hooks/useAuth';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { MockExam } from 'types';

const CategoryUtilButtonBoxBlock = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

interface CategoryUtilButtonBoxProps {
  exams: MockExam[];
  categoryName: string;
  categoryId?: number;
}

const CategoryUtilButtonBox: React.FC<CategoryUtilButtonBoxProps> = ({
  exams,
  categoryName,
  categoryId,
}) => {
  const { handleCheckLogin } = useAuth();
  const router = useRouter();
  return (
    <CategoryUtilButtonBoxBlock>
      <Button
        className="category-question-search-button"
        onClick={() =>
          router.push({
            pathname: '/search',
            query: {
              examIds: exams.map((exam) => exam.id).join(','),
              categoryName,
            },
          })
        }
      >
        문제 검색
      </Button>
      <Button
        className="category-question-search-button"
        onClick={() =>
          handleCheckLogin() &&
          router.push({
            pathname: '/exams/review',
            query: {
              ...(categoryId && { categoryId }),
              examIds: exams.map((exam) => exam.id).join(','),
              categoryName,
            },
          })
        }
      >
        오답노트
      </Button>
    </CategoryUtilButtonBoxBlock>
  );
};

export default CategoryUtilButtonBox;
