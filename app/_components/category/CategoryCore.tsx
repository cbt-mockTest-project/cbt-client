import {
  LAST_VISITED_CATEGORY,
  LAST_VISITED_CATEGORY_ID,
} from '../../_lib/constants/localStorage';
import {
  useMeQuery,
  useUpdateRecentlyStudiedCategory,
} from '../../_lib/graphql/hook/useUser';
import { getExamSettingHistory } from '../../_lib/utils/examSettingHistory';
import { LocalStorage } from '../../_lib/utils/localStorage';
import { examSettingActions } from '../../_modules/redux/slices/examSetting';
import { useAppDispatch } from '../../_modules/redux/store/configureStore';
import { ExamSettingType } from '../../customTypes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  MockExam,
  MockExamCategory,
  ReadMockExamCategoryByCategoryIdInput,
} from '../../types';
import { queryClient } from '../../../pages/_app';
import { examCategoryActions } from '../../_modules/redux/slices/examCategory';

interface CategoryCoreProps {
  categoryQueryInput: ReadMockExamCategoryByCategoryIdInput;
  categoryId: number;
  queryKey: string[];
}

const CategoryCore: React.FC<CategoryCoreProps> = ({
  categoryQueryInput,
  categoryId,
  queryKey,
}) => {
  const router = useRouter();
  const category = queryClient.getQueryData<MockExamCategory>(queryKey);

  const dispatch = useAppDispatch();
  const { data: meQuery, refetch: refetchMeQuery } = useMeQuery();
  const localStorage = new LocalStorage();
  const [updateRecentlyStudiedCategory] = useUpdateRecentlyStudiedCategory();
  const setExamSetting = (examSetting: Partial<ExamSettingType>) =>
    dispatch(examSettingActions.setExamSetting(examSetting));
  const [isRefetched, setIsRefetched] = useState(false);
  useEffect(() => {
    if (!meQuery) return;
    if (meQuery.me.user) {
      queryClient
        .refetchQueries({
          queryKey,
        })
        .then(() => {
          setIsRefetched(true);
        });
      refetchMeQuery();
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
  }, [meQuery?.me.user?.id, router.query.name]);

  useEffect(() => {
    const setCategoryExams = (
      exams: MockExam[],
      shouldUpdateOriginal = true
    ) => {
      dispatch(
        examCategoryActions.setCategoryExams({
          categoryExams: exams,
          shouldUpdateOriginal,
        })
      );
    };
    setCategoryExams(category.mockExam || []);
    setCategoryExams(category.mockExam || []);
  }, [category.mockExam, isRefetched]);

  useEffect(() => {
    if (!router.asPath) return;
    localStorage.set(LAST_VISITED_CATEGORY, router.asPath);
    localStorage.set(LAST_VISITED_CATEGORY_ID, categoryId);
  }, [router.asPath]);

  return <></>;
};

export default CategoryCore;
