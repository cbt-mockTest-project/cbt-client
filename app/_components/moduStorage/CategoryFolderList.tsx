import React from 'react';
import styled from 'styled-components';
import { MockExamCategory } from '../../types';
import CategoryFolderListItem from './CategoryFolderListItem';

const CategoryFolderListBlock = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

interface CategoryFolderListProps {
  categories: MockExamCategory[] | null;
}

const CategoryFolderList: React.FC<CategoryFolderListProps> = ({
  categories,
}) => {
  return (
    <CategoryFolderListBlock>
      {categories?.map((category) => (
        <CategoryFolderListItem key={category.id} category={category} />
      ))}
    </CategoryFolderListBlock>
  );
};

export default CategoryFolderList;
