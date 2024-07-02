import React from 'react';
import CategoryUtilButtonBox from './CategoryUtilButtonBox';
import { useAppSelector } from '@modules/redux/store/configureStore';

interface CategoryUtilButtonWrapperProps {}

const CategoryUtilButtonWrapper: React.FC<
  CategoryUtilButtonWrapperProps
> = () => {
  const exams = useAppSelector((state) => state.examCategory.category.mockExam);
  const name = useAppSelector((state) => state.examCategory.category.name);
  const categoryId = useAppSelector((state) => state.examCategory.category.id);
  const isPrivate = useAppSelector(
    (state) => !state.examCategory.category.isPublic
  );

  return (
    <CategoryUtilButtonBox
      exams={exams}
      categoryName={name}
      categoryId={categoryId}
    />
  );
};

export default CategoryUtilButtonWrapper;
