import React from 'react';
import CategoryHeader from './CategoryHeader';
import { useAppSelector } from '@modules/redux/store/configureStore';

interface CategoryHeaderWrapperProps {}

const CategoryHeaderWrapper: React.FC<CategoryHeaderWrapperProps> = () => {
  const user = useAppSelector((state) => state.examCategory.category.user);
  const name = useAppSelector((state) => state.examCategory.category.name);
  const description = useAppSelector(
    (state) => state.examCategory.category.description
  );
  const exams = useAppSelector((state) => state.examCategory.category.mockExam);
  console.log('CategoryHeaderWrapper');
  return (
    <CategoryHeader
      user={user}
      categoryName={name}
      categoryDescription={description}
      exams={exams}
    />
  );
};

export default CategoryHeaderWrapper;
