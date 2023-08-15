import * as Types from '../../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ReadAllMockExamCategoriesQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.ReadAllMockExamCategoriesInput>;
}>;


export type ReadAllMockExamCategoriesQuery = { __typename?: 'Query', readAllMockExamCategories: { __typename?: 'ReadAllMockExamCategoriesOutput', error?: string | null, ok: boolean, categories: Array<{ __typename?: 'MockExamCategory', name: string, id: number, user: { __typename?: 'User', role: Types.UserRole }, partner?: { __typename?: 'Partner', id: number } | null }> } };

export type EditMockExamCategoryMutationVariables = Types.Exact<{
  input: Types.EditMockExamCategoryInput;
}>;


export type EditMockExamCategoryMutation = { __typename?: 'Mutation', editMockExamCategory: { __typename?: 'DeleteMockExamCategoryOutput', error?: string | null, ok: boolean } };

export type ReadMyMockExamCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


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


export type CreateMockExamCategoryMutation = { __typename?: 'Mutation', createMockExamCategory: { __typename?: 'CreateMockExamCategoryOutput', error?: string | null, ok: boolean, category?: { __typename?: 'MockExamCategory', id: number, name: string } | null } };

export type ReadMockExamTitlesByCateoryQueryVariables = Types.Exact<{
  input: Types.ReadMockExamTitlesByCateoryInput;
}>;


export type ReadMockExamTitlesByCateoryQuery = { __typename?: 'Query', readMockExamTitlesByCateory: { __typename?: 'ReadMockExamTitlesByCateoryOutput', ok: boolean, error?: string | null, titles: Array<{ __typename?: 'ExamTitleAndId', id: number, title: string, status: Types.ExamStatus, slug?: string | null }> } };

export type FindMyExamHistoryQueryVariables = Types.Exact<{
  input: Types.FindMyExamHistoryInput;
}>;


export type FindMyExamHistoryQuery = { __typename?: 'Query', findMyExamHistory: { __typename?: 'FindMyExamHistoryOutput', error?: string | null, ok: boolean, titleAndId?: Array<{ __typename?: 'TitleAndId', id?: number | null, title?: string | null }> | null } };

export type ReadAllMockExamQueryVariables = Types.Exact<{
  input: Types.ReadAllMockExamsInput;
}>;


export type ReadAllMockExamQuery = { __typename?: 'Query', readAllMockExam: { __typename?: 'ReadAllMockExamsOutput', error?: string | null, ok: boolean, mockExams: Array<{ __typename?: 'MockExam', id: number }> } };

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

export type UpdateExamViewerArroveStateMutationVariables = Types.Exact<{
  input: Types.UpdateExamViewerArroveStateInput;
}>;


export type UpdateExamViewerArroveStateMutation = { __typename?: 'Mutation', updateExamViewerArroveState: { __typename?: 'UpdateExamViewerArroveStateOutput', error?: string | null, ok: boolean } };

export type GetInvitedExamsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetInvitedExamsQuery = { __typename?: 'Query', getInvitedExams: { __typename?: 'GetInvitedExamsOutput', error?: string | null, ok: boolean, examViewers?: Array<{ __typename?: 'ExamViewer', id: number, isApprove: boolean, examCategory: { __typename?: 'MockExamCategory', name: string, user: { __typename?: 'User', nickname: string } } }> | null } };


export const ReadAllMockExamCategoriesDocument = gql`
    query ReadAllMockExamCategories($input: ReadAllMockExamCategoriesInput) {
  readAllMockExamCategories(input: $input) {
    categories {
      name
      id
      user {
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
    query ReadMyMockExamCategories {
  readMyMockExamCategories {
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
export const UpdateExamViewerArroveStateDocument = gql`
    mutation UpdateExamViewerArroveState($input: UpdateExamViewerArroveStateInput!) {
  updateExamViewerArroveState(input: $input) {
    error
    ok
  }
}
    `;

export function useUpdateExamViewerArroveStateMutation() {
  return Urql.useMutation<UpdateExamViewerArroveStateMutation, UpdateExamViewerArroveStateMutationVariables>(UpdateExamViewerArroveStateDocument);
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