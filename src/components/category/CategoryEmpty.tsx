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

interface CategoryEmptyProps {}

const CategoryEmpty: React.FC<CategoryEmptyProps> = () => {
  return (
    <CategoryEmptyBlock>
      <Empty description="시험지가 존재하지 않습니다." />
      <Button type="dashed" size="large">
        시험지 만들러 가기
      </Button>
    </CategoryEmptyBlock>
  );
};

export default CategoryEmpty;
