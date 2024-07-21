import { PUBLIC_CATEGORY_NAME } from '@lib/constants/sessionStorage';
import useAuth from '@lib/hooks/useAuth';
import { SessionStorage } from '@lib/utils/sessionStorage';
import { Button, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { MockExam } from 'types';

const CategoryUtilButtonBoxBlock = styled.div`
  width: 100vw;
  overflow-x: auto;
  scrollbar-width: none;
`;

interface CategoryUtilButtonBoxProps {
  exams: MockExam[];
  categoryName: string;
  categoryId?: number;
}

interface ButtonConfig {
  title: string;
  label: string;
  url: string;
  icon?: React.ReactNode;
  needLogin?: boolean;
}

const CategoryUtilButtonBox: React.FC<CategoryUtilButtonBoxProps> = ({
  exams,
  categoryName,
  categoryId,
}) => {
  const { handleCheckLogin } = useAuth();
  const sessionStorage = new SessionStorage();
  const router = useRouter();

  const handleButtonClick = (config: ButtonConfig) => {
    if (config.needLogin && !handleCheckLogin()) return;

    const baseQuery = {
      ...(categoryId && { categoryId }),
      examIds: exams.map((exam) => exam.id).join(','),
      categoryName,
    };

    if (config.url === '/search') {
      sessionStorage.set(PUBLIC_CATEGORY_NAME, categoryName);
    }

    router.push({
      pathname: config.url,
      query: config.url === '/me/bookmark' ? undefined : baseQuery,
    });
  };

  const buttonConfigs: ButtonConfig[] = [
    {
      title: '암기장 내 문제를 검색할 수 있어요.',
      label: '문제 검색',
      url: '/search',
    },
    {
      title: '△ 또는 ✕ 를 체크한 문제들을 모아 볼 수 있어요.',
      label: '오답 모음',
      url: '/exams/review',
      needLogin: true,
    },

    {
      title: '형광펜으로 체크한 문제들을 모아 볼 수 있어요.',
      label: '형광펜 문제',
      url: '/exams/highlight',
      needLogin: true,
    },
    {
      title: '북마크한 문제들을 모아 볼 수 있어요.',
      label: '북마크',
      url: '/me/bookmark',
      needLogin: true,
    },
    {
      title: '답안에 메모한 문제들을 모아 볼 수 있어요.',
      label: '답안메모 모음',
      url: '/exams/memo',
      needLogin: true,
    },
  ];

  return (
    <CategoryUtilButtonBoxBlock>
      <div className="mb-5 flex items-center gap-2 px-[20px] md:px-[16px] w-fit">
        {buttonConfigs.map((config, index) => (
          <Tooltip key={index} title={config.title}>
            <Button
              icon={config.icon}
              className="category-question-search-button"
              onClick={() => handleButtonClick(config)}
            >
              {config.label}
            </Button>
          </Tooltip>
        ))}
      </div>
    </CategoryUtilButtonBoxBlock>
  );
};

export default CategoryUtilButtonBox;
