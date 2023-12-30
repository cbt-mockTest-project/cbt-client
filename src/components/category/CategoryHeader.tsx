import { FolderOutlined } from '@ant-design/icons';
import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';

const CategoryHeaderBlock = styled.div`
  .category-creator-info {
    display: flex;
    gap: 3px;
    align-items: flex-end;
  }
  .category-creator-name {
    font-size: 18px;
    font-weight: bold;
  }

  .category-creator-label {
    font-size: 14px;
    font-weight: bold;
    color: ${palette.colorSubText};
  }
  .category-info {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
    svg {
      font-size: 24px;
    }
  }
  .category-description {
    margin-top: 10px;
    font-size: 14px;
  }
`;

interface CategoryHeaderProps {
  userName: string;
  categoryName: string;
  categoryDescription: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  userName,
  categoryName,
  categoryDescription,
}) => {
  return (
    <CategoryHeaderBlock>
      <div className="category-creator-info">
        <span className="category-creator-name">{userName}</span>
        <span className="category-creator-label">의 암기장</span>
      </div>
      <div className="category-info">
        <FolderOutlined />
        <span className="category-name">{categoryName}</span>
      </div>
      <div className="category-description">{categoryDescription}</div>
    </CategoryHeaderBlock>
  );
};

export default CategoryHeader;
