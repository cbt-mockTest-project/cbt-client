import * as Types from '../../../types';

import gql from 'graphql-tag';
import { FullQuestionIncludingExamIdPartsFragmentDoc } from './questionFragment.generated';
import { QusetionCommentPartsFragmentDoc } from './questionCommentFragment.generated';
import { FullQuestionPartsFragmentDoc } from './questionFragment.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ReadBookmarkedQuestionsQueryVariables = Types.Exact<{
  input: Types.ReadBookmarkedQuestionsInput;
}>;


export type ReadBookmarkedQuestionsQuery = { __typename?: 'Query', readBookmarkedQuestions: { __typename?: 'ReadBookmarkedQuestionsOutput', error?: string | null, ok: boolean, questions: Array<{ __typename?: 'MockExamQuestion', highScore: number, middleScore: number, lowScore: number, id: number, isBookmarked?: boolean | null, myQuestionState?: Types.QuestionState | null, commentCount?: number | null, number: number, question?: string | null, solution?: string | null, textHighlight: Array<{ __typename?: 'TextHighlight', id: string, data?: { __typename?: 'TextHighlightData', memo: string, startOffset: number, endOffset: number, startContainer: Array<number>, endContainer: Array<number>, color?: string | null, text: string, type: string } | null }>, mockExam?: { __typename?: 'MockExam', id: number, title: string, approved: boolean, isPrivate?: boolean | null } | null, user: { __typename?: 'User', id: number }, question_img?: Array<{ __typename?: 'MockExamImageType', url: string, uid: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', uid: string, url: string }> | null, myBookmark?: { __typename?: 'MockExamQuestionBookmark', id: number, bookmarkFolder?: { __typename?: 'MockExamQuestionBookmarkFolder', id: number, name: string } | null } | null, mockExamQuestionFeedback: Array<{ __typename?: 'MockExamQuestionFeedback', id: number, type: Types.QuestionFeedbackType, content: string, created_at: any, recommendationCount: { __typename?: 'RecommendationCount', bad: number, good: number }, myRecommedationStatus: { __typename?: 'MyRecommedationStatus', isBad: boolean, isGood: boolean }, user?: { __typename?: 'User', id: number, nickname: string } | null }> }> } };

export type ReadMockExamQuestionsByMockExamIdQueryVariables = Types.Exact<{
  input: Types.ReadMockExamQuestionsByMockExamIdInput;
}>;


export type ReadMockExamQuestionsByMockExamIdQuery = { __typename?: 'Query', readMockExamQuestionsByMockExamId: { __typename?: 'ReadMockExamQuestionsByMockExamIdOutput', count: number, error?: string | null, ok: boolean, title: string, author: string, isPremium: boolean, questions: Array<{ __typename?: 'MockExamQuestion', question?: string | null, solution?: string | null, label?: string | null, id: number, number: number, approved: boolean, mockExamQuestionComment: Array<{ __typename?: 'MockExamQuestionComment', created_at: any, content: string, likeState: boolean, likesCount: number, id: number, user: { __typename?: 'User', nickname: string, id: number, role: Types.UserRole } }>, mockExam?: { __typename?: 'MockExam', title: string } | null, mockExamQuestionFeedback: Array<{ __typename?: 'MockExamQuestionFeedback', id: number, content: string, type: Types.QuestionFeedbackType, created_at: any, updated_at: any, user?: { __typename?: 'User', nickname: string, id: number } | null, recommendationCount: { __typename?: 'RecommendationCount', good: number, bad: number }, myRecommedationStatus: { __typename?: 'MyRecommedationStatus', isGood: boolean, isBad: boolean } }>, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, question_video?: Array<{ __typename?: 'MockExamVideoType', url: string, size: number }> | null, state: Array<{ __typename?: 'MockExamQuestionState', state: Types.QuestionState, answer: string, exam: { __typename?: 'MockExam', id: number } }>, mockExamQuestionBookmark: Array<{ __typename?: 'MockExamQuestionBookmark', user: { __typename?: 'User', id: number } }> }> } };

export type ReadAllQuestionsQueryVariables = Types.Exact<{
  input: Types.ReadAllQuestionsInput;
}>;


export type ReadAllQuestionsQuery = { __typename?: 'Query', readAllQuestions: { __typename?: 'ReadAllQuestionsOutput', error?: string | null, ok: boolean, questions?: Array<{ __typename?: 'MockExamQuestion', id: number, question?: string | null, question_img?: Array<{ __typename?: 'MockExamImageType', url: string, name: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string, name: string }> | null }> | null } };

export type ReadMockExamQuestionQueryVariables = Types.Exact<{
  input: Types.ReadMockExamQuestionInput;
}>;


export type ReadMockExamQuestionQuery = { __typename?: 'Query', readMockExamQuestion: { __typename?: 'ReadMockExamQuestionOutput', isCoAuthor: boolean, error?: string | null, ok: boolean, mockExamQusetion: { __typename?: 'MockExamQuestion', linkedQuestionIds?: Array<number> | null, id: number, isBookmarked?: boolean | null, myQuestionState?: Types.QuestionState | null, commentCount?: number | null, number: number, question?: string | null, solution?: string | null, mockExam?: { __typename?: 'MockExam', id: number, title: string, approved: boolean } | null, user: { __typename?: 'User', id: number, role: Types.UserRole }, question_img?: Array<{ __typename?: 'MockExamImageType', url: string, uid: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', uid: string, url: string }> | null, mockExamQuestionFeedback: Array<{ __typename?: 'MockExamQuestionFeedback', id: number, type: Types.QuestionFeedbackType, content: string, created_at: any, recommendationCount: { __typename?: 'RecommendationCount', bad: number, good: number }, myRecommedationStatus: { __typename?: 'MyRecommedationStatus', isBad: boolean, isGood: boolean }, user?: { __typename?: 'User', id: number, nickname: string } | null }> } } };

export type EditMockExamQuestionMutationVariables = Types.Exact<{
  input: Types.EditMockExamQuestionInput;
}>;


export type EditMockExamQuestionMutation = { __typename?: 'Mutation', editMockExamQuestion: { __typename?: 'EditMockExamQuestionOutput', error?: string | null, ok: boolean } };

export type DeleteMockExamQuestionMutationVariables = Types.Exact<{
  input: Types.DeleteMockExamQuestionInput;
}>;


export type DeleteMockExamQuestionMutation = { __typename?: 'Mutation', deleteMockExamQuestion: { __typename?: 'DeleteMockExamQuestionOutput', error?: string | null, ok: boolean } };

export type ReadAllMockExamQuestionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ReadAllMockExamQuestionQuery = { __typename?: 'Query', readAllMockExamQuestion: { __typename?: 'ReadAllMockExamQuestionOutput', error?: string | null, ok: boolean, mockExamQuestions: Array<{ __typename?: 'MockExamQuestion', question?: string | null, solution?: string | null, id: number, number: number, approved: boolean, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, state: Array<{ __typename?: 'MockExamQuestionState', state: Types.QuestionState, answer: string }> }> } };

export type CreateMockExamQuestionMutationVariables = Types.Exact<{
  input: Types.CreateMockExamQuestionInput;
}>;


export type CreateMockExamQuestionMutation = { __typename?: 'Mutation', createMockExamQuestion: { __typename?: 'CreateMockExamQuestionOutput', error?: string | null, ok: boolean, questionId?: number | null } };

export type ReadMockExamQuestionsByStateQueryVariables = Types.Exact<{
  input: Types.ReadMockExamQuestionsByStateInput;
}>;


export type ReadMockExamQuestionsByStateQuery = { __typename?: 'Query', readMockExamQuestionsByState: { __typename?: 'ReadMockExamQuestionsByStateOutput', error?: string | null, ok: boolean, mockExamQusetions: Array<{ __typename?: 'MockExamQuestionState', state: Types.QuestionState, question: { __typename?: 'MockExamQuestion', question?: string | null, solution?: string | null, id: number, number: number, approved: boolean, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, state: Array<{ __typename?: 'MockExamQuestionState', state: Types.QuestionState, answer: string }> }, exam: { __typename?: 'MockExam', title: string } }> } };

export type ReadMockExamQuestionNumbersQueryVariables = Types.Exact<{
  input: Types.ReadMockExamQuestionNumbersInput;
}>;


export type ReadMockExamQuestionNumbersQuery = { __typename?: 'Query', readMockExamQuestionNumbers: { __typename?: 'ReadMockExamQuestionNumbersOutput', error?: string | null, ok: boolean, examStatus?: Types.ExamStatus | null, questionNumbers: Array<{ __typename?: 'QuestionNumber', questionNumber: number, questionId: number }> } };

export type SearchQuestionsByKeywordQueryVariables = Types.Exact<{
  input: Types.SearchQuestionsByKeywordInput;
}>;


export type SearchQuestionsByKeywordQuery = { __typename?: 'Query', searchQuestionsByKeyword: { __typename?: 'SearchQuestionsByKeywordOutput', error?: string | null, ok: boolean, questions?: Array<{ __typename?: 'MockExamQuestion', id: number, question?: string | null, solution?: string | null, number: number, isBookmarked?: boolean | null, myBookmark?: { __typename?: 'MockExamQuestionBookmark', id: number, bookmarkFolder?: { __typename?: 'MockExamQuestionBookmarkFolder', id: number, name: string } | null } | null, user: { __typename?: 'User', id: number, nickname: string, profileImg: string }, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, mockExam?: { __typename?: 'MockExam', title: string } | null }> | null } };

export type ReadQuestionsByExamIdsQueryVariables = Types.Exact<{
  input: Types.ReadQuestionsByExamIdsInput;
}>;


export type ReadQuestionsByExamIdsQuery = { __typename?: 'Query', readQuestionsByExamIds: { __typename?: 'ReadQuestionsByExamIdsOutput', error?: string | null, ok: boolean, questions: Array<{ __typename?: 'MockExamQuestion', highScore: number, middleScore: number, lowScore: number, id: number, isBookmarked?: boolean | null, myQuestionState?: Types.QuestionState | null, commentCount?: number | null, number: number, question?: string | null, solution?: string | null, mockExam?: { __typename?: 'MockExam', id: number, title: string, approved: boolean, isPrivate?: boolean | null } | null, user: { __typename?: 'User', id: number }, question_img?: Array<{ __typename?: 'MockExamImageType', url: string, uid: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', uid: string, url: string }> | null, myBookmark?: { __typename?: 'MockExamQuestionBookmark', id: number, bookmarkFolder?: { __typename?: 'MockExamQuestionBookmarkFolder', id: number, name: string } | null } | null, textHighlight: Array<{ __typename?: 'TextHighlight', id: string, data?: { __typename?: 'TextHighlightData', memo: string, startOffset: number, endOffset: number, startContainer: Array<number>, endContainer: Array<number>, color?: string | null, text: string, type: string } | null }>, mockExamQuestionFeedback: Array<{ __typename?: 'MockExamQuestionFeedback', id: number, type: Types.QuestionFeedbackType, content: string, created_at: any, recommendationCount: { __typename?: 'RecommendationCount', bad: number, good: number }, myRecommedationStatus: { __typename?: 'MyRecommedationStatus', isBad: boolean, isGood: boolean }, user?: { __typename?: 'User', id: number, nickname: string } | null }> }> } };


export const ReadBookmarkedQuestionsDocument = gql`
    query ReadBookmarkedQuestions($input: ReadBookmarkedQuestionsInput!) {
  readBookmarkedQuestions(input: $input) {
    error
    ok
    questions {
      highScore
      middleScore
      lowScore
      textHighlight {
        id
        data {
          memo
          startOffset
          endOffset
          startContainer
          endContainer
          color
          text
          type
        }
      }
      mockExam {
        id
        title
        approved
        isPrivate
      }
      user {
        id
      }
      id
      isBookmarked
      myQuestionState
      commentCount
      number
      question
      question_img {
        url
        uid
      }
      solution
      solution_img {
        uid
        url
      }
      myBookmark {
        id
        bookmarkFolder {
          id
          name
        }
      }
      mockExamQuestionFeedback {
        recommendationCount {
          bad
          good
        }
        myRecommedationStatus {
          isBad
          isGood
        }
        user {
          id
          nickname
        }
        id
        type
        content
        created_at
      }
    }
  }
}
    `;

export function useReadBookmarkedQuestionsQuery(options: Omit<Urql.UseQueryArgs<ReadBookmarkedQuestionsQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadBookmarkedQuestionsQuery, ReadBookmarkedQuestionsQueryVariables>({ query: ReadBookmarkedQuestionsDocument, ...options });
};
export const ReadMockExamQuestionsByMockExamIdDocument = gql`
    query ReadMockExamQuestionsByMockExamId($input: ReadMockExamQuestionsByMockExamIdInput!) {
  readMockExamQuestionsByMockExamId(input: $input) {
    count
    error
    ok
    title
    author
    isPremium
    questions {
      ...FullQuestionIncludingExamIdParts
      mockExamQuestionComment {
        ...QusetionCommentParts
      }
      mockExam {
        title
      }
      mockExamQuestionFeedback {
        id
        content
        type
        user {
          nickname
          id
        }
        recommendationCount {
          good
          bad
        }
        myRecommedationStatus {
          isGood
          isBad
        }
        created_at
        updated_at
      }
    }
  }
}
    ${FullQuestionIncludingExamIdPartsFragmentDoc}
${QusetionCommentPartsFragmentDoc}`;

export function useReadMockExamQuestionsByMockExamIdQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamQuestionsByMockExamIdQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamQuestionsByMockExamIdQuery, ReadMockExamQuestionsByMockExamIdQueryVariables>({ query: ReadMockExamQuestionsByMockExamIdDocument, ...options });
};
export const ReadAllQuestionsDocument = gql`
    query ReadAllQuestions($input: ReadAllQuestionsInput!) {
  readAllQuestions(input: $input) {
    error
    ok
    questions {
      id
      question
      question_img {
        url
        name
      }
      solution_img {
        url
        name
      }
    }
  }
}
    `;

export function useReadAllQuestionsQuery(options: Omit<Urql.UseQueryArgs<ReadAllQuestionsQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadAllQuestionsQuery, ReadAllQuestionsQueryVariables>({ query: ReadAllQuestionsDocument, ...options });
};
export const ReadMockExamQuestionDocument = gql`
    query ReadMockExamQuestion($input: ReadMockExamQuestionInput!) {
  readMockExamQuestion(input: $input) {
    isCoAuthor
    mockExamQusetion {
      linkedQuestionIds
      mockExam {
        id
        title
        approved
      }
      user {
        id
        role
      }
      id
      isBookmarked
      myQuestionState
      commentCount
      number
      question
      question_img {
        url
        uid
      }
      solution
      solution_img {
        uid
        url
      }
      mockExamQuestionFeedback {
        recommendationCount {
          bad
          good
        }
        myRecommedationStatus {
          isBad
          isGood
        }
        user {
          id
          nickname
        }
        id
        type
        content
        created_at
      }
    }
    error
    ok
  }
}
    `;

export function useReadMockExamQuestionQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamQuestionQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamQuestionQuery, ReadMockExamQuestionQueryVariables>({ query: ReadMockExamQuestionDocument, ...options });
};
export const EditMockExamQuestionDocument = gql`
    mutation EditMockExamQuestion($input: EditMockExamQuestionInput!) {
  editMockExamQuestion(input: $input) {
    error
    ok
  }
}
    `;

export function useEditMockExamQuestionMutation() {
  return Urql.useMutation<EditMockExamQuestionMutation, EditMockExamQuestionMutationVariables>(EditMockExamQuestionDocument);
};
export const DeleteMockExamQuestionDocument = gql`
    mutation DeleteMockExamQuestion($input: DeleteMockExamQuestionInput!) {
  deleteMockExamQuestion(input: $input) {
    error
    ok
  }
}
    `;

export function useDeleteMockExamQuestionMutation() {
  return Urql.useMutation<DeleteMockExamQuestionMutation, DeleteMockExamQuestionMutationVariables>(DeleteMockExamQuestionDocument);
};
export const ReadAllMockExamQuestionDocument = gql`
    query ReadAllMockExamQuestion {
  readAllMockExamQuestion {
    error
    ok
    mockExamQuestions {
      ...FullQuestionParts
    }
  }
}
    ${FullQuestionPartsFragmentDoc}`;

export function useReadAllMockExamQuestionQuery(options?: Omit<Urql.UseQueryArgs<ReadAllMockExamQuestionQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadAllMockExamQuestionQuery, ReadAllMockExamQuestionQueryVariables>({ query: ReadAllMockExamQuestionDocument, ...options });
};
export const CreateMockExamQuestionDocument = gql`
    mutation CreateMockExamQuestion($input: CreateMockExamQuestionInput!) {
  createMockExamQuestion(input: $input) {
    error
    ok
    questionId
  }
}
    `;

export function useCreateMockExamQuestionMutation() {
  return Urql.useMutation<CreateMockExamQuestionMutation, CreateMockExamQuestionMutationVariables>(CreateMockExamQuestionDocument);
};
export const ReadMockExamQuestionsByStateDocument = gql`
    query ReadMockExamQuestionsByState($input: ReadMockExamQuestionsByStateInput!) {
  readMockExamQuestionsByState(input: $input) {
    error
    mockExamQusetions {
      state
      question {
        ...FullQuestionParts
      }
      exam {
        title
      }
    }
    ok
  }
}
    ${FullQuestionPartsFragmentDoc}`;

export function useReadMockExamQuestionsByStateQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamQuestionsByStateQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamQuestionsByStateQuery, ReadMockExamQuestionsByStateQueryVariables>({ query: ReadMockExamQuestionsByStateDocument, ...options });
};
export const ReadMockExamQuestionNumbersDocument = gql`
    query ReadMockExamQuestionNumbers($input: ReadMockExamQuestionNumbersInput!) {
  readMockExamQuestionNumbers(input: $input) {
    error
    ok
    questionNumbers {
      questionNumber
      questionId
    }
    examStatus
  }
}
    `;

export function useReadMockExamQuestionNumbersQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamQuestionNumbersQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamQuestionNumbersQuery, ReadMockExamQuestionNumbersQueryVariables>({ query: ReadMockExamQuestionNumbersDocument, ...options });
};
export const SearchQuestionsByKeywordDocument = gql`
    query SearchQuestionsByKeyword($input: SearchQuestionsByKeywordInput!) {
  searchQuestionsByKeyword(input: $input) {
    error
    ok
    questions {
      id
      question
      solution
      number
      isBookmarked
      myBookmark {
        id
        bookmarkFolder {
          id
          name
        }
      }
      user {
        id
        nickname
        profileImg
      }
      question_img {
        url
      }
      solution_img {
        url
      }
      mockExam {
        title
      }
    }
  }
}
    `;

export function useSearchQuestionsByKeywordQuery(options: Omit<Urql.UseQueryArgs<SearchQuestionsByKeywordQueryVariables>, 'query'>) {
  return Urql.useQuery<SearchQuestionsByKeywordQuery, SearchQuestionsByKeywordQueryVariables>({ query: SearchQuestionsByKeywordDocument, ...options });
};
export const ReadQuestionsByExamIdsDocument = gql`
    query ReadQuestionsByExamIds($input: ReadQuestionsByExamIdsInput!) {
  readQuestionsByExamIds(input: $input) {
    error
    ok
    questions {
      highScore
      middleScore
      lowScore
      mockExam {
        id
        title
        approved
        isPrivate
      }
      user {
        id
      }
      id
      isBookmarked
      myQuestionState
      commentCount
      number
      question
      question_img {
        url
        uid
      }
      solution
      solution_img {
        uid
        url
      }
      myBookmark {
        id
        bookmarkFolder {
          id
          name
        }
      }
      textHighlight {
        id
        data {
          memo
          startOffset
          endOffset
          startContainer
          endContainer
          color
          text
          type
        }
      }
      mockExamQuestionFeedback {
        recommendationCount {
          bad
          good
        }
        myRecommedationStatus {
          isBad
          isGood
        }
        user {
          id
          nickname
        }
        id
        type
        content
        created_at
      }
    }
  }
}
    `;

export function useReadQuestionsByExamIdsQuery(options: Omit<Urql.UseQueryArgs<ReadQuestionsByExamIdsQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadQuestionsByExamIdsQuery, ReadQuestionsByExamIdsQueryVariables>({ query: ReadQuestionsByExamIdsDocument, ...options });
};