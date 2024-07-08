import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ReadVisitCountQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ReadVisitCountQuery = { __typename?: 'Query', readVisitCount: { __typename?: 'ReadVisitCountOutput', count?: number | null, error?: string | null, ok: boolean } };

export type CreateVisitMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateVisitMutation = { __typename?: 'Mutation', createVisit: { __typename?: 'CoreOutput', error?: string | null, ok: boolean } };

export type ReadVisitHistoryQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ReadVisitHistoryQuery = { __typename?: 'Query', readVisitHistory: { __typename?: 'ReadVisitHistoryOutput', error?: string | null, ok: boolean, today?: number | null, total?: number | null, yesterday?: number | null } };


export const ReadVisitCountDocument = gql`
    query ReadVisitCount {
  readVisitCount {
    count
    error
    ok
  }
}
    `;

export function useReadVisitCountQuery(options?: Omit<Urql.UseQueryArgs<ReadVisitCountQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadVisitCountQuery, ReadVisitCountQueryVariables>({ query: ReadVisitCountDocument, ...options });
};
export const CreateVisitDocument = gql`
    mutation CreateVisit {
  createVisit {
    error
    ok
  }
}
    `;

export function useCreateVisitMutation() {
  return Urql.useMutation<CreateVisitMutation, CreateVisitMutationVariables>(CreateVisitDocument);
};
export const ReadVisitHistoryDocument = gql`
    query ReadVisitHistory {
  readVisitHistory {
    error
    ok
    today
    total
    yesterday
  }
}
    `;

export function useReadVisitHistoryQuery(options?: Omit<Urql.UseQueryArgs<ReadVisitHistoryQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadVisitHistoryQuery, ReadVisitHistoryQueryVariables>({ query: ReadVisitHistoryDocument, ...options });
};