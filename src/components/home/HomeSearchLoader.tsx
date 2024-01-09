import palette from '@styles/palette';
import React from 'react';
import { HashLoader } from 'react-spinners';
import styled from 'styled-components';

const HomeSearchLoaderBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

interface HomeSearchLoaderProps {}

const HomeSearchLoader: React.FC<HomeSearchLoaderProps> = () => {
  return (
    <HomeSearchLoaderBlock>
      <HashLoader color={palette.antd_blue_02} />
    </HomeSearchLoaderBlock>
  );
};

export default HomeSearchLoader;
