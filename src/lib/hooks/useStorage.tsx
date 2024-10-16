import {
  useCreateExamCategory,
  useLazyGetExamCategories,
} from '@lib/graphql/hook/useExam';
import { useToggleExamCategoryBookmark } from '@lib/graphql/hook/useExamCategoryBookmark';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { handleError } from '@lib/utils/utils';
import { storageActions } from '@modules/redux/slices/storage';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { App } from 'antd';
import { StorageType } from 'customTypes';
import { cloneDeep, debounce, isEqual } from 'lodash';
import {
  CreateMockExamCategoryInput,
  GetExamCategoriesInput,
  MockExamCategory,
} from 'types';
import useAuth from './useAuth';

const useStorage = (type: StorageType) => {
  const { message } = App.useApp();
  const dispatch = useAppDispatch();
  const [getExamCategories, { data: getExamCategoriesQuery, refetch }] =
    useLazyGetExamCategories();

  const { data: meQuery } = useMeQuery();
  const categories = useAppSelector((state) => {
    if (type === StorageType.PREMIUM)
      return state.storage.premiumStorageCategories;
    if (type === StorageType.MY) return state.storage.myStorageCategories;
    if (type === StorageType.USER) return state.storage.userStorageCategories;
    if (type === StorageType.SEARCH) return state.storage.searchCategories;
    if (type === StorageType.BOOKMARK)
      return state.storage.bookmarkedStorageCategories;
    return state.storage.moduStorageCategories;
  });
  const originalCategories = useAppSelector((state) => {
    if (type === StorageType.PREMIUM)
      return state.storage.originalPremiumStorageCategories;
    if (type === StorageType.MY)
      return state.storage.originalMyStorageCategories;
    if (type === StorageType.USER)
      return state.storage.originalUserStorageCategories;
    if (type === StorageType.BOOKMARK)
      return state.storage.originalBookmarkedStorageCategories;
    if (type === StorageType.SEARCH)
      return state.storage.originalSearchCategories;
    return state.storage.originalModuStorageCategories;
  });
  const [createCategory, { loading: createCategoryLoading }] =
    useCreateExamCategory();

  const fetchCategories = async (
    input: GetExamCategoriesInput,
    order?: 'popular' | 'latest'
  ) => {
    if (type === StorageType.MY) {
      dispatch(storageActions.setMyCategoriesLoading());
    }
    const res = await getExamCategories({
      variables: {
        input,
      },
      fetchPolicy: getExamCategoriesQuery ? 'cache-first' : 'network-only',
    });
    let sortedCategories = [];
    if (order === 'popular') {
      sortedCategories = [...res.data.getExamCategories.categories].sort(
        (a, b) => b.categoryEvaluations.length - a.categoryEvaluations.length
      );
    }
    if (order === 'latest') {
      sortedCategories = [...res.data.getExamCategories.categories].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    if (!order) {
      sortedCategories = res.data.getExamCategories.categories;
    }
    setCategories(sortedCategories as MockExamCategory[]);
  };

  const refetchCategories = async (input: GetExamCategoriesInput) => {
    const res = await refetch({
      input,
    });
    if (
      res.data?.getExamCategories.categories &&
      !isEqual(categories, res.data.getExamCategories.categories)
    ) {
      setCategories(
        res.data?.getExamCategories.categories as MockExamCategory[]
      );
    }
  };

  const handleCreateCategory = async (
    input: CreateMockExamCategoryInput,
    successCallback?: () => void
  ) => {
    try {
      if (!meQuery?.me.user)
        return {
          ok: false,
          error: '로그인이 필요합니다.',
        };
      const res = await createCategory({
        variables: {
          input,
        },
      });
      if (res.data?.createMockExamCategory.ok) {
        const category = {
          ...res.data?.createMockExamCategory.category,
          mockExam: [],
          categoryEvaluations: [],
          user: meQuery.me.user,
        } as MockExamCategory;
        setCategories([category, ...(categories || [])]);
        message.success('폴더가 생성되었습니다.');
        successCallback?.();
        return;
      }
      message.error(res.data?.createMockExamCategory.error);
    } catch (e) {
      message.error('폴더 생성에 실패했습니다.');
      handleError(e);
    }
  };

  const handleFilterCategories = debounce((keyword: string) => {
    if (!originalCategories) return;
    const filteredCategories = originalCategories.filter((category) =>
      category.name.includes(keyword)
    );
    setCategories(filteredCategories, false);
  }, 300);

  const setModuCateogries = (
    categories: MockExamCategory[],
    shouldUpdateOriginal = true
  ) =>
    dispatch(
      storageActions.setModuStorageCategories({
        categories,
        shouldUpdateOriginal,
      })
    );

  const setPremiumCateogries = (
    categories: MockExamCategory[],
    shouldUpdateOriginal = true
  ) =>
    dispatch(
      storageActions.setPremiumStorageCategories({
        categories,
        shouldUpdateOriginal,
      })
    );

  const setMyCateogries = (
    categories: MockExamCategory[],
    shouldUpdateOriginal: boolean
  ) =>
    dispatch(
      storageActions.setMyStorageCategories({
        categories,
        shouldUpdateOriginal,
      })
    );

  const setUserCateogries = (
    categories: MockExamCategory[],
    shouldUpdateOriginal: boolean
  ) =>
    dispatch(
      storageActions.setUserStorageCategories({
        categories,
        shouldUpdateOriginal,
      })
    );

  const setBookmarkedCateogries = (
    categories: MockExamCategory[],
    shouldUpdateOriginal: boolean
  ) =>
    dispatch(
      storageActions.setBookmarkedStorageCategories({
        categories,
        shouldUpdateOriginal,
      })
    );

  const setSearchCategories = (
    categories: MockExamCategory[],
    shouldUpdateOriginal: boolean
  ) =>
    dispatch(
      storageActions.setSearchCategories({
        categories,
        shouldUpdateOriginal,
      })
    );

  const setCategories = (
    categories: MockExamCategory[],
    shouldUpdateOriginal = true
  ) => {
    if (type === StorageType.MODU)
      setModuCateogries(categories, shouldUpdateOriginal);
    if (type === StorageType.PREMIUM)
      setPremiumCateogries(categories, shouldUpdateOriginal);
    if (type === StorageType.MY)
      setMyCateogries(categories, shouldUpdateOriginal);
    if (type === StorageType.USER)
      setUserCateogries(categories, shouldUpdateOriginal);
    if (type === StorageType.BOOKMARK)
      setBookmarkedCateogries(categories, shouldUpdateOriginal);
    if (type === StorageType.SEARCH)
      setSearchCategories(categories, shouldUpdateOriginal);
  };

  return {
    categories,
    handleCreateCategory,
    createCategoryLoading,
    handleFilterCategories,
    fetchCategories,
    refetchCategories,
  };
};

export default useStorage;
