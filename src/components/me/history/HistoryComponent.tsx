import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib';
import React from 'react';
import styled from 'styled-components';
import BookmarkTab from './BookmarkTab';
import ScoreTab from './ScoreTab';
import ExamHistoryTab from './ExamHistoryTab';
import { responsive } from '@lib/utils/responsive';

const HistoryComponentBlock = styled.div`
  padding: 20px 30px 30px 30px;
  @media (max-width: ${responsive.medium}) {
    padding: 20px 16px;
  }
`;

interface HistoryComponentProps {}

const HistoryComponent: React.FC<HistoryComponentProps> = () => {
  return (
    <HistoryComponentBlock>
      <Tabs items={tabItems} />
    </HistoryComponentBlock>
  );
};

export default HistoryComponent;

const tabItems: TabsProps['items'] = [
  {
    key: '1',
    label: '저장',
    children: <BookmarkTab />,
  },
  {
    key: '2',
    label: '점수',
    children: <ScoreTab />,
  },
  {
    key: '3',
    label: '시험',
    children: <ExamHistoryTab />,
  },
];
