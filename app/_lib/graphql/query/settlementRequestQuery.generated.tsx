import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateSettlementRequestMutationVariables = Types.Exact<{
  input: Types.CreateSettlementRequestInput;
}>;


export type CreateSettlementRequestMutation = { __typename?: 'Mutation', createSettlementRequest: { __typename?: 'CreateSettlementRequestOutput', error?: string | null, ok: boolean } };

export type GetSettlementRequestsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetSettlementRequestsQuery = { __typename?: 'Query', getSettlementRequests: { __typename?: 'GetSettlementRequestsOutput', error?: string | null, ok: boolean, settlementRequests?: Array<{ __typename?: 'SettlementRequest', accountHolder: string, accountNumber: string, amount: number, bankName: string, created_at: any, id: number, status: Types.SettlementRequestStatus, updated_at: any, user: { __typename?: 'User', email: string, id: number, nickname: string } }> | null } };

export type GetMySettlementRequestQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMySettlementRequestQuery = { __typename?: 'Query', getMySettlementRequest: { __typename?: 'GetMySettlementRequestOutput', error?: string | null, ok: boolean, settlementRequest?: { __typename?: 'SettlementRequest', accountHolder: string, accountNumber: string, amount: number, bankName: string, created_at: any, id: number, status: Types.SettlementRequestStatus, updated_at: any } | null } };

export type GetMySettlementRequestsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMySettlementRequestsQuery = { __typename?: 'Query', getMySettlementRequests: { __typename?: 'GetMySettlementRequestsOutput', error?: string | null, ok: boolean, settlementRequests?: Array<{ __typename?: 'SettlementRequest', accountHolder: string, accountNumber: string, amount: number, bankName: string, created_at: any, id: number, status: Types.SettlementRequestStatus, updated_at: any }> | null } };

export type UpdateSettlementRequestMutationVariables = Types.Exact<{
  input: Types.UpdateSettlementRequestInput;
}>;


export type UpdateSettlementRequestMutation = { __typename?: 'Mutation', updateSettlementRequest: { __typename?: 'UpdateSettlementRequestOutput', error?: string | null, ok: boolean } };


export const CreateSettlementRequestDocument = gql`
    mutation CreateSettlementRequest($input: CreateSettlementRequestInput!) {
  createSettlementRequest(input: $input) {
    error
    ok
  }
}
    `;

export function useCreateSettlementRequestMutation() {
  return Urql.useMutation<CreateSettlementRequestMutation, CreateSettlementRequestMutationVariables>(CreateSettlementRequestDocument);
};
export const GetSettlementRequestsDocument = gql`
    query GetSettlementRequests {
  getSettlementRequests {
    error
    ok
    settlementRequests {
      accountHolder
      accountNumber
      amount
      bankName
      created_at
      id
      status
      updated_at
      user {
        email
        id
        nickname
      }
    }
  }
}
    `;

export function useGetSettlementRequestsQuery(options?: Omit<Urql.UseQueryArgs<GetSettlementRequestsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSettlementRequestsQuery, GetSettlementRequestsQueryVariables>({ query: GetSettlementRequestsDocument, ...options });
};
export const GetMySettlementRequestDocument = gql`
    query GetMySettlementRequest {
  getMySettlementRequest {
    error
    ok
    settlementRequest {
      accountHolder
      accountNumber
      amount
      bankName
      created_at
      id
      status
      updated_at
    }
  }
}
    `;

export function useGetMySettlementRequestQuery(options?: Omit<Urql.UseQueryArgs<GetMySettlementRequestQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMySettlementRequestQuery, GetMySettlementRequestQueryVariables>({ query: GetMySettlementRequestDocument, ...options });
};
export const GetMySettlementRequestsDocument = gql`
    query GetMySettlementRequests {
  getMySettlementRequests {
    error
    ok
    settlementRequests {
      accountHolder
      accountNumber
      amount
      bankName
      created_at
      id
      status
      updated_at
    }
  }
}
    `;

export function useGetMySettlementRequestsQuery(options?: Omit<Urql.UseQueryArgs<GetMySettlementRequestsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMySettlementRequestsQuery, GetMySettlementRequestsQueryVariables>({ query: GetMySettlementRequestsDocument, ...options });
};
export const UpdateSettlementRequestDocument = gql`
    mutation UpdateSettlementRequest($input: UpdateSettlementRequestInput!) {
  updateSettlementRequest(input: $input) {
    error
    ok
  }
}
    `;

export function useUpdateSettlementRequestMutation() {
  return Urql.useMutation<UpdateSettlementRequestMutation, UpdateSettlementRequestMutationVariables>(UpdateSettlementRequestDocument);
};