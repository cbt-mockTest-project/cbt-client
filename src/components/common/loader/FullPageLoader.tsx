import palette from '@styles/palette';
import React from 'react';
import { HashLoader } from 'react-spinners';
import styled from 'styled-components';

const FullPageLoaderBlock = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface FullPageLoaderProps {}

const FullPageLoader: React.FC<FullPageLoaderProps> = () => {
  return (
    <FullPageLoaderBlock>
      <HashLoader color={palette.antd_blue_02} />
    </FullPageLoaderBlock>
  );
};

export default FullPageLoader;
