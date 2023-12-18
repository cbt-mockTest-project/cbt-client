import {
  useCreateExamCategory,
  useLazyGetExamCategories,
} from '@lib/graphql/hook/useExam';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { handleError } from '@lib/utils/utils';
import { storageActions } from '@modules/redux/slices/storage';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { message } from 'antd';
import { StorageType } from 'customTypes';
import {
  CreateMockExamCategoryInput,
  GetExamCategoriesInput,
  MockExamCategory,
} from 'types';

const useStorage = (type: StorageType) => {
  const dispatch = useAppDispatch();
  const [getExamCategories, { data: getExamCategoriesQuery }] =
    useLazyGetExamCategories();

  const { data: meQuery } = useMeQuery();
  const categories = useAppSelector((state) => {
    if (type === StorageType.PREMIUM)
      return state.storage.premiumStorageCategories;
    if (type === StorageType.MY) return state.storage.myStorageCategories;
    if (type === StorageType.USER) return state.storage.userStorageCategories;
    return state.storage.moduStorageCategories;
  });
  const [createCategory, { loading: createCategoryLoading }] =
    useCreateExamCategory();

  const fetchCategories = async (input: GetExamCategoriesInput) => {
    const res = await getExamCategories({
      variables: {
        input,
      },
      fetchPolicy: getExamCategoriesQuery ? 'cache-first' : 'network-only',
    });
    if (res.data?.getExamCategories.categories) {
      setCategories(
        res.data?.getExamCategories.categories as MockExamCategory[]
      );
    }
  };

  const handleCreateCategory = async (input: CreateMockExamCategoryInput) => {
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
          user: meQuery.me.user,
        } as MockExamCategory;
        setCategories([category, ...(categories || [])]);
        message.success('폴더가 생성되었습니다.');
        return;
      }
      message.error(res.data?.createMockExamCategory.error);
    } catch (e) {
      message.error('폴더 생성에 실패했습니다.');
      handleError(e);
    }
  };

  const setModuCateogries = (categories: MockExamCategory[]) =>
    dispatch(storageActions.setModuStorageCategories(categories));

  const setPremiumCateogries = (categories: MockExamCategory[]) =>
    dispatch(storageActions.setPremiumStorageCategories(categories));

  const setMyCateogries = (categories: MockExamCategory[]) =>
    dispatch(storageActions.setMyStorageCategories(categories));

  const setUserCateogries = (categories: MockExamCategory[]) =>
    dispatch(storageActions.setUserStorageCategories(categories));

  const setCategories = (categories: MockExamCategory[]) => {
    if (type === StorageType.MODU) setModuCateogries(categories);
    if (type === StorageType.PREMIUM) setPremiumCateogries(categories);
    if (type === StorageType.MY) setMyCateogries(categories);
    if (type === StorageType.USER) setUserCateogries(categories);
  };

  return {
    categories,
    handleCreateCategory,
    createCategoryLoading,
    fetchCategories,
  };
};

export default useStorage;
