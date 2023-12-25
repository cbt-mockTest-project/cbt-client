import {
  EditMockExamCategoryInput,
  ExamSource,
  MockExam,
  MockExamCategory,
  ReadMockExamCategoryByCategoryIdInput,
} from 'types';
import {
  useAddExamToCategory,
  useDeleteExamCategory,
  useEditCategory,
  useLazyGetMyExams,
  useLazyReadCategoryById,
  useRemoveExamFromCategory,
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
import useExamSetting from './useExamSetting';
import { cloneDeep, debounce, isEqual } from 'lodash';
import { useToggleExamBookmark } from '@lib/graphql/hook/useExamBookmark';
import { WatchQueryFetchPolicy } from '@apollo/client';

const useExamCategory = () => {
  const router = useRouter();
  const [readCategory] = useLazyReadCategoryById();
  const [getMyExams] = useLazyGetMyExams();
  const [addExamToCategory] = useAddExamToCategory();
  const [removeExamFromCategory] = useRemoveExamFromCategory();
  const [deleteCategory] = useDeleteExamCategory();
  const [toggleExamBookmark] = useToggleExamBookmark();
  const [editCategory, { loading: editCategoryLoading }] = useEditCategory();

  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.examCategory.category);
  const { handleExamSelect } = useExamSetting({ category });
  const myExams = useAppSelector((state) => state.examCategory.myExams);
  const originalMyExams = useAppSelector(
    (state) => state.examCategory.originalMyExams
  );
  const originalCategory = useAppSelector(
    (state) => state.examCategory.originalCategory
  );

  const storageType = useMemo(() => {
    if (category?.source === ExamSource.EhsMaster) return StorageType.PREMIUM;
    if (category?.source === ExamSource.MoudCbt) return StorageType.MODU;
    return StorageType.MY;
  }, [category]);

  const fetchCategory = async (
    input: ReadMockExamCategoryByCategoryIdInput,
    fetchPolicy: WatchQueryFetchPolicy = 'cache-and-network'
  ) => {
    try {
      const res = await readCategory({
        variables: {
          input,
        },
        fetchPolicy,
      });
      if (res.data?.readMockExamCategoryByCategoryId.category) {
        setExamCategory(
          res.data.readMockExamCategoryByCategoryId.category as MockExamCategory
        );
      }
      return res.data?.readMockExamCategoryByCategoryId.category;
    } catch (e) {
      handleError(e);
    }
  };

  const fetchMyExams = async ({
    isBookmarked = false,
  }: {
    isBookmarked?: boolean;
  }) => {
    try {
      const res = await getMyExams({
        variables: {
          input: {
            isBookmarked,
          },
        },
      });
      if (
        res.data?.getMyExams.ok &&
        !isEqual(myExams, res.data.getMyExams.exams)
      ) {
        setMyExams(res.data.getMyExams.exams as MockExam[]);
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
      const res = await deleteCategory({
        variables: {
          input: {
            id: category?.id,
          },
        },
      });
      if (res.data?.deleteMockExamCategory.ok) {
        router.push('/my-storage');
        return;
      }
      message.error(res.data?.deleteMockExamCategory.error);
    } catch (e) {
      handleError(e);
      message.error('폴더 삭제에 실패했습니다.');
    }
  };

  const handleAddExamToCategory = async (examId: number) => {
    try {
      if (!category?.id) return;
      const res = await addExamToCategory({
        variables: {
          input: {
            categoryId: category.id,
            examId,
          },
        },
      });
      if (res.data?.addExamToCategory.ok) {
        const newExam = myExams.find((exam) => exam.id === examId);
        const updatedCategory = {
          ...category,
          mockExam: [newExam, ...category.mockExam],
        } as MockExamCategory;
        setExamCategory(updatedCategory);
        return;
      }
      message.error(res.data?.addExamToCategory.error);
    } catch (e) {
      handleError(e);
    }
  };

  const handleRemoveExamFromCategory = async (examId: number) => {
    try {
      if (!category?.id) return;
      const res = await removeExamFromCategory({
        variables: {
          input: {
            categoryId: category.id,
            examId,
          },
        },
      });
      if (res.data?.removeExamFromCategory.ok) {
        handleExamSelect(examId);
        const updatedCategory = {
          ...category,
          mockExam: category.mockExam.filter((exam) => exam.id !== examId),
        } as MockExamCategory;
        setExamCategory(updatedCategory);
        return;
      }
      message.error(res.data?.removeExamFromCategory.error);
    } catch (e) {
      handleError(e);
    }
  };

  const handleFilterExams = debounce((keyword: string) => {
    if (!originalCategory) return;
    const filteredCategory = {
      ...originalCategory,
      mockExam: originalCategory.mockExam.filter((exam) =>
        exam.title.includes(keyword)
      ),
    };
    setExamCategory(filteredCategory, false);
  }, 300);

  const handleFilterMyExams = debounce((keyword: string) => {
    const filteredExams = originalMyExams.filter((exam) =>
      exam.title.includes(keyword)
    );
    setMyExams(filteredExams, false);
  }, 300);

  const handleToggleExamBookmark = async (examId: number) => {
    try {
      const res = await toggleExamBookmark({
        variables: {
          input: {
            examId,
          },
        },
      });
      if (res.data?.toggleExamBookmark.ok) {
        const newCategory = cloneDeep(category);
        if (!newCategory) return;
        newCategory.mockExam = newCategory.mockExam.map((exam) => {
          if (exam.id === examId) {
            exam.isBookmarked = !exam.isBookmarked;
          }
          return exam;
        });
        setExamCategory(newCategory);
        if (res.data.toggleExamBookmark.isBookmarked)
          return message.success('북마크 되었습니다.');
        else return message.success('북마크가 해제되었습니다.');
      }
      message.error(res.data?.toggleExamBookmark.error);
    } catch (e) {
      handleError(e);
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

  const setMyExams = (
    myExams: MockExam[],
    shouldUpdateOriginal: boolean = true
  ) =>
    dispatch(examCategoryActions.setMyExams({ myExams, shouldUpdateOriginal }));

  return {
    fetchCategory,
    fetchMyExams,
    setExamCategory,
    category,
    myExams,
    storageType,
    handleDeleteCategory,
    handleEditCategory,
    handleAddExamToCategory,
    handleRemoveExamFromCategory,
    handleToggleExamBookmark,
    handleFilterExams,
    handleFilterMyExams,
    editCategoryLoading,
    originalCategory,
  };
};

export default useExamCategory;
