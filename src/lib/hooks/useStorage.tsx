import {
  useCreateExamCategory,
  useLazyGetExamCategories,
} from '@lib/graphql/user/hook/useExam';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { handleError } from '@lib/utils/utils';
import { storageActions } from '@modules/redux/slices/storage';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { message } from 'antd';
import { StorageType } from 'customTypes';
import { useMemo } from 'react';
import {
  CreateMockExamCategoryInput,
  ExamSource,
  MockExamCategory,
} from 'types';

const useStorage = (type: StorageType) => {
  const dispatch = useAppDispatch();
  const [getExamCategories] = useLazyGetExamCategories();
  const { data: meQuery } = useMeQuery();
  const categories = useAppSelector((state) => {
    if (type === StorageType.PREMIUM)
      return state.storage.premiumStorageCategories;
    if (type === StorageType.MY) return state.storage.myStorageCategories;
    return state.storage.moduStorageCategories;
  });
  const [createCategory, { loading: createCategoryLoading }] =
    useCreateExamCategory();

  const examSource = useMemo(() => {
    if (type === StorageType.PREMIUM) return ExamSource.EhsMaster;
    if (type === StorageType.MY) return ExamSource.User;
    return ExamSource.MoudCbt;
  }, [type]);

  const fetchCategories = async () => {
    const res = await getExamCategories({
      variables: {
        input: {
          examSource,
        },
      },
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
        setCategories([category, ...categories]);
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

  const setCategories = (categories: MockExamCategory[]) => {
    if (type === StorageType.MODU) setModuCateogries(categories);
    if (type === StorageType.PREMIUM) setPremiumCateogries(categories);
    if (type === StorageType.MY) setMyCateogries(categories);
  };

  return {
    categories,
    handleCreateCategory,
    createCategoryLoading,
    fetchCategories,
  };
};

export default useStorage;
