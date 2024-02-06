import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import BookmarkTab from './BookmarkTab';
import ScoreTab from './ScoreTab';
import { responsive } from '@lib/utils/responsive';
import useQuestions from '@lib/hooks/useQuestions';
import { useRouter } from 'next/router';

const HistoryComponentBlock = styled.div`
  padding: 20px 30px 30px 30px;
  @media (max-width: ${responsive.medium}) {
    padding: 20px 16px;
  }
`;

interface HistoryComponentProps {}

const HistoryComponent: React.FC<HistoryComponentProps> = () => {
  const { resetQuestions } = useQuestions();
  const router = useRouter();
  useEffect(() => {
    resetQuestions();
  }, []);

  const onChangeTabs = (key: string) => {
    router.replace({ query: { tab: key } });
    resetQuestions();
  };
  return (
    <HistoryComponentBlock>
      <Tabs items={tabItems} onChange={onChangeTabs} />
    </HistoryComponentBlock>
  );
};

export default HistoryComponent;

const tabItems: TabsProps['items'] = [
  {
    key: 'bookmark',
    label: '저장',
    children: <BookmarkTab />,
  },
  {
    key: 'history',
    label: '오답노트',
    children: <ScoreTab />,
  },
];
