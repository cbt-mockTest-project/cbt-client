import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  FindMyExamHistoryInput,
  ReadMockExamCategoriesInput,
  ReadMockExamCategoryByExamIdInput,
} from 'types';
import {
  ADD_EXAM_TO_CATEGORY,
  CREATE_MOCK_EXAM_CATEGORY,
  CREATE_MOCK_EXAM_TITLE,
  DELETE_MOCK_EXAM,
  DELETE_MOCK_EXAM_CATEGORY,
  EDIT_EXAM_CATEGORY,
  EDIT_MOCK_EXAM,
  FIND_MY_EXAM_HISTORY_QUERY,
  GET_EXAM_CATEGORIES,
  GET_EXAM_CATEGORY_LEARNING_PROGRESS,
  GET_MY_ALL_EXAM_CATEGORIES_LEARNING_PROGRESS,
  GET_MY_EXAMS,
  GET_MY_EXAM_CATEGORIES,
  MOVE_EXAM_ORDER,
  READ_EXAM_CATEGORIES,
  READ_EXAM_CATEGORY_BY_EXAM_ID,
  READ_EXAM_CATEGORY_BY_ID,
  READ_EXAM_TITLES_QUERY,
  READ_MOCK_EXAM,
  READ_MY_EXAM_CATEORIES_QUERY,
  REMOVE_EXAM_FROM_CATEGORY,
  SAVE_EXAM,
  UPDATE_EXAM_ORDER,
} from '../query/examQuery';
import {
  AddExamToCategoryMutation,
  AddExamToCategoryMutationVariables,
  CreateMockExamCategoryMutation,
  CreateMockExamCategoryMutationVariables,
  CreateMockExamMutation,
  CreateMockExamMutationVariables,
  DeleteMockExamCategoryMutation,
  DeleteMockExamCategoryMutationVariables,
  DeleteMockExamMutation,
  DeleteMockExamMutationVariables,
  EditMockExamCategoryMutation,
  EditMockExamCategoryMutationVariables,
  EditMockExamMutation,
  EditMockExamMutationVariables,
  FindMyExamHistoryQuery,
  FindMyExamHistoryQueryVariables,
  GetExamCategoriesQuery,
  GetExamCategoriesQueryVariables,
  GetExamCategoryLearningProgressQuery,
  GetExamCategoryLearningProgressQueryVariables,
  GetMyAllExamCategoriesLearningProgressQuery,
  GetMyAllExamCategoriesLearningProgressQueryVariables,
  GetMyExamCategoriesQuery,
  GetMyExamCategoriesQueryVariables,
  GetMyExamsQuery,
  GetMyExamsQueryVariables,
  MoveExamOrderMutation,
  MoveExamOrderMutationVariables,
  ReadMockExamCategoriesQuery,
  ReadMockExamCategoriesQueryVariables,
  ReadMockExamCategoryByCategoryIdQuery,
  ReadMockExamCategoryByCategoryIdQueryVariables,
  ReadMockExamCategoryByExamIdQuery,
  ReadMockExamCategoryByExamIdQueryVariables,
  ReadMockExamQuery,
  ReadMockExamQueryVariables,
  ReadMockExamTitlesByCateoryQuery,
  ReadMockExamTitlesByCateoryQueryVariables,
  ReadMyMockExamCategoriesQuery,
  ReadMyMockExamCategoriesQueryVariables,
  RemoveExamFromCategoryMutation,
  RemoveExamFromCategoryMutationVariables,
  SaveExamMutation,
  SaveExamMutationVariables,
  UpdateExamOrderMutation,
  UpdateExamOrderMutationVariables,
} from '../query/examQuery.generated';

export const useLazyReadMyExamCategories = () =>
  useLazyQuery<
    ReadMyMockExamCategoriesQuery,
    ReadMyMockExamCategoriesQueryVariables
  >(READ_MY_EXAM_CATEORIES_QUERY);

export const useReadMyExamCategories = (type: 'author' | 'viewer' = 'author') =>
  useQuery<
    ReadMyMockExamCategoriesQuery,
    ReadMyMockExamCategoriesQueryVariables
  >(READ_MY_EXAM_CATEORIES_QUERY, {
    variables: {
      input: {
        type,
      },
    },
  });

export const useCreateExamCategory = () =>
  useMutation<
    CreateMockExamCategoryMutation,
    CreateMockExamCategoryMutationVariables
  >(CREATE_MOCK_EXAM_CATEGORY);

export const useReadExamTitles = () =>
  useLazyQuery<
    ReadMockExamTitlesByCateoryQuery,
    ReadMockExamTitlesByCateoryQueryVariables
  >(READ_EXAM_TITLES_QUERY);

export const useCreateExam = () =>
  useMutation<CreateMockExamMutation, CreateMockExamMutationVariables>(
    CREATE_MOCK_EXAM_TITLE
  );

export const useLazyFindMyExamHistory = () =>
  useLazyQuery<FindMyExamHistoryQuery, FindMyExamHistoryQueryVariables>(
    FIND_MY_EXAM_HISTORY_QUERY
  );

export const useFineMyExamHistory = (input: FindMyExamHistoryInput) =>
  useQuery<FindMyExamHistoryQuery, FindMyExamHistoryQueryVariables>(
    FIND_MY_EXAM_HISTORY_QUERY,
    { variables: { input } }
  );

export const useDeleteExamCategory = () =>
  useMutation<
    DeleteMockExamCategoryMutation,
    DeleteMockExamCategoryMutationVariables
  >(DELETE_MOCK_EXAM_CATEGORY, { fetchPolicy: 'network-only' });

export const useDeleteExam = () =>
  useMutation<DeleteMockExamMutation, DeleteMockExamMutationVariables>(
    DELETE_MOCK_EXAM,
    { fetchPolicy: 'network-only' }
  );

export const useEditExam = () =>
  useMutation<EditMockExamMutation, EditMockExamMutationVariables>(
    EDIT_MOCK_EXAM
  );

export const useEditCategory = () =>
  useMutation<
    EditMockExamCategoryMutation,
    EditMockExamCategoryMutationVariables
  >(EDIT_EXAM_CATEGORY);

export const useUpdateExamOrder = () =>
  useMutation<UpdateExamOrderMutation, UpdateExamOrderMutationVariables>(
    UPDATE_EXAM_ORDER
  );

export const useReadExamCategoryByExamId = (
  input: ReadMockExamCategoryByExamIdInput
) =>
  useQuery<
    ReadMockExamCategoryByExamIdQuery,
    ReadMockExamCategoryByExamIdQueryVariables
  >(READ_EXAM_CATEGORY_BY_EXAM_ID, {
    variables: {
      input,
    },
  });

export const useLazyReadExamCategoryByExamId = () =>
  useLazyQuery<
    ReadMockExamCategoryByExamIdQuery,
    ReadMockExamCategoryByExamIdQueryVariables
  >(READ_EXAM_CATEGORY_BY_EXAM_ID);

export const useReadExamCategories = (input: ReadMockExamCategoriesInput) =>
  useQuery<ReadMockExamCategoriesQuery, ReadMockExamCategoriesQueryVariables>(
    READ_EXAM_CATEGORIES,
    {
      variables: {
        input,
      },
    }
  );

export const useLazyGetExamCategories = () =>
  useLazyQuery<GetExamCategoriesQuery, GetExamCategoriesQueryVariables>(
    GET_EXAM_CATEGORIES
  );

export const useGetMyExams = () =>
  useQuery<GetMyExamsQuery, GetMyExamsQueryVariables>(GET_MY_EXAMS);

export const useLazyGetMyExams = () =>
  useLazyQuery<GetMyExamsQuery, GetMyExamsQueryVariables>(GET_MY_EXAMS);

export const useAddExamToCategory = () =>
  useMutation<AddExamToCategoryMutation, AddExamToCategoryMutationVariables>(
    ADD_EXAM_TO_CATEGORY
  );

export const useRemoveExamFromCategory = () =>
  useMutation<
    RemoveExamFromCategoryMutation,
    RemoveExamFromCategoryMutationVariables
  >(REMOVE_EXAM_FROM_CATEGORY);

export const useLazyGetMyExamCategories = () =>
  useLazyQuery<GetMyExamCategoriesQuery, GetMyExamCategoriesQueryVariables>(
    GET_MY_EXAM_CATEGORIES
  );

export const useGetMyCategories = () =>
  useQuery<GetMyExamCategoriesQuery, GetMyExamCategoriesQueryVariables>(
    GET_MY_EXAM_CATEGORIES
  );

export const useSaveExam = () =>
  useMutation<SaveExamMutation, SaveExamMutationVariables>(SAVE_EXAM);

export const useLazyReadMockExam = () =>
  useLazyQuery<ReadMockExamQuery, ReadMockExamQueryVariables>(READ_MOCK_EXAM);

export const useLazyGetExamCategoryLearningProgress = () =>
  useLazyQuery<
    GetExamCategoryLearningProgressQuery,
    GetExamCategoryLearningProgressQueryVariables
  >(GET_EXAM_CATEGORY_LEARNING_PROGRESS);

export const useLazyGetMyAllExamCategoriesLearningProgress = () =>
  useLazyQuery<
    GetMyAllExamCategoriesLearningProgressQuery,
    GetMyAllExamCategoriesLearningProgressQueryVariables
  >(GET_MY_ALL_EXAM_CATEGORIES_LEARNING_PROGRESS);

export const useMoveExamOrder = () =>
  useMutation<MoveExamOrderMutation, MoveExamOrderMutationVariables>(
    MOVE_EXAM_ORDER
  );
