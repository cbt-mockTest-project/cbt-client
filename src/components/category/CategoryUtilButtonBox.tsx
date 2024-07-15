import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { PUBLIC_CATEGORY_NAME } from '@lib/constants/sessionStorage';
import useAuth from '@lib/hooks/useAuth';
import { SessionStorage } from '@lib/utils/sessionStorage';
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
  const sessionStorage = new SessionStorage();
  const router = useRouter();
  return (
    <div className="mb-5 flex items-center gap-2 px-[20px] md:px-[16px]">
      <Tooltip title="암기장 내 문제를 검색할 수 있어요.">
        <Button
          icon={<SearchOutlined />}
          className="category-question-search-button"
          onClick={() => {
            sessionStorage.set(PUBLIC_CATEGORY_NAME, categoryName);
            router.push({
              pathname: '/search',
              query: {
                examIds: exams.map((exam) => exam.id).join(','),
                categoryName,
              },
            });
          }}
        >
          문제
        </Button>
      </Tooltip>
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
          오답
        </Button>
      </Tooltip>
    </div>
  );
};

export default CategoryUtilButtonBox;
