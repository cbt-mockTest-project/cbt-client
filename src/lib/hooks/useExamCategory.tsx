import {
  ExamSource,
  MockExamCategory,
  ReadMockExamCategoryByCategoryIdInput,
} from 'types';
import {
  useDeleteExamCategory,
  useLazyReadCategoryById,
} from '../graphql/user/hook/useExam';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { handleError } from '@lib/utils/utils';
import { examCategoryActions } from '@modules/redux/slices/examCategory';
import { useRouter } from 'next/router';
import { message } from 'antd';

const useExamCategory = () => {
  const router = useRouter();
  const [readCategory] = useLazyReadCategoryById();
  const [deleteCategoryMutation, { loading: deleteCategoryLoading }] =
    useDeleteExamCategory();
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.examCategory.category);
  const originalCategory = useAppSelector(
    (state) => state.examCategory.originalCategory
  );

  const fetchCategory = async (
    input: ReadMockExamCategoryByCategoryIdInput
  ) => {
    try {
      const res = await readCategory({
        variables: {
          input,
        },
      });
      if (res.data?.readMockExamCategoryByCategoryId.category) {
        setExamCategory(
          res.data.readMockExamCategoryByCategoryId.category as MockExamCategory
        );
      }
    } catch (e) {
      handleError(e);
    }
  };

  const deleteCategory = async () => {
    try {
      console.log('hi');
      console.log(category.id);
      if (!category?.id) return;
      console.log('bi');
      const res = await deleteCategoryMutation({
        variables: {
          input: {
            id: category?.id,
          },
        },
      });
      if (res.data?.deleteMockExamCategory.ok) {
        const path =
          category.source === ExamSource.User
            ? '/user-storage'
            : category.source === ExamSource.EhsMaster
            ? '/premium-storage'
            : '/modu-storage';
        router.push(path);
        return;
      }
      message.error(res.data?.deleteMockExamCategory.error);
    } catch (e) {
      handleError(e);
      message.error('카테고리 삭제에 실패했습니다.');
    }
  };

  const setExamCategory = (
    category: MockExamCategory,
    shouldUpdateOriginal: boolean = true
  ) => {
    dispatch(
      examCategoryActions.setCategory({ category, shouldUpdateOriginal })
    );
  };

  return {
    fetchCategory,
    setExamCategory,
    category,
    deleteCategory,
    originalCategory,
  };
};

export default useExamCategory;
