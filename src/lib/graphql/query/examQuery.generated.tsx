import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ReadAllMockExamCategoriesQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.ReadAllMockExamCategoriesInput>;
}>;


export type ReadAllMockExamCategoriesQuery = { __typename?: 'Query', readAllMockExamCategories: { __typename?: 'ReadAllMockExamCategoriesOutput', error?: string | null, ok: boolean, categories: Array<{ __typename?: 'MockExamCategory', name: string, id: number, user: { __typename?: 'User', nickname: string, role: Types.UserRole }, partner?: { __typename?: 'Partner', id: number } | null }> } };

export type EditMockExamCategoryMutationVariables = Types.Exact<{
  input: Types.EditMockExamCategoryInput;
}>;


export type EditMockExamCategoryMutation = { __typename?: 'Mutation', editMockExamCategory: { __typename?: 'DeleteMockExamCategoryOutput', error?: string | null, ok: boolean } };

export type ReadMyMockExamCategoriesQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.ReadMyMockExamCategoriesInput>;
}>;


export type ReadMyMockExamCategoriesQuery = { __typename?: 'Query', readMyMockExamCategories: { __typename?: 'ReadMyMockExamCategoriesOutput', error?: string | null, ok: boolean, categories: Array<{ __typename?: 'MockExamCategory', name: string, id: number }> } };

export type EditMockExamMutationVariables = Types.Exact<{
  input: Types.EditMockExamInput;
}>;


export type EditMockExamMutation = { __typename?: 'Mutation', editMockExam: { __typename?: 'EditMockExamOutput', error?: string | null, ok: boolean } };

export type DeleteMockExamMutationVariables = Types.Exact<{
  input: Types.DeleteMockExamInput;
}>;


export type DeleteMockExamMutation = { __typename?: 'Mutation', deleteMockExam: { __typename?: 'DeleteMockExamOutput', error?: string | null, ok: boolean } };

export type DeleteMockExamCategoryMutationVariables = Types.Exact<{
  input: Types.DeleteMockExamCategoryInput;
}>;


export type DeleteMockExamCategoryMutation = { __typename?: 'Mutation', deleteMockExamCategory: { __typename?: 'DeleteMockExamCategoryOutput', error?: string | null, ok: boolean } };

export type CreateMockExamMutationVariables = Types.Exact<{
  input: Types.CreateMockExamInput;
}>;


export type CreateMockExamMutation = { __typename?: 'Mutation', createMockExam: { __typename?: 'CreateMockExamOutput', error?: string | null, ok: boolean, mockExam?: { __typename?: 'MockExam', id: number, title: string } | null } };

export type CreateMockExamCategoryMutationVariables = Types.Exact<{
  input: Types.CreateMockExamCategoryInput;
}>;


export type CreateMockExamCategoryMutation = { __typename?: 'Mutation', createMockExamCategory: { __typename?: 'CreateMockExamCategoryOutput', error?: string | null, ok: boolean, category?: { __typename?: 'MockExamCategory', id: number, name: string, description: string, isPublic: boolean, urlSlug: string } | null } };

export type ReadMockExamTitlesByCateoryQueryVariables = Types.Exact<{
  input: Types.ReadMockExamTitlesByCateoryInput;
}>;


export type ReadMockExamTitlesByCateoryQuery = { __typename?: 'Query', readMockExamTitlesByCateory: { __typename?: 'ReadMockExamTitlesByCateoryOutput', ok: boolean, error?: string | null, titles: Array<{ __typename?: 'ExamTitleAndId', id: number, title: string, status: Types.ExamStatus, slug?: string | null, order: number }> } };

export type FindMyExamHistoryQueryVariables = Types.Exact<{
  input: Types.FindMyExamHistoryInput;
}>;


export type FindMyExamHistoryQuery = { __typename?: 'Query', findMyExamHistory: { __typename?: 'FindMyExamHistoryOutput', error?: string | null, ok: boolean, titleAndId?: Array<{ __typename?: 'TitleAndId', id?: number | null, title?: string | null }> | null } };

export type ReadAllMockExamQueryVariables = Types.Exact<{
  input: Types.ReadAllMockExamsInput;
}>;


export type ReadAllMockExamQuery = { __typename?: 'Query', readAllMockExam: { __typename?: 'ReadAllMockExamsOutput', error?: string | null, ok: boolean, mockExams: Array<{ __typename?: 'MockExam', id: number }> } };

export type UpdateExamOrderMutationVariables = Types.Exact<{
  input: Types.UpdateExamOrderInput;
}>;


export type UpdateExamOrderMutation = { __typename?: 'Mutation', updateExamOrder: { __typename?: 'UpdateExamOrderOutput', error?: string | null, ok: boolean } };

export type CreateExamCategoryViewerMutationVariables = Types.Exact<{
  input: Types.CreateExamCategoryViewerInput;
}>;


export type CreateExamCategoryViewerMutation = { __typename?: 'Mutation', createExamCategoryViewer: { __typename?: 'CreateExamCategoryViewerOutput', error?: string | null, ok: boolean, examViewer?: { __typename?: 'ExamViewer', isApprove: boolean, id: number, user: { __typename?: 'User', id: number, nickname: string } } | null } };

export type GetExamCategoryViewersQueryVariables = Types.Exact<{
  input: Types.GetExamCategoryViewrsInput;
}>;


export type GetExamCategoryViewersQuery = { __typename?: 'Query', getExamCategoryViewers: { __typename?: 'GetExamCategoryViewrsOutput', error?: string | null, ok: boolean, examViewers?: Array<{ __typename?: 'ExamViewer', id: number, isApprove: boolean, user: { __typename?: 'User', email: string, nickname: string } }> | null } };

export type DeleteExamCategoryViewerMutationVariables = Types.Exact<{
  input: Types.DeleteExamCategoryViewerInput;
}>;


export type DeleteExamCategoryViewerMutation = { __typename?: 'Mutation', deleteExamCategoryViewer: { __typename?: 'DeleteExamCategoryViewerOutput', error?: string | null, ok: boolean } };

export type UpdateExamViewerApproveStateMutationVariables = Types.Exact<{
  input: Types.UpdateExamViewerApproveStateInput;
}>;


export type UpdateExamViewerApproveStateMutation = { __typename?: 'Mutation', updateExamViewerApproveState: { __typename?: 'UpdateExamViewerApproveStateOutput', error?: string | null, ok: boolean } };

export type GetInvitedExamsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetInvitedExamsQuery = { __typename?: 'Query', getInvitedExams: { __typename?: 'GetInvitedExamsOutput', error?: string | null, ok: boolean, examViewers?: Array<{ __typename?: 'ExamViewer', id: number, isApprove: boolean, examCategory: { __typename?: 'MockExamCategory', id: number, name: string, user: { __typename?: 'User', nickname: string } } }> | null } };

export type ReadMockExamCategoryByExamIdQueryVariables = Types.Exact<{
  input: Types.ReadMockExamCategoryByExamIdInput;
}>;


export type ReadMockExamCategoryByExamIdQuery = { __typename?: 'Query', readMockExamCategoryByExamId: { __typename?: 'ReadMockExamCategoryByExamIdOutput', error?: string | null, ok: boolean, category?: { __typename?: 'MockExamCategory', id: number, name: string } | null } };

export type ReadMockExamCategoriesQueryVariables = Types.Exact<{
  input: Types.ReadMockExamCategoriesInput;
}>;


export type ReadMockExamCategoriesQuery = { __typename?: 'Query', readMockExamCategories: { __typename?: 'ReadMockExamCategoriesOutput', categories: Array<{ __typename?: 'MockExamCategory', id: number, name: string }> } };

export type ReadMockExamCategoryIdsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ReadMockExamCategoryIdsQuery = { __typename?: 'Query', readMockExamCategoryIds: { __typename?: 'ReadMockExamCategoryIdsOutput', error?: string | null, ids?: Array<number> | null, ok: boolean } };

export type ReadMockExamCategoryNamesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ReadMockExamCategoryNamesQuery = { __typename?: 'Query', readMockExamCategoryNames: { __typename?: 'ReadMockExamCategoryNamesOutput', urlSlugs?: Array<string> | null, error?: string | null, names?: Array<string> | null, ok: boolean } };

export type ReadMockExamCategoryByCategoryIdQueryVariables = Types.Exact<{
  input: Types.ReadMockExamCategoryByCategoryIdInput;
}>;


export type ReadMockExamCategoryByCategoryIdQuery = { __typename?: 'Query', readMockExamCategoryByCategoryId: { __typename?: 'ReadMockExamCategoryByCategoryIdOutput', error?: string | null, ok: boolean, category?: { __typename?: 'MockExamCategory', hasAccess?: boolean | null, isBookmarked?: boolean | null, id: number, source: Types.ExamSource, name: string, description: string, isPublic: boolean, urlSlug: string, revenueRequestForm?: { __typename?: 'RevenueRequestForm', status: Types.RevenueRequestFormStatus, reason?: string | null } | null, mockExam: Array<{ __typename?: 'MockExam', slug?: string | null, title: string, id: number, accesibleRoleIds: Array<number>, isBookmarked?: boolean | null, mockExamQuestion: Array<{ __typename?: 'MockExamQuestion', id: number }>, user: { __typename?: 'User', profileImg: string, id: number, nickname: string } }>, user: { __typename?: 'User', profileImg: string, id: number, nickname: string } } | null } };

export type GetExamCategoriesForAdminQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetExamCategoriesForAdminQuery = { __typename?: 'Query', getExamCategoriesForAdmin: { __typename?: 'GetExamCategoriesOutput', error?: string | null, ok: boolean, categories?: Array<{ __typename?: 'MockExamCategory', order: number, created_at: any, isBookmarked?: boolean | null, id: number, urlSlug: string, name: string, isPublic: boolean, source: Types.ExamSource, categoryEvaluations?: Array<{ __typename?: 'CategoryEvaluation', score?: number | null }> | null, user: { __typename?: 'User', profileImg: string, id: number, nickname: string }, mockExam: Array<{ __typename?: 'MockExam', id: number, isPremium: boolean }> }> | null } };

export type GetExamCategoriesQueryVariables = Types.Exact<{
  input: Types.GetExamCategoriesInput;
}>;


export type GetExamCategoriesQuery = { __typename?: 'Query', getExamCategories: { __typename?: 'GetExamCategoriesOutput', ok: boolean, error?: string | null, categories?: Array<{ __typename?: 'MockExamCategory', order: number, created_at: any, isBookmarked?: boolean | null, id: number, urlSlug: string, name: string, isPublic: boolean, source: Types.ExamSource, categoryEvaluations?: Array<{ __typename?: 'CategoryEvaluation', score?: number | null }> | null, user: { __typename?: 'User', profileImg: string, id: number, nickname: string }, mockExam: Array<{ __typename?: 'MockExam', id: number, isPremium: boolean }> }> | null } };

export type GetMyExamsQueryVariables = Types.Exact<{
  input: Types.GetMyExamsInput;
}>;


export type GetMyExamsQuery = { __typename?: 'Query', getMyExams: { __typename?: 'GetMyExamsOutput', error?: string | null, ok: boolean, exams?: Array<{ __typename?: 'MockExam', id: number, slug?: string | null, title: string, isBookmarked?: boolean | null, mockExamQuestion: Array<{ __typename?: 'MockExamQuestion', id: number }>, user: { __typename?: 'User', profileImg: string, id: number, nickname: string } }> | null } };

export type AddExamToCategoryMutationVariables = Types.Exact<{
  input: Types.AddExamToCategoryInput;
}>;


export type AddExamToCategoryMutation = { __typename?: 'Mutation', addExamToCategory: { __typename?: 'AddExamToCategoryOutput', error?: string | null, ok: boolean } };

export type RemoveExamFromCategoryMutationVariables = Types.Exact<{
  input: Types.RemoveExamFromCategoryInput;
}>;


export type RemoveExamFromCategoryMutation = { __typename?: 'Mutation', removeExamFromCategory: { __typename?: 'RemoveExamFromCategoryOutput', error?: string | null, ok: boolean } };

export type GetMyExamCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMyExamCategoriesQuery = { __typename?: 'Query', getMyExamCategories: { __typename?: 'GetMyExamCategoriesOutput', error?: string | null, ok: boolean, categories?: Array<{ __typename?: 'MockExamCategory', id: number, name: string, isPublic: boolean, user: { __typename?: 'User', id: number, nickname: string, profileImg: string } }> | null } };

export type ReadMockExamQueryVariables = Types.Exact<{
  input: Types.ReadMockExamInput;
}>;


export type ReadMockExamQuery = { __typename?: 'Query', readMockExam: { __typename?: 'ReadMockExamOutput', error?: string | null, ok: boolean, mockExam: { __typename?: 'MockExam', id: number, title: string, uuid: string, approved: boolean, mockExamQuestion: Array<{ __typename?: 'MockExamQuestion', id: number, orderId: string, linkedQuestionIds?: Array<number> | null, question?: string | null, solution?: string | null, question_img?: Array<{ __typename?: 'MockExamImageType', url: string, name: string, uid: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string, uid: string, name: string }> | null }> } } };

export type SaveExamMutationVariables = Types.Exact<{
  input: Types.SaveExamInput;
}>;


export type SaveExamMutation = { __typename?: 'Mutation', saveExam: { __typename?: 'SaveExamOutput', error?: string | null, ok: boolean, examId?: number | null } };

export type GetExamCategoryLearningProgressQueryVariables = Types.Exact<{
  input: Types.GetExamCategoryLearningProgressInput;
}>;


export type GetExamCategoryLearningProgressQuery = { __typename?: 'Query', getExamCategoryLearningProgress: { __typename?: 'GetExamCategoryLearningProgressOutput', error?: string | null, ok: boolean, lowScoreCount?: number | null, highScoreCount?: number | null, totalQuestionCount?: number | null } };

export type GetMyAllExamCategoriesLearningProgressQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMyAllExamCategoriesLearningProgressQuery = { __typename?: 'Query', getMyAllExamCategoriesLearningProgress: { __typename?: 'GetMyAllExamCategoriesLearningProgressOutput', error?: string | null, highScoreCount?: number | null, lowScoreCount?: number | null, ok: boolean, totalQuestionCount?: number | null } };

export type MoveExamOrderMutationVariables = Types.Exact<{
  input: Types.MoveExamOrderInput;
}>;


export type MoveExamOrderMutation = { __typename?: 'Mutation', moveExamOrder: { __typename?: 'MoveExamOrderOutput', error?: string | null, ok: boolean } };


export const ReadAllMockExamCategoriesDocument = gql`
    query ReadAllMockExamCategories($input: ReadAllMockExamCategoriesInput) {
  readAllMockExamCategories(input: $input) {
    categories {
      name
      id
      user {
        nickname
        role
      }
      partner {
        id
      }
    }
    error
    ok
  }
}
    `;

export function useReadAllMockExamCategoriesQuery(options?: Omit<Urql.UseQueryArgs<ReadAllMockExamCategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadAllMockExamCategoriesQuery, ReadAllMockExamCategoriesQueryVariables>({ query: ReadAllMockExamCategoriesDocument, ...options });
};
export const EditMockExamCategoryDocument = gql`
    mutation EditMockExamCategory($input: EditMockExamCategoryInput!) {
  editMockExamCategory(input: $input) {
    error
    ok
  }
}
    `;

export function useEditMockExamCategoryMutation() {
  return Urql.useMutation<EditMockExamCategoryMutation, EditMockExamCategoryMutationVariables>(EditMockExamCategoryDocument);
};
export const ReadMyMockExamCategoriesDocument = gql`
    query ReadMyMockExamCategories($input: ReadMyMockExamCategoriesInput) {
  readMyMockExamCategories(input: $input) {
    categories {
      name
      id
    }
    error
    ok
  }
}
    `;

export function useReadMyMockExamCategoriesQuery(options?: Omit<Urql.UseQueryArgs<ReadMyMockExamCategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMyMockExamCategoriesQuery, ReadMyMockExamCategoriesQueryVariables>({ query: ReadMyMockExamCategoriesDocument, ...options });
};
export const EditMockExamDocument = gql`
    mutation EditMockExam($input: EditMockExamInput!) {
  editMockExam(input: $input) {
    error
    ok
  }
}
    `;

export function useEditMockExamMutation() {
  return Urql.useMutation<EditMockExamMutation, EditMockExamMutationVariables>(EditMockExamDocument);
};
export const DeleteMockExamDocument = gql`
    mutation DeleteMockExam($input: DeleteMockExamInput!) {
  deleteMockExam(input: $input) {
    error
    ok
  }
}
    `;

export function useDeleteMockExamMutation() {
  return Urql.useMutation<DeleteMockExamMutation, DeleteMockExamMutationVariables>(DeleteMockExamDocument);
};
export const DeleteMockExamCategoryDocument = gql`
    mutation DeleteMockExamCategory($input: DeleteMockExamCategoryInput!) {
  deleteMockExamCategory(input: $input) {
    error
    ok
  }
}
    `;

export function useDeleteMockExamCategoryMutation() {
  return Urql.useMutation<DeleteMockExamCategoryMutation, DeleteMockExamCategoryMutationVariables>(DeleteMockExamCategoryDocument);
};
export const CreateMockExamDocument = gql`
    mutation CreateMockExam($input: CreateMockExamInput!) {
  createMockExam(input: $input) {
    error
    mockExam {
      id
      title
    }
    ok
  }
}
    `;

export function useCreateMockExamMutation() {
  return Urql.useMutation<CreateMockExamMutation, CreateMockExamMutationVariables>(CreateMockExamDocument);
};
export const CreateMockExamCategoryDocument = gql`
    mutation CreateMockExamCategory($input: CreateMockExamCategoryInput!) {
  createMockExamCategory(input: $input) {
    category {
      id
      name
      description
      isPublic
      urlSlug
    }
    error
    ok
  }
}
    `;

export function useCreateMockExamCategoryMutation() {
  return Urql.useMutation<CreateMockExamCategoryMutation, CreateMockExamCategoryMutationVariables>(CreateMockExamCategoryDocument);
};
export const ReadMockExamTitlesByCateoryDocument = gql`
    query ReadMockExamTitlesByCateory($input: ReadMockExamTitlesByCateoryInput!) {
  readMockExamTitlesByCateory(input: $input) {
    titles {
      id
      title
      status
      slug
      order
    }
    ok
    error
  }
}
    `;

export function useReadMockExamTitlesByCateoryQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamTitlesByCateoryQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamTitlesByCateoryQuery, ReadMockExamTitlesByCateoryQueryVariables>({ query: ReadMockExamTitlesByCateoryDocument, ...options });
};
export const FindMyExamHistoryDocument = gql`
    query FindMyExamHistory($input: FindMyExamHistoryInput!) {
  findMyExamHistory(input: $input) {
    error
    ok
    titleAndId {
      id
      title
    }
  }
}
    `;

export function useFindMyExamHistoryQuery(options: Omit<Urql.UseQueryArgs<FindMyExamHistoryQueryVariables>, 'query'>) {
  return Urql.useQuery<FindMyExamHistoryQuery, FindMyExamHistoryQueryVariables>({ query: FindMyExamHistoryDocument, ...options });
};
export const ReadAllMockExamDocument = gql`
    query ReadAllMockExam($input: ReadAllMockExamsInput!) {
  readAllMockExam(input: $input) {
    error
    mockExams {
      id
    }
    ok
  }
}
    `;

export function useReadAllMockExamQuery(options: Omit<Urql.UseQueryArgs<ReadAllMockExamQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadAllMockExamQuery, ReadAllMockExamQueryVariables>({ query: ReadAllMockExamDocument, ...options });
};
export const UpdateExamOrderDocument = gql`
    mutation UpdateExamOrder($input: UpdateExamOrderInput!) {
  updateExamOrder(input: $input) {
    error
    ok
  }
}
    `;

export function useUpdateExamOrderMutation() {
  return Urql.useMutation<UpdateExamOrderMutation, UpdateExamOrderMutationVariables>(UpdateExamOrderDocument);
};
export const CreateExamCategoryViewerDocument = gql`
    mutation CreateExamCategoryViewer($input: CreateExamCategoryViewerInput!) {
  createExamCategoryViewer(input: $input) {
    error
    ok
    examViewer {
      isApprove
      id
      user {
        id
        nickname
      }
    }
  }
}
    `;

export function useCreateExamCategoryViewerMutation() {
  return Urql.useMutation<CreateExamCategoryViewerMutation, CreateExamCategoryViewerMutationVariables>(CreateExamCategoryViewerDocument);
};
export const GetExamCategoryViewersDocument = gql`
    query GetExamCategoryViewers($input: GetExamCategoryViewrsInput!) {
  getExamCategoryViewers(input: $input) {
    error
    ok
    examViewers {
      id
      isApprove
      user {
        email
        nickname
      }
    }
  }
}
    `;

export function useGetExamCategoryViewersQuery(options: Omit<Urql.UseQueryArgs<GetExamCategoryViewersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetExamCategoryViewersQuery, GetExamCategoryViewersQueryVariables>({ query: GetExamCategoryViewersDocument, ...options });
};
export const DeleteExamCategoryViewerDocument = gql`
    mutation DeleteExamCategoryViewer($input: DeleteExamCategoryViewerInput!) {
  deleteExamCategoryViewer(input: $input) {
    error
    ok
  }
}
    `;

export function useDeleteExamCategoryViewerMutation() {
  return Urql.useMutation<DeleteExamCategoryViewerMutation, DeleteExamCategoryViewerMutationVariables>(DeleteExamCategoryViewerDocument);
};
export const UpdateExamViewerApproveStateDocument = gql`
    mutation UpdateExamViewerApproveState($input: UpdateExamViewerApproveStateInput!) {
  updateExamViewerApproveState(input: $input) {
    error
    ok
  }
}
    `;

export function useUpdateExamViewerApproveStateMutation() {
  return Urql.useMutation<UpdateExamViewerApproveStateMutation, UpdateExamViewerApproveStateMutationVariables>(UpdateExamViewerApproveStateDocument);
};
export const GetInvitedExamsDocument = gql`
    query GetInvitedExams {
  getInvitedExams {
    error
    ok
    examViewers {
      id
      isApprove
      examCategory {
        id
        name
        user {
          nickname
        }
      }
    }
  }
}
    `;

export function useGetInvitedExamsQuery(options?: Omit<Urql.UseQueryArgs<GetInvitedExamsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetInvitedExamsQuery, GetInvitedExamsQueryVariables>({ query: GetInvitedExamsDocument, ...options });
};
export const ReadMockExamCategoryByExamIdDocument = gql`
    query ReadMockExamCategoryByExamId($input: ReadMockExamCategoryByExamIdInput!) {
  readMockExamCategoryByExamId(input: $input) {
    error
    ok
    category {
      id
      name
    }
  }
}
    `;

export function useReadMockExamCategoryByExamIdQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamCategoryByExamIdQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamCategoryByExamIdQuery, ReadMockExamCategoryByExamIdQueryVariables>({ query: ReadMockExamCategoryByExamIdDocument, ...options });
};
export const ReadMockExamCategoriesDocument = gql`
    query ReadMockExamCategories($input: ReadMockExamCategoriesInput!) {
  readMockExamCategories(input: $input) {
    categories {
      id
      name
    }
  }
}
    `;

export function useReadMockExamCategoriesQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamCategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamCategoriesQuery, ReadMockExamCategoriesQueryVariables>({ query: ReadMockExamCategoriesDocument, ...options });
};
export const ReadMockExamCategoryIdsDocument = gql`
    query ReadMockExamCategoryIds {
  readMockExamCategoryIds {
    error
    ids
    ok
  }
}
    `;

export function useReadMockExamCategoryIdsQuery(options?: Omit<Urql.UseQueryArgs<ReadMockExamCategoryIdsQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamCategoryIdsQuery, ReadMockExamCategoryIdsQueryVariables>({ query: ReadMockExamCategoryIdsDocument, ...options });
};
export const ReadMockExamCategoryNamesDocument = gql`
    query ReadMockExamCategoryNames {
  readMockExamCategoryNames {
    urlSlugs
    error
    names
    ok
  }
}
    `;

export function useReadMockExamCategoryNamesQuery(options?: Omit<Urql.UseQueryArgs<ReadMockExamCategoryNamesQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamCategoryNamesQuery, ReadMockExamCategoryNamesQueryVariables>({ query: ReadMockExamCategoryNamesDocument, ...options });
};
export const ReadMockExamCategoryByCategoryIdDocument = gql`
    query ReadMockExamCategoryByCategoryId($input: ReadMockExamCategoryByCategoryIdInput!) {
  readMockExamCategoryByCategoryId(input: $input) {
    category {
      hasAccess
      isBookmarked
      id
      source
      name
      description
      isPublic
      urlSlug
      revenueRequestForm {
        status
        reason
      }
      mockExam {
        slug
        title
        id
        accesibleRoleIds
        mockExamQuestion {
          id
        }
        user {
          profileImg
          id
          nickname
        }
        isBookmarked
      }
      user {
        profileImg
        id
        nickname
      }
    }
    error
    ok
  }
}
    `;

export function useReadMockExamCategoryByCategoryIdQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamCategoryByCategoryIdQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamCategoryByCategoryIdQuery, ReadMockExamCategoryByCategoryIdQueryVariables>({ query: ReadMockExamCategoryByCategoryIdDocument, ...options });
};
export const GetExamCategoriesForAdminDocument = gql`
    query GetExamCategoriesForAdmin {
  getExamCategoriesForAdmin {
    error
    ok
    categories {
      order
      created_at
      categoryEvaluations {
        score
      }
      isBookmarked
      id
      urlSlug
      name
      isPublic
      source
      user {
        profileImg
        id
        nickname
      }
      mockExam {
        id
        isPremium
      }
    }
  }
}
    `;

export function useGetExamCategoriesForAdminQuery(options?: Omit<Urql.UseQueryArgs<GetExamCategoriesForAdminQueryVariables>, 'query'>) {
  return Urql.useQuery<GetExamCategoriesForAdminQuery, GetExamCategoriesForAdminQueryVariables>({ query: GetExamCategoriesForAdminDocument, ...options });
};
export const GetExamCategoriesDocument = gql`
    query GetExamCategories($input: GetExamCategoriesInput!) {
  getExamCategories(input: $input) {
    ok
    error
    categories {
      order
      created_at
      categoryEvaluations {
        score
      }
      isBookmarked
      id
      urlSlug
      name
      isPublic
      source
      user {
        profileImg
        id
        nickname
      }
      mockExam {
        id
        isPremium
      }
    }
  }
}
    `;

export function useGetExamCategoriesQuery(options: Omit<Urql.UseQueryArgs<GetExamCategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetExamCategoriesQuery, GetExamCategoriesQueryVariables>({ query: GetExamCategoriesDocument, ...options });
};
export const GetMyExamsDocument = gql`
    query GetMyExams($input: GetMyExamsInput!) {
  getMyExams(input: $input) {
    error
    exams {
      id
      slug
      title
      isBookmarked
      mockExamQuestion {
        id
      }
      user {
        profileImg
        id
        nickname
      }
    }
    ok
  }
}
    `;

export function useGetMyExamsQuery(options: Omit<Urql.UseQueryArgs<GetMyExamsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMyExamsQuery, GetMyExamsQueryVariables>({ query: GetMyExamsDocument, ...options });
};
export const AddExamToCategoryDocument = gql`
    mutation AddExamToCategory($input: AddExamToCategoryInput!) {
  addExamToCategory(input: $input) {
    error
    ok
  }
}
    `;

export function useAddExamToCategoryMutation() {
  return Urql.useMutation<AddExamToCategoryMutation, AddExamToCategoryMutationVariables>(AddExamToCategoryDocument);
};
export const RemoveExamFromCategoryDocument = gql`
    mutation RemoveExamFromCategory($input: RemoveExamFromCategoryInput!) {
  removeExamFromCategory(input: $input) {
    error
    ok
  }
}
    `;

export function useRemoveExamFromCategoryMutation() {
  return Urql.useMutation<RemoveExamFromCategoryMutation, RemoveExamFromCategoryMutationVariables>(RemoveExamFromCategoryDocument);
};
export const GetMyExamCategoriesDocument = gql`
    query GetMyExamCategories {
  getMyExamCategories {
    error
    categories {
      id
      name
      isPublic
      user {
        id
        nickname
        profileImg
      }
    }
    ok
  }
}
    `;

export function useGetMyExamCategoriesQuery(options?: Omit<Urql.UseQueryArgs<GetMyExamCategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMyExamCategoriesQuery, GetMyExamCategoriesQueryVariables>({ query: GetMyExamCategoriesDocument, ...options });
};
export const ReadMockExamDocument = gql`
    query ReadMockExam($input: ReadMockExamInput!) {
  readMockExam(input: $input) {
    error
    ok
    mockExam {
      id
      title
      uuid
      approved
      mockExamQuestion {
        id
        orderId
        linkedQuestionIds
        question_img {
          url
          name
          uid
        }
        solution_img {
          url
          uid
          name
        }
        question
        solution
      }
    }
  }
}
    `;

export function useReadMockExamQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamQuery, ReadMockExamQueryVariables>({ query: ReadMockExamDocument, ...options });
};
export const SaveExamDocument = gql`
    mutation SaveExam($input: SaveExamInput!) {
  saveExam(input: $input) {
    error
    ok
    examId
  }
}
    `;

export function useSaveExamMutation() {
  return Urql.useMutation<SaveExamMutation, SaveExamMutationVariables>(SaveExamDocument);
};
export const GetExamCategoryLearningProgressDocument = gql`
    query GetExamCategoryLearningProgress($input: GetExamCategoryLearningProgressInput!) {
  getExamCategoryLearningProgress(input: $input) {
    error
    ok
    lowScoreCount
    highScoreCount
    totalQuestionCount
  }
}
    `;

export function useGetExamCategoryLearningProgressQuery(options: Omit<Urql.UseQueryArgs<GetExamCategoryLearningProgressQueryVariables>, 'query'>) {
  return Urql.useQuery<GetExamCategoryLearningProgressQuery, GetExamCategoryLearningProgressQueryVariables>({ query: GetExamCategoryLearningProgressDocument, ...options });
};
export const GetMyAllExamCategoriesLearningProgressDocument = gql`
    query GetMyAllExamCategoriesLearningProgress {
  getMyAllExamCategoriesLearningProgress {
    error
    highScoreCount
    lowScoreCount
    ok
    totalQuestionCount
  }
}
    `;

export function useGetMyAllExamCategoriesLearningProgressQuery(options?: Omit<Urql.UseQueryArgs<GetMyAllExamCategoriesLearningProgressQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMyAllExamCategoriesLearningProgressQuery, GetMyAllExamCategoriesLearningProgressQueryVariables>({ query: GetMyAllExamCategoriesLearningProgressDocument, ...options });
};
export const MoveExamOrderDocument = gql`
    mutation MoveExamOrder($input: MoveExamOrderInput!) {
  moveExamOrder(input: $input) {
    error
    ok
  }
}
    `;

export function useMoveExamOrderMutation() {
  return Urql.useMutation<MoveExamOrderMutation, MoveExamOrderMutationVariables>(MoveExamOrderDocument);
};