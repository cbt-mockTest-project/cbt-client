import { AlertTwoTone } from '@ant-design/icons';
import { PUBLIC_CATEGORY_NAME } from '@lib/constants/sessionStorage';
import useAuth from '@lib/hooks/useAuth';
import { responsive } from '@lib/utils/responsive';
import { SessionStorage } from '@lib/utils/sessionStorage';
import { Button, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { MockExam } from 'types';
import Link from 'next/link';
import CategoryReportModal from '../CatogoryReportModal';

const ObjectiveCategoryUtilButtonBoxBlock = styled.div`
  width: 100vw;
  overflow-x: auto;
  scrollbar-width: none;
  .objective-category-util-button-box {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
    padding: 0 20px;
    width: fit-content;
    @media (max-width: ${responsive.medium}) {
      padding: 0 16px;
    }
  }
`;

interface ObjectiveCategoryUtilButtonBoxProps {
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

const ObjectiveCategoryUtilButtonBox: React.FC<
  ObjectiveCategoryUtilButtonBoxProps
> = ({ exams, categoryName, categoryId }) => {
  const theme = useTheme();

  const { handleCheckLogin, user } = useAuth();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const sessionStorage = new SessionStorage();
  const router = useRouter();

  const handleButtonClick = (config: ButtonConfig) => {
    if (config.needLogin && !handleCheckLogin()) return;

    const baseQuery = {
      ...(categoryId && { categoryId }),
      examIds: exams.map((exam) => exam.id).join(','),
      categoryName,
      type: 'objective',
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
    <ObjectiveCategoryUtilButtonBoxBlock>
      <div className="objective-category-util-button-box">
        {buttonConfigs.map((config, index) => (
          <Tooltip key={index} title={config.title}>
            <Button
              icon={config.icon}
              className="objective-category-question-search-button"
              onClick={() => handleButtonClick(config)}
            >
              {config.label}
            </Button>
          </Tooltip>
        ))}
        <Tooltip title="암기장 신고">
          <Button
            type="text"
            onClick={() => {
              if (!handleCheckLogin()) return;
              setIsReportModalOpen(true);
            }}
          >
            <AlertTwoTone
              className="text-2xl"
              twoToneColor={theme.color('colorBorder')}
            />
          </Button>
        </Tooltip>
        {user && user.role === 'ADMIN' && (
          <Link href={`/admin/feedback-filter?categoryId=${categoryId}`}>
            <Button type="primary">피드백필터</Button>
          </Link>
        )}
      </div>

      {isReportModalOpen && (
        <CategoryReportModal
          open={isReportModalOpen}
          onCancel={() => setIsReportModalOpen(false)}
        />
      )}
    </ObjectiveCategoryUtilButtonBoxBlock>
  );
};

export default ObjectiveCategoryUtilButtonBox;
