import {
  EditMockExamCategoryInput,
  ExamSource,
  MockExamCategory,
  ReadMockExamCategoryByCategoryIdInput,
} from 'types';
import {
  useDeleteExamCategory,
  useEditCategory,
  useLazyReadCategoryById,
} from '../graphql/hook/useExam';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { handleError } from '@lib/utils/utils';
import { examCategoryActions } from '@modules/redux/slices/examCategory';
import { useRouter } from 'next/router';
import { message } from 'antd';
import { useMemo } from 'react';
import { StorageType } from 'customTypes';

const useExamCategory = () => {
  const router = useRouter();
  const [readCategory] = useLazyReadCategoryById();
  const [deleteCategory] = useDeleteExamCategory();
  const [editCategory, { loading: editCategoryLoading }] = useEditCategory();

  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.examCategory.category);
  const originalCategory = useAppSelector(
    (state) => state.examCategory.originalCategory
  );
  const storageType = useMemo(() => {
    if (category?.source === ExamSource.EhsMaster) return StorageType.PREMIUM;
    if (category?.source === ExamSource.MoudCbt) return StorageType.MODU;
    return StorageType.MY;
  }, [category]);

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

  const handleEditCategory = async (input: EditMockExamCategoryInput) => {
    try {
      const res = await editCategory({
        variables: {
          input,
        },
      });
      if (res.data?.editMockExamCategory.ok) {
        const updatedCategory = { ...category, ...input } as MockExamCategory;
        setExamCategory(updatedCategory);
        message.success('폴더가 수정되었습니다.');
        return;
      }
      message.error(res.data?.editMockExamCategory.error);
    } catch (e) {
      handleError(e);
      message.error('폴더 수정에 실패했습니다.');
    }
  };

  const handleDeleteCategory = async () => {
    try {
      if (!category?.id) return;
      console.log('bi');
      const res = await deleteCategory({
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
      message.error('폴더 삭제에 실패했습니다.');
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
    storageType,
    handleDeleteCategory,
    handleEditCategory,
    editCategoryLoading,
    originalCategory,
  };
};

export default useExamCategory;
