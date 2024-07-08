import { responsive } from '../../../_lib/utils/responsive';
import { Tabs, TabsProps } from 'antd';
import React from 'react';
import styled from 'styled-components';
import SaleHistoryTab from './SaleHistoryTab';

const SellerComponentBlock = styled.div`
  padding: 20px 30px 30px 30px;
  @media (max-width: ${responsive.medium}) {
    padding: 20px 16px;
  }
`;

interface SellerComponentProps {}

const SellerComponent: React.FC<SellerComponentProps> = () => {
  return (
    <SellerComponentBlock>
      <Tabs items={tabItems} />
    </SellerComponentBlock>
  );
};

export default SellerComponent;

const tabItems: TabsProps['items'] = [
  {
    key: '1',
    label: '판매내역',
    children: <SaleHistoryTab />,
  },
  // {
  //   key: '2',
  //   label: '점수',
  //   children: <ScoreTab />,
  // },
];
