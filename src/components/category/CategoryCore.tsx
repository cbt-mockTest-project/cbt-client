import {
  LAST_VISITED_CATEGORY,
  LAST_VISITED_CATEGORY_ID,
} from '@lib/constants/localStorage';
import {
  useMeQuery,
  useUpdateRecentlyStudiedCategory,
} from '@lib/graphql/hook/useUser';
import useExamCategory from '@lib/hooks/useExamCategory';
import { getExamSettingHistory } from '@lib/utils/examSettingHistory';
import { LocalStorage } from '@lib/utils/localStorage';
import { examSettingActions } from '@modules/redux/slices/examSetting';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { message } from 'antd';
import { ExamSettingType } from 'customTypes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ReadMockExamCategoryByCategoryIdInput, UserRole } from 'types';

interface CategoryCoreProps {
  categoryQueryInput: ReadMockExamCategoryByCategoryIdInput;
}

const CategoryCore: React.FC<CategoryCoreProps> = ({ categoryQueryInput }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { fetchCategory } = useExamCategory();
  const { data: meQuery } = useMeQuery();
  const localStorage = new LocalStorage();
  const [updateRecentlyStudiedCategory] = useUpdateRecentlyStudiedCategory();
  const categoryId = useAppSelector((state) => state.examCategory.category.id);
  const setExamSetting = (examSetting: Partial<ExamSettingType>) =>
    dispatch(examSettingActions.setExamSetting(examSetting));

  useEffect(() => {
    if (!meQuery) return;
    if (meQuery.me.user) {
      fetchCategory(categoryQueryInput);
      updateRecentlyStudiedCategory({
        variables: {
          input: {
            categorySlug: categoryQueryInput.urlSlug,
          },
        },
      });
      const examSetting = getExamSettingHistory(categoryId);
      if (!examSetting) return;
      const { examIds } = examSetting;
      if (examIds) setExamSetting({ categoryId, examIds });
    }
  }, [meQuery]);

  useEffect(() => {
    if (!router.asPath) return;
    localStorage.set(LAST_VISITED_CATEGORY, router.asPath);
    localStorage.set(LAST_VISITED_CATEGORY_ID, categoryId);
  }, [router.asPath]);

  return <></>;
};

export default CategoryCore;
