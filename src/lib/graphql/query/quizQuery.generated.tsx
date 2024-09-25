import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetQuizsQueryVariables = Types.Exact<{
  input: Types.GetQuizsInput;
}>;

export type GetQuizsQuery = {
  __typename?: 'Query';
  getQuizs: {
    __typename?: 'GetQuizsOutput';
    error?: string | null;
    ok: boolean;
    quizs?: Array<{
      __typename?: 'Quiz';
      date: string;
      id: number;
      comment: Array<{
        __typename?: 'QuizComment';
        content: string;
        likesCount: number;
        likeState: boolean;
        created_at: any;
        id: number;
        user: { __typename?: 'User'; id: number; nickname: string };
      }>;
      question: {
        __typename?: 'MockExamQuestion';
        id: number;
        question?: string | null;
        solution?: string | null;
        question_img?: Array<{
          __typename?: 'MockExamImageType';
          url: string;
        }> | null;
        solution_img?: Array<{
          __typename?: 'MockExamImageType';
          url: string;
        }> | null;
        mockExam?: {
          __typename?: 'MockExam';
          id: number;
          title: string;
        } | null;
      };
      category: { __typename?: 'MockExamCategory'; name: string };
    }> | null;
  };
};

export type EditQuizCommentMutationVariables = Types.Exact<{
  input: Types.EditQuizCommentInput;
}>;

export type EditQuizCommentMutation = {
  __typename?: 'Mutation';
  editQuizComment: {
    __typename?: 'EditQuizCommentOutput';
    error?: string | null;
    ok: boolean;
  };
};

export type CreateQuizCommentMutationVariables = Types.Exact<{
  input: Types.CreateQuizCommentInput;
}>;

export type CreateQuizCommentMutation = {
  __typename?: 'Mutation';
  createQuizComment: {
    __typename?: 'CreateQuizCommentOutput';
    ok: boolean;
    error?: string | null;
    comment?: {
      __typename?: 'QuizComment';
      content: string;
      likesCount: number;
      likeState: boolean;
      created_at: any;
      id: number;
      user: { __typename?: 'User'; id: number; nickname: string };
    } | null;
  };
};

export type DeleteQuizCommentMutationVariables = Types.Exact<{
  input: Types.DeleteQuizCommentInput;
}>;

export type DeleteQuizCommentMutation = {
  __typename?: 'Mutation';
  deleteQuizComment: {
    __typename?: 'DeleteQuizCommentOutput';
    error?: string | null;
    ok: boolean;
  };
};

export const GetQuizsDocument = gql`
  query GetQuizs($input: GetQuizsInput!) {
    getQuizs(input: $input) {
      error
      ok
      quizs {
        comment {
          user {
            id
            nickname
          }
          content
          likesCount
          likeState
          created_at
          id
        }
        date
        id
        question {
          id
          question
          solution
          question_img {
            url
          }
          solution_img {
            url
          }
          mockExam {
            id
            title
          }
        }
        category {
          name
        }
      }
    }
  }
`;

export function useGetQuizsQuery(
  options: Omit<Urql.UseQueryArgs<GetQuizsQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetQuizsQuery, GetQuizsQueryVariables>({
    query: GetQuizsDocument,
    ...options,
  });
}
export const EditQuizCommentDocument = gql`
  mutation EditQuizComment($input: EditQuizCommentInput!) {
    editQuizComment(input: $input) {
      error
      ok
    }
  }
`;

export function useEditQuizCommentMutation() {
  return Urql.useMutation<
    EditQuizCommentMutation,
    EditQuizCommentMutationVariables
  >(EditQuizCommentDocument);
}
export const CreateQuizCommentDocument = gql`
  mutation CreateQuizComment($input: CreateQuizCommentInput!) {
    createQuizComment(input: $input) {
      ok
      error
      comment {
        user {
          id
          nickname
        }
        content
        likesCount
        likeState
        created_at
        id
      }
    }
  }
`;

export function useCreateQuizCommentMutation() {
  return Urql.useMutation<
    CreateQuizCommentMutation,
    CreateQuizCommentMutationVariables
  >(CreateQuizCommentDocument);
}
export const DeleteQuizCommentDocument = gql`
  mutation DeleteQuizComment($input: DeleteQuizCommentInput!) {
    deleteQuizComment(input: $input) {
      error
      ok
    }
  }
`;

export function useDeleteQuizCommentMutation() {
  return Urql.useMutation<
    DeleteQuizCommentMutation,
    DeleteQuizCommentMutationVariables
  >(DeleteQuizCommentDocument);
}
