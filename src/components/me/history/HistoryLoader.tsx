import palette from '@styles/palette';
import React from 'react';
import { HashLoader } from 'react-spinners';
import styled from 'styled-components';

const HistoryLoaderBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
`;

interface HistoryLoaderProps {}

const HistoryLoader: React.FC<HistoryLoaderProps> = () => {
  return (
    <HistoryLoaderBlock>
      <HashLoader color={palette.antd_blue_02} />
    </HistoryLoaderBlock>
  );
};

export default HistoryLoader;
