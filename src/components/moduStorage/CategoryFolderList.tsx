import React from 'react';
import styled from 'styled-components';
import { MockExamCategory } from 'types';
import CategoryFolderListItem from './CategoryFolderListItem';

const CategoryFolderListBlock = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

interface CategoryFolderListProps {
  categories: MockExamCategory[] | null;
  hasAllExamFolder?: boolean;
  handleToggleBookmark: (categoryId: number) => Promise<void>;
}

const CategoryFolderList: React.FC<CategoryFolderListProps> = ({
  categories,
  handleToggleBookmark,
}) => {
  return (
    <CategoryFolderListBlock>
      {categories?.map((category) => (
        <CategoryFolderListItem
          key={category.id}
          category={category}
          handleToggleBookmark={handleToggleBookmark}
        />
      ))}
    </CategoryFolderListBlock>
  );
};

export default CategoryFolderList;
