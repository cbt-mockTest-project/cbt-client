import { loadScript } from '@lib/utils/utils';
import { Button } from 'antd';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const PaymentComponentBlock = styled.div``;

const BootPayComponent = dynamic(
  () => import('@components/common/bootpay/BootPayComponent'),
  {
    ssr: false,
  }
);

interface PaymentComponentProps {}

const PaymentComponent: React.FC<PaymentComponentProps> = () => {
  return (
    <PaymentComponentBlock>
      <BootPayComponent />
    </PaymentComponentBlock>
  );
};

export default PaymentComponent;
