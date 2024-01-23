import { responsive } from '@lib/utils/responsive';
import React from 'react';
import styled from 'styled-components';

const SellerComponentBlock = styled.div`
  padding: 20px 30px 30px 30px;
  @media (max-width: ${responsive.medium}) {
    padding: 20px 16px;
  }
`;

interface SellerComponentProps {}

const SellerComponent: React.FC<SellerComponentProps> = () => {
  return <SellerComponentBlock>Seller</SellerComponentBlock>;
};

export default SellerComponent;
