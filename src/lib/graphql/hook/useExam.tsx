import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  FindMyExamHistoryInput,
  GetExamCategoriesInput,
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
  GET_MY_EXAMS,
  READ_EXAM_CATEGORIES,
  READ_EXAM_CATEGORIES_QUERY,
  READ_EXAM_CATEGORY_BY_EXAM_ID,
  READ_EXAM_CATEGORY_BY_ID,
  READ_EXAM_TITLES_QUERY,
  READ_MY_EXAM_CATEORIES_QUERY,
  REMOVE_EXAM_FROM_CATEGORY,
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
  GetMyExamsQuery,
  GetMyExamsQueryVariables,
  ReadMockExamCategoriesQuery,
  ReadMockExamCategoriesQueryVariables,
  ReadMockExamCategoryByCategoryIdQuery,
  ReadMockExamCategoryByCategoryIdQueryVariables,
  ReadMockExamCategoryByExamIdQuery,
  ReadMockExamCategoryByExamIdQueryVariables,
  ReadMockExamTitlesByCateoryQuery,
  ReadMockExamTitlesByCateoryQueryVariables,
  ReadMyMockExamCategoriesQuery,
  ReadMyMockExamCategoriesQueryVariables,
  RemoveExamFromCategoryMutation,
  RemoveExamFromCategoryMutationVariables,
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

export const useLazyReadCategoryById = () =>
  useLazyQuery<
    ReadMockExamCategoryByCategoryIdQuery,
    ReadMockExamCategoryByCategoryIdQueryVariables
  >(READ_EXAM_CATEGORY_BY_ID);

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
