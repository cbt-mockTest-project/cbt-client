import { responsive } from '@lib/utils/responsive';
import React from 'react';
import styled from 'styled-components';

const MyAllExamsComponentBlock = styled.div`
  padding: 30px;
  position: relative;
  @media (max-width: ${responsive.medium}) {
    padding: 20px 16px;
  }
`;

interface MyAllExamsComponentProps {}

const MyAllExamsComponent: React.FC<MyAllExamsComponentProps> = () => {
  return <MyAllExamsComponentBlock>sda</MyAllExamsComponentBlock>;
};

export default MyAllExamsComponent;
