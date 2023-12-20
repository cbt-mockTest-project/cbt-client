import React from 'react';
import styled from 'styled-components';
import { MockExamCategory } from 'types';
import CategoryFolderListItem from './CategoryFolderListItem';
import StorageEmpty from './StorageEmpty';
import CategoryFolderIncludingAllExams from './CategoryFolderIncludingAllExams';

const CategoryFolderListBlock = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

interface CategoryFolderListProps {
  categories: MockExamCategory[] | null;
  hasAllExamFolder?: boolean;
}

const CategoryFolderList: React.FC<CategoryFolderListProps> = ({
  categories,
  hasAllExamFolder = false,
}) => {
  return (
    <CategoryFolderListBlock>
      {hasAllExamFolder && <CategoryFolderIncludingAllExams />}
      {categories?.map((category) => (
        <CategoryFolderListItem key={category.id} category={category} />
      ))}
    </CategoryFolderListBlock>
  );
};

export default CategoryFolderList;
