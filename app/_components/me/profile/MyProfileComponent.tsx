import { responsive } from '../../../_lib/utils/responsive';
import { Menu, Tabs } from 'antd';
import { TabsProps } from 'antd/lib';
import React from 'react';
import styled from 'styled-components';
import MyProfileTab from './MyProfileTab';
import MyPaymentTab from './MyPaymentTab';
import MyPointHistoryTab from './MyPointHistoryTab';

const MyProfileComponentBlock = styled.div`
  padding: 20px 30px 30px 30px;
  @media (max-width: ${responsive.medium}) {
    padding: 20px 16px;
  }
`;

interface MyProfileComponentProps {}

const MyProfileComponent: React.FC<MyProfileComponentProps> = () => {
  return (
    <MyProfileComponentBlock>
      <Tabs items={tabItems} />
    </MyProfileComponentBlock>
  );
};

export default MyProfileComponent;

const tabItems: TabsProps['items'] = [
  {
    key: '1',
    label: '내 정보',
    children: <MyProfileTab />,
  },
  {
    key: '2',
    label: '결제 내역',
    children: <MyPaymentTab />,
  },
  {
    key: '3',
    label: '포인트 내역',
    children: <MyPointHistoryTab />,
  },
];
