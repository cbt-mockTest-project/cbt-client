import BasicCard from '@components/common/card/BasicCard';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Tag } from 'antd';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { MockExamCategory } from 'types';

const CategoryFolderListItemBlock = styled(Link)`
  width: calc(50% - 10px);
  .category-name {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .category-header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
  }
  .category-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .category-user-info {
    display: flex;
    align-items: flex-end;
    gap: 3px;
    margin-top: 20px;
  }
  .category-user-name {
    font-size: 14px;
    font-weight: bold;
  }
  .category-user-label {
    font-size: 12px;
    font-weight: bold;
    color: ${palette.subTextColor};
  }

  @media (max-width: ${responsive.medium}) {
    width: 100%;
  }
`;

interface CategoryFolderListItemProps {
  category: MockExamCategory;
}

const CategoryFolderListItem: React.FC<CategoryFolderListItemProps> = ({
  category,
}) => {
  return (
    <CategoryFolderListItemBlock href={`/category/${category.id}`}>
      <BasicCard hoverEffect>
        <div className="category-wrapper">
          <div className="category-header-wrapper">
            <span className="category-name">{category.name}</span>
            <Tag color={category.isPublic ? 'blue' : 'default'}>
              {category.isPublic ? '공개' : '비공개'}
            </Tag>
          </div>
          <div className="category-user-info">
            <span className="category-user-name">{category.user.nickname}</span>
            <span className="category-user-label">의 암기장</span>
          </div>
        </div>
      </BasicCard>
    </CategoryFolderListItemBlock>
  );
};

export default CategoryFolderListItem;
