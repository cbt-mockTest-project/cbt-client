import useHomeCategories from '@lib/hooks/useHomeCategories';
import { handleError } from '@lib/utils/utils';
import { homeActions } from '@modules/redux/slices/home';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import React, { useEffect } from 'react';
import { ExamSource, MockExamCategory } from 'types';

interface HomeCoreProps {}

const HomeCore: React.FC<HomeCoreProps> = () => {
  const { fetchCategories } = useHomeCategories();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchUserCategories = async () => {
      const res = await fetchCategories({
        examSource: ExamSource.User,
        limit: 30,
      });
      const categories = res?.data.getExamCategories.categories || [];
      const categoriesSortedByLikes = [...categories].sort(
        (a, b) => b.categoryEvaluations.length - a.categoryEvaluations.length
      );
      const categoriesSortedByCreatedAt = [...categories]
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .map((category) => ({
          ...category,
          isNew: true,
        }));
      dispatch(
        homeActions.setUserStorageCategories({
          categories: [
            ...categoriesSortedByCreatedAt.slice(0, 2),
            ...categoriesSortedByLikes,
          ] as MockExamCategory[],
        })
      );
    };
    try {
      fetchUserCategories();
    } catch (err) {
      handleError(err);
    }
  }, []);
  return null;
};

export default HomeCore;
