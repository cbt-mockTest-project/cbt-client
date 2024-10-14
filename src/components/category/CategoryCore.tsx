import {
  LAST_VISITED_CATEGORY,
  LAST_VISITED_CATEGORY_ID,
} from '@lib/constants/localStorage';
import {
  useMeQuery,
  useUpdateRecentlyStudiedCategory,
} from '@lib/graphql/hook/useUser';
import { getExamSettingHistory } from '@lib/utils/examSettingHistory';
import { LocalStorage } from '@lib/utils/localStorage';
import { examSettingActions } from '@modules/redux/slices/examSetting';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { ExamSettingType } from 'customTypes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  ExamType,
  MockExam,
  MockExamCategory,
  ReadMockExamCategoryByCategoryIdInput,
} from 'types';
import { queryClient } from '../../../pages/_app';
import { examCategoryActions } from '@modules/redux/slices/examCategory';
import { message } from 'antd';

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
  const { data: meQuery } = useMeQuery();
  const localStorage = new LocalStorage();
  const [updateRecentlyStudiedCategory] = useUpdateRecentlyStudiedCategory();
  const setExamSetting = (examSetting: Partial<ExamSettingType>) =>
    dispatch(examSettingActions.setExamSetting(examSetting));
  const [isRefetched, setIsRefetched] = useState(false);
  useEffect(() => {
    if (!meQuery) return;
    if (meQuery.me.user) {
      // queryClient
      //   .refetchQueries({
      //     queryKey,
      //   })
      //   .then(() => {
      //     setIsRefetched(true);
      //   });
      // refetchMeQuery();
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
    if (!category) return;

    if (
      category.examType === ExamType.Objective &&
      !router.asPath.includes('mcq')
    ) {
      message.error('잘못된 접근입니다.');
      router.back();
      return;
    }

    if (
      category.examType === ExamType.Subjective &&
      router.asPath.includes('mcq')
    ) {
      message.error('잘못된 접근입니다.');
      router.back();
      return;
    }

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
    setCategoryExams(category?.mockExam || []);
    setCategoryExams(category?.mockExam || []);
  }, [category?.mockExam, isRefetched]);

  useEffect(() => {
    if (!router.asPath) return;
    localStorage.set(LAST_VISITED_CATEGORY, router.asPath);
    localStorage.set(LAST_VISITED_CATEGORY_ID, categoryId);
  }, [router.asPath]);

  return <></>;
};

export default CategoryCore;
