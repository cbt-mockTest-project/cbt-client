import React from 'react';
import styled from 'styled-components';
import { MockExamCategory } from 'types';
import CategoryFolderListItem from './CategoryFolderListItem';
import CategoryFolderIncludingAllExams from './CategoryFolderIncludingAllExams';

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
  hasAllExamFolder = false,
}) => {
  const examCount = categories?.reduce(
    (acc, cur) => acc + cur.mockExam?.length || 0,
    0
  );
  return (
    <CategoryFolderListBlock>
      {hasAllExamFolder && (
        <CategoryFolderIncludingAllExams examCount={examCount} />
      )}
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
