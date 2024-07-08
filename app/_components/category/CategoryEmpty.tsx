import { Button, Empty } from 'antd';
import React from 'react';
import styled from 'styled-components';

const CategoryEmptyBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 300px);
  flex-direction: column;
  gap: 20px;
`;

interface CategoryEmptyProps {
  hasButton?: boolean;
  handleButtonClick?: () => void;
}

const CategoryEmpty: React.FC<CategoryEmptyProps> = ({
  hasButton,
  handleButtonClick,
}) => {
  return (
    <CategoryEmptyBlock>
      <Empty description="시험지가 존재하지 않습니다." />
      {hasButton && (
        <Button
          type="dashed"
          size="large"
          onClick={() => handleButtonClick?.()}
        >
          시험지 추가하기
        </Button>
      )}
    </CategoryEmptyBlock>
  );
};

export default CategoryEmpty;
