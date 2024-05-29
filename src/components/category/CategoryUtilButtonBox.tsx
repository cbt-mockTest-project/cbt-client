import useAuth from '@lib/hooks/useAuth';
import { Button, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { MockExam } from 'types';

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
    <div className="mb-5 flex items-center gap-2 xs:flex-col xs:items-start">
      <Tooltip title="암기장 내 문제를 검색할 수 있어요.">
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
      </Tooltip>
      <div className="flex items-center gap-2">
        <Tooltip title="△ 또는 ✕ 를 체크한 문제들을 모아 볼 수 있어요.">
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
        </Tooltip>
        <Tooltip title="북마크한 문제들을 모아 볼 수 있어요.">
          <Button
            className="category-question-search-button"
            onClick={() =>
              handleCheckLogin() &&
              router.push({
                pathname: '/exams/bookmark',
                query: {
                  ...(categoryId && { categoryId }),
                  examIds: exams.map((exam) => exam.id).join(','),
                  categoryName,
                },
              })
            }
          >
            북마크노트
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default CategoryUtilButtonBox;
