import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CategoryUtilButtonBox from './CategoryUtilButtonBox';
import { useAppSelector } from '@modules/redux/store/configureStore';
import useAuth from '@lib/hooks/useAuth';
import { Skeleton } from 'antd';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { apolloClient } from '@modules/apollo';
import { CHECK_HAS_CATEGORY_ACCESS } from '@lib/graphql/query/examCategoryBookmark';
import {
  CheckHasCategoryAccessMutation,
  CheckHasCategoryAccessMutationVariables,
} from '@lib/graphql/query/examCategoryBookmark.generated';
import useCheckHasCategoryAccess from './hooks/useCheckHasCategoryAccess';

interface CategoryUtilButtonWrapperProps {}

const CategoryUtilButtonWrapper: React.FC<
  CategoryUtilButtonWrapperProps
> = () => {
  const { isCategoryAccess } = useCheckHasCategoryAccess();
  const exams = useAppSelector((state) => state.examCategory.category.mockExam);
  const name = useAppSelector((state) => state.examCategory.category.name);
  const categoryId = useAppSelector((state) => state.examCategory.category.id);
  const isPrivate = useAppSelector(
    (state) => !state.examCategory.category.isPublic
  );

  if (!isCategoryAccess && isPrivate) return <Skeleton />;
  return (
    <CategoryUtilButtonBox
      exams={exams}
      categoryName={name}
      categoryId={categoryId}
    />
  );
};

export default CategoryUtilButtonWrapper;
