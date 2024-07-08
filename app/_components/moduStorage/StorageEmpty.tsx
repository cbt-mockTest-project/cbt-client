import { Button, Empty } from 'antd';
import React from 'react';
import styled from 'styled-components';

const StorageEmptyBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 300px);
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

interface StorageEmptyProps {
  handleButtonClick: () => void;
}

const StorageEmpty: React.FC<StorageEmptyProps> = ({ handleButtonClick }) => {
  return (
    <StorageEmptyBlock>
      <Empty description="폴더로 시험지를 관리해 보세요." />
      <Button type="dashed" size="large" onClick={handleButtonClick}>
        폴더 만들기
      </Button>
    </StorageEmptyBlock>
  );
};

export default StorageEmpty;
