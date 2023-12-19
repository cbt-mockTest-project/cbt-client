import React from 'react';
import styled from 'styled-components';
import { MockExamCategory } from 'types';
import CategoryFolderListItem from './CategoryFolderListItem';
import StorageEmpty from './StorageEmpty';

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
      {/* {categories?.length === 0 && (
        <StorageEmpty handleButtonClick={openSaveCategoryModal} />
      )} */}
    </CategoryFolderListBlock>
  );
};

export default CategoryFolderList;
