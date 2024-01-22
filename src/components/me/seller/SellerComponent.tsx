import React from 'react';
import styled from 'styled-components';

const SellerComponentBlock = styled.div``;

interface SellerComponentProps {}

const SellerComponent: React.FC<SellerComponentProps> = () => {
  return <SellerComponentBlock>Seller</SellerComponentBlock>;
};

export default SellerComponent;
