import React from 'react';
import CategoryMultipleSelectModeControlbar from './CategoryMultipleSelectModeControlbar';
import { useAppSelector } from '@modules/redux/store/configureStore';

interface CategoryMultipleSelectModeControlbarWrapperProps {}

const CategoryMultipleSelectModeControlbarWrapper: React.FC<
  CategoryMultipleSelectModeControlbarWrapperProps
> = () => {
  const categoryId = useAppSelector((state) => state.examCategory.category.id);
  const exams = useAppSelector((state) => state.examCategory.category.mockExam);
  return (
    <CategoryMultipleSelectModeControlbar
      categoryId={categoryId}
      exams={exams}
    />
  );
};

export default CategoryMultipleSelectModeControlbarWrapper;
