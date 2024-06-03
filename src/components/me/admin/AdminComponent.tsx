import { responsive } from '@lib/utils/responsive';
import { Tabs, TabsProps } from 'antd';
import React from 'react';
import styled from 'styled-components';
import SettlementTab from './SettlementTab';
import RevenueRequestTab from './RevenueRequestTab';
import PointCheckTab from './PointCheckTab';
import RevalidateTab from './RevalidateTab';

const AdminComponentBlock = styled.div`
  padding: 20px 30px 30px 30px;
  @media (max-width: ${responsive.medium}) {
    padding: 20px 16px;
  }
`;

interface AdminComponentProps {}

const AdminComponent: React.FC<AdminComponentProps> = () => {
  return (
    <AdminComponentBlock>
      <Tabs items={tabItems} />
    </AdminComponentBlock>
  );
};

export default AdminComponent;

const tabItems: TabsProps['items'] = [
  {
    key: '1',
    label: '출금내역',
    children: <SettlementTab />,
  },
  {
    key: '2',
    label: '수익창출신청',
    children: <RevenueRequestTab />,
  },
  {
    key: '3',
    label: '포인트 조회',
    children: <PointCheckTab />,
  },
  {
    key: '4',
    label: 'Revalidate',
    children: <RevalidateTab />,
  },
];
