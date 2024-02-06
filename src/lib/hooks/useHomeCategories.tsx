import { useLazyGetExamCategories } from '@lib/graphql/hook/useExam';
import { handleError } from '@lib/utils/utils';
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
import { Modal, message } from 'antd';
import useAuth from './useAuth';
import { homeActions } from '@modules/redux/slices/home';
import { useResetRecentlyStudiedCategory } from '@lib/graphql/hook/useUser';

export interface handleToggleCategoryBookmarkProps {
  categoryId: number;
  type: 'search' | 'modu' | 'user' | 'ehs' | 'recentlyStudied';
  input?: GetExamCategoriesInput;
}

const useHomeCategories = () => {
  const { handleCheckLogin, user, isLoggedIn } = useAuth();
  const dispatch = useAppDispatch();
  const { updateCache, client } = useApolloClient();
  const [toggleCategoryBookmark] = useToggleExamCategoryBookmark();
  const [resetRecentlyStudiedCategory] = useResetRecentlyStudiedCategory();
  const [
    getExamCategories,
    { data: searchedCategoriesResponse, loading: fetchCategoriesLoading },
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
  const ehsStorageCategories = useAppSelector(
    (state) => state.home.ehsStorageCategories
  );
  const recentlyStudiedCategories = useAppSelector(
    (state) => state.home.recentlyStudiedCategories
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
      const getCategories = (input: GetExamCategoriesInput) =>
        client
          .query<GetExamCategoriesQuery>({
            query: GET_EXAM_CATEGORIES,
            variables: {
              input,
            },
          })
          .then((res) => res.data.getExamCategories.categories || []);
      const [
        moduCategories,
        userCategories,
        ehsCategories,
        recentlyStudiedCategories,
      ] = await Promise.all([
        getCategories({
          examSource: ExamSource.MoudCbt,
          limit: 30,
          isPublicOnly: true,
        }),
        getCategories({
          examSource: ExamSource.User,
          limit: 30,
          isPublicOnly: true,
        }),
        getCategories({
          examSource: ExamSource.EhsMaster,
          limit: 30,
          isPublicOnly: true,
        }),
        getCategories({
          limit: 30,
          isPublicOnly: false,
          categoryIds: isLoggedIn ? user.recentlyStudiedCategory : [],
        }),
      ]);
      setModuStorageCategories(moduCategories as MockExamCategory[]);
      setUserStorageCategories(userCategories as MockExamCategory[]);
      setEhsStorageCategories(ehsCategories as MockExamCategory[]);
      setRecentlyStudiedCategories(
        recentlyStudiedCategories as MockExamCategory[]
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
        if (type === 'ehs') {
          const newCategories = cloneDeep(ehsStorageCategories);
          if (!newCategories) return;
          const targetIndex = newCategories.findIndex(
            (category) => category.id === categoryId
          );
          if (targetIndex === -1) return;
          newCategories[targetIndex].isBookmarked =
            !newCategories[targetIndex].isBookmarked;
          setEhsStorageCategories(newCategories);
        }
        if (type === 'recentlyStudied') {
          const newCategories = cloneDeep(recentlyStudiedCategories);
          if (!newCategories) return;
          const targetIndex = newCategories.findIndex(
            (category) => category.id === categoryId
          );
          if (targetIndex === -1) return;
          newCategories[targetIndex].isBookmarked =
            !newCategories[targetIndex].isBookmarked;
          setRecentlyStudiedCategories(newCategories);
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

  const handleResetRecentlyStudiedCategories = () => {
    Modal.confirm({
      title: '최근 학습한 암기장 기록을 초기화 하시겠습니까?',
      onOk: async () => {
        try {
          await resetRecentlyStudiedCategory();
          setRecentlyStudiedCategories([]);
          message.success('초기화 되었습니다.');
        } catch (e) {
          handleError(e);
          message.error('초기화에 실패했습니다.');
        }
      },
    });
  };

  const setModuStorageCategories = (categories: MockExamCategory[]) =>
    dispatch(homeActions.setModuStorageCategories({ categories }));

  const setUserStorageCategories = (categories: MockExamCategory[]) =>
    dispatch(homeActions.setUserStorageCategories({ categories }));

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

  const setEhsStorageCategories = (categories: MockExamCategory[]) =>
    dispatch(homeActions.setEhsStorageCategories({ categories }));

  const setRecentlyStudiedCategories = (categories: MockExamCategory[]) =>
    dispatch(homeActions.setRecentlyStudiedCategories({ categories }));

  return {
    searchedCategories,
    fetchCategories,
    refetchHomeCategories,
    fetchCategoriesLoading,
    moduStorageCategories,
    userStorageCategories,
    ehsStorageCategories,
    recentlyStudiedCategories,
    handleToggleCategoryBookmark,
    handleResetRecentlyStudiedCategories,
  };
};

export default useHomeCategories;
