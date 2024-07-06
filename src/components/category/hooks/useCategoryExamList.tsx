import { examCategoryActions } from '@modules/redux/slices/examCategory';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { debounce } from 'lodash';
import { MockExam, MockExamCategory } from 'types';
import { queryClient } from '../../../../pages/_app';
import { getCategoryKey } from '@lib/queryOptions/getCategoryQueryOption';
import { useRouter } from 'next/router';
import {
  useAddExamToCategory,
  useDeleteExamCategory,
  useRemoveExamFromCategory,
} from '@lib/graphql/hook/useExam';
import { App } from 'antd';
import { handleError } from '@lib/utils/utils';
import { examSettingActions } from '@modules/redux/slices/examSetting';
import { DropResult } from 'react-beautiful-dnd';
import useCategoryMutation from '@lib/mutation/useCategoryMutation';
import { useEffect } from 'react';

interface HandleCategoryCommonArgs {
  examId: number;
  categoryId: number;
}

const useCategoryExamList = () => {
  const { message } = App.useApp();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const urlSlug = router.query.name as string;
  const { moveExamOrderMutation } = useCategoryMutation(urlSlug);
  const [deleteCategory] = useDeleteExamCategory();
  const [addExamToCategory] = useAddExamToCategory();
  const [removeExamFromCategory] = useRemoveExamFromCategory();
  const category = queryClient.getQueryData<MockExamCategory>(
    getCategoryKey(urlSlug)
  );

  const originalCategoryExamsInStore = useAppSelector(
    (state) => state.examCategory.originalCategoryExams
  );

  const categoryExamsInStore = useAppSelector(
    (state) => state.examCategory.categoryExams
  );

  const originalCategoryExams =
    originalCategoryExamsInStore || category.mockExam;

  const categoryExams = categoryExamsInStore || category.mockExam;

  const handleSearch = debounce((keyword: string) => {
    const trimmedKeyword = keyword.trim().toLowerCase();
    if (trimmedKeyword === '') {
      setCategoryExams(originalCategoryExams || [], false);
    } else {
      const filtered = originalCategoryExams.filter((item) =>
        item.title.toLowerCase().includes(trimmedKeyword)
      );
      setCategoryExams(filtered, false);
    }
  }, 30);

  const handleMoveExam = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination || !source) return;
    if (destination.index === source.index) return;
    const newExams = [...categoryExams];
    const [removed] = newExams.splice(source.index, 1);
    newExams.splice(destination.index, 0, removed);
    setCategoryExams(newExams);

    moveExamOrderMutation.mutate({
      dropResult: result,
      exams: categoryExams,
      mutationInput: {
        categoryId: category.id,
        startIdx: result.source?.index || 0,
        endIdx: result.destination?.index || 0,
      },
      onError: () => {
        setCategoryExams(categoryExams, false);
      },
    });
  };

  const handleExamSelect = (input: HandleCategoryCommonArgs) =>
    dispatch(examSettingActions.toggleExamSelect(input));

  const handleAddExamToCategory = async ({
    examId,
    categoryId,
  }: HandleCategoryCommonArgs) => {
    if (!categoryId) return;
    try {
      const res = await addExamToCategory({
        variables: { input: { categoryId, examId } },
      });
      if (res.data?.addExamToCategory.ok) {
        dispatch(examCategoryActions.addExamToCategory(examId));
      } else {
        message.error(res.data?.addExamToCategory.error);
      }
    } catch (e) {
      handleError(e);
    }
  };

  const handleRemoveExamFromCategory = async ({
    examId,
    categoryId,
  }: HandleCategoryCommonArgs) => {
    if (!categoryId) return;
    try {
      const res = await removeExamFromCategory({
        variables: { input: { categoryId, examId } },
      });
      if (res.data?.removeExamFromCategory.ok) {
        handleExamSelect({ examId, categoryId });
        dispatch(examCategoryActions.removeExamFromCategory(examId));
      } else {
        message.error(res.data?.removeExamFromCategory.error);
      }
    } catch (e) {
      handleError(e);
    }
  };

  const setCategoryExams = (exams: MockExam[], shouldUpdateOriginal = true) => {
    dispatch(
      examCategoryActions.setCategoryExams({
        categoryExams: exams,
        shouldUpdateOriginal,
      })
    );
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

  return {
    handleSearch,
    setCategoryExams,
    categoryExams,
    handleAddExamToCategory,
    handleDeleteCategory,
    handleRemoveExamFromCategory,
    handleMoveExam,
  };
};

export default useCategoryExamList;
