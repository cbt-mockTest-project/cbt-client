import { useLazyGetExamCategories } from '@lib/graphql/hook/useExam';
import { handleError } from '@lib/utils/utils';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { ExamSource, GetExamCategoriesInput, MockExamCategory } from 'types';
import { GET_EXAM_CATEGORIES } from '@lib/graphql/query/examQuery';
import { GetExamCategoriesQuery } from '@lib/graphql/query/examQuery.generated';
import { homeActions } from '@modules/redux/slices/home';
import { WatchQueryFetchPolicy } from '@apollo/client';
import { apolloClient } from '@modules/apollo';

export interface handleToggleCategoryBookmarkProps {
  categoryId: number;
  type: 'search' | 'modu' | 'user' | 'ehs' | 'recentlyStudied';
  input?: GetExamCategoriesInput;
}

const useHomeCategories = () => {
  const dispatch = useAppDispatch();
  const [getExamCategories] = useLazyGetExamCategories();

  const moduStorageCategories = useAppSelector(
    (state) => state.home.moduStorageCategories
  );
  const userStorageCategories = useAppSelector(
    (state) => state.home.userStorageCategories
  );
  const ehsStorageCategories = useAppSelector(
    (state) => state.home.ehsStorageCategories
  );

  const fetchCategories = async (
    input: GetExamCategoriesInput,
    fetchPolicy?: WatchQueryFetchPolicy
  ) => {
    try {
      return await getExamCategories({
        variables: {
          input,
        },
        fetchPolicy,
      });
    } catch (error) {
      handleError(error);
    }
  };

  const refetchHomeCategories = async () => {
    try {
      const getCategories = (input: GetExamCategoriesInput) =>
        apolloClient
          .query<GetExamCategoriesQuery>({
            query: GET_EXAM_CATEGORIES,
            variables: {
              input,
            },
          })
          .then((res) => res.data.getExamCategories.categories || []);
      const [moduCategories, userCategories, ehsCategories] = await Promise.all(
        [
          getCategories({
            examSource: ExamSource.MoudCbt,
            limit: 30,
          }),
          getCategories({
            examSource: ExamSource.User,
            limit: 30,
          }),
          getCategories({
            examSource: ExamSource.EhsMaster,
            limit: 30,
          }),
        ]
      );
      setModuStorageCategories(moduCategories as MockExamCategory[]);
      setUserStorageCategories(userCategories as MockExamCategory[]);
      setEhsStorageCategories(ehsCategories as MockExamCategory[]);
    } catch (error) {
      handleError(error);
    }
  };

  const setModuStorageCategories = (categories: MockExamCategory[]) =>
    dispatch(homeActions.setModuStorageCategories({ categories }));

  const setUserStorageCategories = (categories: MockExamCategory[]) =>
    dispatch(homeActions.setUserStorageCategories({ categories }));

  const setEhsStorageCategories = (categories: MockExamCategory[]) =>
    dispatch(homeActions.setEhsStorageCategories({ categories }));

  const setBookmarkedCategories = (categories: MockExamCategory[]) =>
    dispatch(homeActions.setBookmarkedCategories({ categories }));

  return {
    fetchCategories,
    refetchHomeCategories,
    moduStorageCategories,
    userStorageCategories,
    ehsStorageCategories,
    setBookmarkedCategories,
  };
};

export default useHomeCategories;
