import {
  useCreateExamCategory,
  useEditCategory,
} from '@lib/graphql/user/hook/useExam';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { moduStorageActions } from '@modules/redux/slices/moduStorage';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { message } from 'antd';
import {
  CoreOutput,
  CreateMockExamCategoryInput,
  EditMockExamCategoryInput,
  MockExamCategory,
} from 'types';

const useModuCategories = () => {
  const dispatch = useAppDispatch();
  const { data: meQuery } = useMeQuery();
  const categories = useAppSelector((state) => state.moduStorage.categories);
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
      console.log(res.data?.createMockExamCategory.category);
      const category = {
        ...res.data?.createMockExamCategory.category,
        user: meQuery.me.user,
      } as MockExamCategory;
      dispatch(moduStorageActions.setCategories([...categories, category]));
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
        dispatch(moduStorageActions.setCategories(newCategories));
        return;
      }
      message.error('카테고리 수정에 실패했습니다.');
    } catch {
      message.error('카테고리 수정에 실패했습니다.');
    }
  };

  return {
    categories,
    handleCreateCategory,
    handleEditCategory,
    createCategoryLoading,
    editCategoryLoading,
  };
};

export default useModuCategories;
