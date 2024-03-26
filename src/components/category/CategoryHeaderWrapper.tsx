import React from 'react';
import styled from 'styled-components';
import CategoryHeader from './CategoryHeader';
import { useAppSelector } from '@modules/redux/store/configureStore';

const CategoryHeaderWrapperBlock = styled.div``;

interface CategoryHeaderWrapperProps {}

const CategoryHeaderWrapper: React.FC<CategoryHeaderWrapperProps> = () => {
  const user = useAppSelector((state) => state.examCategory.category.user);
  const name = useAppSelector((state) => state.examCategory.category.name);
  const description = useAppSelector(
    (state) => state.examCategory.category.description
  );
  return (
    <CategoryHeader
      user={user}
      categoryName={name}
      categoryDescription={description}
    />
  );
};

export default CategoryHeaderWrapper;
