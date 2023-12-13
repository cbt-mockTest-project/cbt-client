import {
  useCreateExamCategory,
  useEditCategory,
} from '@lib/graphql/user/hook/useExam';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { storageActions } from '@modules/redux/slices/storage';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { message } from 'antd';
import { StorageType } from 'customTypes';
import {
  CoreOutput,
  CreateMockExamCategoryInput,
  EditMockExamCategoryInput,
  MockExamCategory,
} from 'types';

const useStorage = (type: StorageType) => {
  const dispatch = useAppDispatch();
  const { data: meQuery } = useMeQuery();
  const categories = useAppSelector((state) => {
    if (type === StorageType.PREMIUM)
      return state.storage.premiumStorageCategories;
    if (type === StorageType.MY) return state.storage.myStorageCategories;
    return state.storage.moduStorageCategories;
  });
  const [createCategory, { loading: createCategoryLoading }] =
    useCreateExamCategory();
  const [editCategory, { loading: editCategoryLoading }] = useEditCategory();

  const handleCreateCategory = async (
    input: CreateMockExamCategoryInput
  ): Promise<CoreOutput> => {
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
      setCategories([...categories, category]);
      return {
        ok: true,
      };
    }
    return {
      ok: false,
      error: res.data?.createMockExamCategory.error,
    };
  };

  const handleEditCategory = async (input: EditMockExamCategoryInput) => {
    try {
      const res = await editCategory({
        variables: {
          input,
        },
      });

      if (res.data?.editMockExamCategory.ok) {
        const newCategories = categories.map((category) =>
          category.id === input.id ? { ...category, ...input } : category
        ) as MockExamCategory[];
        setCategories(newCategories);
        return;
      }
      message.error('카테고리 수정에 실패했습니다.');
    } catch {
      message.error('카테고리 수정에 실패했습니다.');
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
    handleEditCategory,
    createCategoryLoading,
    editCategoryLoading,
  };
};

export default useStorage;
