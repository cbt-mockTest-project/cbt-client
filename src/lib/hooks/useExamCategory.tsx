import {
  EditMockExamCategoryInput,
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
  useMoveExamOrder,
  useRemoveExamFromCategory,
} from '../graphql/hook/useExam';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { handleError } from '@lib/utils/utils';
import { examCategoryActions } from '@modules/redux/slices/examCategory';
import { useRouter } from 'next/router';
import { message } from 'antd';
import { debounce } from 'lodash';
import { useToggleExamBookmark } from '@lib/graphql/hook/useExamBookmark';
import { WatchQueryFetchPolicy } from '@apollo/client';
import { useToggleExamCategoryBookmark } from '@lib/graphql/hook/useExamCategoryBookmark';
import useAuth from './useAuth';
import { DropResult } from 'react-beautiful-dnd';
import { examSettingActions } from '@modules/redux/slices/examSetting';

const useExamCategory = () => {
  const router = useRouter();
  const [moveExamOrder] = useMoveExamOrder();
  const { handleCheckLogin } = useAuth();
  const [toggleCategoryBookmark] = useToggleExamCategoryBookmark();
  const [readCategory] = useLazyReadCategoryById();
  const [getMyExams] = useLazyGetMyExams();
  const [addExamToCategory] = useAddExamToCategory();
  const [removeExamFromCategory] = useRemoveExamFromCategory();
  const [deleteCategory] = useDeleteExamCategory();
  const [toggleExamBookmark] = useToggleExamBookmark();
  const [editCategory, { loading: editCategoryLoading }] = useEditCategory();
  const dispatch = useAppDispatch();

  interface HandleCategoryCommonArgs {
    examId: number;
    categoryId: number;
  }

  const handleExamSelect = (input: HandleCategoryCommonArgs) =>
    dispatch(examSettingActions.toggleExamSelect(input));

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
      if (res.data?.getMyExams.ok) {
        setMyExams(res.data.getMyExams.exams as MockExam[]);
      }
    } catch (e) {
      handleError(e);
    }
  };

  const handleToggleCategoryBookmark = async (categoryId: number) => {
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
        dispatch(examCategoryActions.toggleCategoryBookmark());
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

  const handleEditCategory = async (
    input: EditMockExamCategoryInput,
    successCallback?: () => void
  ) => {
    try {
      const res = await editCategory({
        variables: {
          input,
        },
      });
      if (res.data?.editMockExamCategory.ok) {
        dispatch(examCategoryActions.editCategory(input));
        message.success('폴더가 수정되었습니다.');
        successCallback?.();
        return;
      }
      message.error(res.data?.editMockExamCategory.error);
    } catch (e) {
      handleError(e);
      message.error('폴더 수정에 실패했습니다.');
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      if (!categoryId) return;
      const res = await deleteCategory({
        variables: {
          input: {
            id: categoryId,
          },
        },
      });
      if (res.data?.deleteMockExamCategory.ok) {
        router.push('/me/storage');
        return;
      }
      message.error(res.data?.deleteMockExamCategory.error);
    } catch (e) {
      handleError(e);
      message.error('폴더 삭제에 실패했습니다.');
    }
  };

  const handleAddExamToCategory = async ({
    examId,
    categoryId,
  }: HandleCategoryCommonArgs) => {
    try {
      if (!categoryId) return;
      const res = await addExamToCategory({
        variables: {
          input: {
            categoryId,
            examId,
          },
        },
      });
      if (res.data?.addExamToCategory.ok) {
        dispatch(examCategoryActions.addExamToCategory(examId));
        return;
      }
      message.error(res.data?.addExamToCategory.error);
    } catch (e) {
      handleError(e);
    }
  };

  const handleRemoveExamFromCategory = async ({
    examId,
    categoryId,
  }: HandleCategoryCommonArgs) => {
    try {
      if (!categoryId) return;
      const res = await removeExamFromCategory({
        variables: {
          input: {
            categoryId,
            examId,
          },
        },
      });
      if (res.data?.removeExamFromCategory.ok) {
        handleExamSelect({
          examId,
          categoryId,
        });
        dispatch(examCategoryActions.removeExamFromCategory(examId));
        return;
      }
      message.error(res.data?.removeExamFromCategory.error);
    } catch (e) {
      handleError(e);
    }
  };

  const handleFilterExams = debounce((keyword: string) => {
    dispatch(examCategoryActions.filterExams(keyword));
  }, 300);

  const handleFilterMyExams = debounce((keyword: string) => {
    dispatch(examCategoryActions.filterMyExams(keyword));
  }, 300);

  const handleToggleExamBookmark = async (examId: number) => {
    try {
      if (!handleCheckLogin()) return;
      const res = await toggleExamBookmark({
        variables: {
          input: {
            examId,
          },
        },
      });
      if (res.data?.toggleExamBookmark.ok) {
        dispatch(examCategoryActions.toggleExamBookmark(examId));
        if (res.data.toggleExamBookmark.isBookmarked)
          return message.success('북마크 되었습니다.');
        else return message.success('북마크가 해제되었습니다.');
      }
      message.error(res.data?.toggleExamBookmark.error);
    } catch (e) {
      handleError(e);
    }
  };

  interface HandleMoveExamOrderArgs {
    result: DropResult;
    categoryId: number;
  }

  const handleMoveExamOrder = async ({
    result,
    categoryId,
  }: HandleMoveExamOrderArgs) => {
    try {
      const { destination, source } = result;
      dispatch(examCategoryActions.moveExamOrder(result));
      const res = await moveExamOrder({
        variables: {
          input: {
            categoryId,
            startIdx: source.index,
            endIdx: destination.index,
          },
        },
      });
      if (!res.data?.moveExamOrder.ok) {
        message.error(res.data.moveExamOrder.error);
        dispatch(examCategoryActions.moveExamOrder(result));
        return;
      }
    } catch (e) {
      handleError(e);
      message.error('순서 변경에 실패했습니다.');
      dispatch(examCategoryActions.moveExamOrder(result));
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
    handleMoveExamOrder,
    fetchMyExams,
    setExamCategory,
    handleDeleteCategory,
    handleEditCategory,
    handleAddExamToCategory,
    handleRemoveExamFromCategory,
    handleToggleExamBookmark,
    handleToggleCategoryBookmark,
    handleFilterExams,
    handleFilterMyExams,
    editCategoryLoading,
  };
};

export default useExamCategory;
