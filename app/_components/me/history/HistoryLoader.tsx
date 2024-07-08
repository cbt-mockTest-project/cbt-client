import palette from '../../../_styles/palette';
import React from 'react';
import { HashLoader } from 'react-spinners';
import styled, { useTheme } from 'styled-components';

const HistoryLoaderBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
`;

interface HistoryLoaderProps {}

const HistoryLoader: React.FC<HistoryLoaderProps> = () => {
  const theme = useTheme();
  return (
    <HistoryLoaderBlock>
      <HashLoader color={theme.color('colorPrimary')} />
    </HistoryLoaderBlock>
  );
};

export default HistoryLoader;
