import useHomeCategories from '../../_lib/hooks/useHomeCategories';
import { handleError } from '../../_lib/utils/utils';
import { homeActions } from '../../_modules/redux/slices/home';
import {
  useAppDispatch,
  useAppSelector,
} from '../../_modules/redux/store/configureStore';
import React, { useEffect } from 'react';
import { ExamSource, MockExamCategory } from '../../types';

interface HomeCoreProps {}

const HomeCore: React.FC<HomeCoreProps> = () => {
  const isNotFetchedUserCategories = useAppSelector(
    (state) => state.home.userStorageCategories === null
  );
  const { fetchCategories } = useHomeCategories();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isNotFetchedUserCategories) return;
    const fetchUserCategories = async () => {
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const res = await fetchCategories({
            examSource: ExamSource.User,
          });
          const categories = res?.data.getExamCategories.categories || [];
          const categoriesSortedByLikes = [...categories].sort(
            (a, b) =>
              b.categoryEvaluations.length - a.categoryEvaluations.length
          );
          const categoriesSortedByCreatedAt = [...categories]
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map((category) => ({
              ...category,
              isNew: true,
            }));
          dispatch(
            homeActions.setUserStorageCategories({
              categories: [
                ...categoriesSortedByCreatedAt.slice(0, 1),
                ...categoriesSortedByLikes.filter(
                  (category) => !category['isNew']
                ),
              ] as MockExamCategory[],
            })
          );
          break; // 성공 시 반복 중단
        } catch (err) {
          if (attempt === 2) handleError(err); // 마지막 시도에서 실패한 경우 에러 처리
        }
      }
    };

    const interval = setInterval(() => {
      fetchUserCategories();
    }, 1000);
    if (!isNotFetchedUserCategories) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isNotFetchedUserCategories]);
  return null;
};

export default HomeCore;
