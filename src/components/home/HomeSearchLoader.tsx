import palette from '@styles/palette';
import React from 'react';
import { HashLoader } from 'react-spinners';
import styled, { useTheme } from 'styled-components';

const HomeSearchLoaderBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

interface HomeSearchLoaderProps {}

const HomeSearchLoader: React.FC<HomeSearchLoaderProps> = () => {
  const theme = useTheme();
  return (
    <HomeSearchLoaderBlock>
      <HashLoader color={theme.color('colorPrimary')} />
    </HomeSearchLoaderBlock>
  );
};

export default HomeSearchLoader;
