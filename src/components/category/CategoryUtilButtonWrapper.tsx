import React from 'react';
import styled from 'styled-components';
import CategoryUtilButtonBox from './CategoryUtilButtonBox';
import { useAppSelector } from '@modules/redux/store/configureStore';
import useAuth from '@lib/hooks/useAuth';
import { Skeleton } from 'antd';

interface CategoryUtilButtonWrapperProps {}

const CategoryUtilButtonWrapper: React.FC<
  CategoryUtilButtonWrapperProps
> = () => {
  const exams = useAppSelector((state) => state.examCategory.category.mockExam);
  const name = useAppSelector((state) => state.examCategory.category.name);
  const categoryId = useAppSelector((state) => state.examCategory.category.id);
  const { user } = useAuth();
  const isMyCategory = useAppSelector(
    (state) =>
      state.examCategory.category &&
      state.examCategory.category.user.id === user?.id
  );
  const isPrivate = useAppSelector(
    (state) => !state.examCategory.category.isPublic
  );
  if (!isMyCategory && isPrivate) return <Skeleton />;
  return (
    <CategoryUtilButtonBox
      exams={exams}
      categoryName={name}
      categoryId={categoryId}
    />
  );
};

export default CategoryUtilButtonWrapper;
