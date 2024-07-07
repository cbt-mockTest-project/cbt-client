import palette from '@styles/palette';
import React from 'react';
import { HashLoader } from 'react-spinners';
import styled, { useTheme } from 'styled-components';

const FullPageLoaderBlock = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface FullPageLoaderProps {}

const FullPageLoader: React.FC<FullPageLoaderProps> = () => {
  const theme = useTheme();
  return (
    <FullPageLoaderBlock>
      <HashLoader color={theme.color('colorPrimary')} />
    </FullPageLoaderBlock>
  );
};

export default FullPageLoader;
