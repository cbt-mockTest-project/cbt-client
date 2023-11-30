import BasicCard from '@components/common/card/BasicCard';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
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
    color: ${palette.gray_700};
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
      <BasicCard>
        <div className="category-wrapper">
          <span className="category-name">{category.name}</span>
          <div className="category-user-info">
            <span className="category-user-name">{category.user.nickname}</span>
            <span className="category-user-label">님의 폴더</span>
          </div>
        </div>
      </BasicCard>
    </CategoryFolderListItemBlock>
  );
};

export default CategoryFolderListItem;
