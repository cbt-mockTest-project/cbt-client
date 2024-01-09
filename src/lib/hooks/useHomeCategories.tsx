import { useLazyGetExamCategories } from '@lib/graphql/hook/useExam';
import { handleError } from '@lib/utils/utils';
import { storageActions } from '@modules/redux/slices/storage';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { ExamSource, GetExamCategoriesInput, MockExamCategory } from 'types';
import useApolloClient from './useApolloCient';
import { GET_EXAM_CATEGORIES } from '@lib/graphql/query/examQuery';
import { GetExamCategoriesQuery } from '@lib/graphql/query/examQuery.generated';
import { useToggleExamCategoryBookmark } from '@lib/graphql/hook/useExamCategoryBookmark';
import { cloneDeep } from 'lodash';
import { message } from 'antd';
import useAuth from './useAuth';

export interface handleToggleCategoryBookmarkProps {
  categoryId: number;
  type: 'search' | 'modu' | 'user';
  input?: GetExamCategoriesInput;
}

const useHomeCategories = () => {
  const { handleCheckLogin } = useAuth();
  const dispatch = useAppDispatch();
  const { updateCache } = useApolloClient();
  const [toggleCategoryBookmark] = useToggleExamCategoryBookmark();
  const [
    getExamCategories,
    {
      data: searchedCategoriesResponse,
      loading: fetchCategoriesLoading,
      refetch,
    },
  ] = useLazyGetExamCategories();
  const searchedCategories =
    searchedCategoriesResponse?.getExamCategories.categories ||
    ([] as MockExamCategory[]);
  const moduStorageCategories = useAppSelector(
    (state) => state.home.moduStorageCategories
  );
  const userStorageCategories = useAppSelector(
    (state) => state.home.userStorageCategories
  );

  const fetchCategories = async (input: GetExamCategoriesInput) => {
    try {
      await getExamCategories({
        variables: {
          input,
        },
      });
    } catch (error) {
      handleError(error);
    }
  };

  const refetchHomeCategories = async () => {
    try {
      const [moduCategoriesResponse, userCategoriesResponse] =
        await Promise.all([
          refetch({
            input: {
              examSource: ExamSource.MoudCbt,
              limit: 30,
              isPublicOnly: true,
            },
          }),
          refetch({
            input: {
              examSource: ExamSource.User,
              limit: 30,
              isPublicOnly: true,
            },
          }),
        ]);
      setModuStorageCategories(
        moduCategoriesResponse.data.getExamCategories
          .categories as MockExamCategory[]
      );
      setUserStorageCategories(
        userCategoriesResponse.data.getExamCategories
          .categories as MockExamCategory[]
      );
    } catch (error) {
      handleError(error);
    }
  };

  const handleToggleCategoryBookmark = async ({
    categoryId,
    type,
    input,
  }: handleToggleCategoryBookmarkProps) => {
    try {
      if (!handleCheckLogin()) return;
      const res = await toggleCategoryBookmark({
        variables: {
          input: {
            categoryId,
          },
        },
      });
      if (res.data.toggleExamCategorieBookmark.ok) {
        if (type === 'modu') {
          const newCategories = cloneDeep(moduStorageCategories);
          if (!newCategories) return;
          const targetIndex = newCategories.findIndex(
            (category) => category.id === categoryId
          );
          if (targetIndex === -1) return;
          newCategories[targetIndex].isBookmarked =
            !newCategories[targetIndex].isBookmarked;
          setModuStorageCategories(newCategories);
        }
        if (type === 'user') {
          const newCategories = cloneDeep(userStorageCategories);
          if (!newCategories) return;
          const targetIndex = newCategories.findIndex(
            (category) => category.id === categoryId
          );
          if (targetIndex === -1) return;
          newCategories[targetIndex].isBookmarked =
            !newCategories[targetIndex].isBookmarked;
          setUserStorageCategories(newCategories);
        }
        if (type === 'search') {
          const newCategories = cloneDeep(searchedCategories);
          if (!newCategories) return;
          const targetIndex = newCategories.findIndex(
            (category) => category.id === categoryId
          );
          if (targetIndex === -1) return;
          newCategories[targetIndex].isBookmarked =
            !newCategories[targetIndex].isBookmarked;
          setSearchedCategories(newCategories as MockExamCategory[], input);
        }
        if (res.data.toggleExamCategorieBookmark.isBookmarked)
          return message.success('북마크 되었습니다.');
        else return message.success('북마크가 해제되었습니다.');
      }
      message.error(res.data?.toggleExamCategorieBookmark.error);
    } catch (e) {
      handleError(e);
      message.error('북마크 설정에 실패했습니다.');
    }
  };

  const setModuStorageCategories = (categories: MockExamCategory[]) =>
    dispatch(storageActions.setModuStorageCategories({ categories }));

  const setUserStorageCategories = (categories: MockExamCategory[]) =>
    dispatch(storageActions.setUserStorageCategories({ categories }));

  const setSearchedCategories = (
    categories: MockExamCategory[],
    input: GetExamCategoriesInput
  ) => {
    updateCache<GetExamCategoriesQuery>(
      {
        query: GET_EXAM_CATEGORIES,
        variables: {
          input,
        },
      },
      (data) => {
        return {
          ...data,
          getExamCategories: {
            ...data.getExamCategories,
            categories,
          },
        };
      }
    );
  };

  return {
    searchedCategories,
    fetchCategories,
    refetchHomeCategories,
    fetchCategoriesLoading,
    moduStorageCategories,
    userStorageCategories,
    handleToggleCategoryBookmark,
  };
};

export default useHomeCategories;
