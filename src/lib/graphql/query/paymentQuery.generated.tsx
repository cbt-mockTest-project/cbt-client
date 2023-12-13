import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ChangeClientRoleAndCreatePaymentMutationVariables = Types.Exact<{
  input: Types.ChangeClientRoleAndCreatePaymentInput;
}>;

export type ChangeClientRoleAndCreatePaymentMutation = {
  __typename?: 'Mutation';
  changeClientRoleAndCreatePayment: {
    __typename?: 'ChangeClientRoleAndCreatePaymentOutput';
    error?: string | null;
    ok: boolean;
    paymentId?: number | null;
  };
};

export type UpdatePaymentMutationVariables = Types.Exact<{
  input: Types.UpdatePaymentInput;
}>;

export type UpdatePaymentMutation = {
  __typename?: 'Mutation';
  updatePayment: {
    __typename?: 'UpdatePaymentOutput';
    error?: string | null;
    ok: boolean;
  };
};

export type CreatePaymentMutationVariables = Types.Exact<{
  input: Types.CreatePaymentInput;
}>;

export type CreatePaymentMutation = {
  __typename?: 'Mutation';
  createPayment: {
    __typename?: 'CreatePaymentOutput';
    error?: string | null;
    ok: boolean;
  };
};

export type GetMyPaymentsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetMyPaymentsQuery = {
  __typename?: 'Query';
  getMyPayments: {
    __typename?: 'GetMyPaymentsOutput';
    error?: string | null;
    ok: boolean;
    payments?: Array<{
      __typename?: 'Payment';
      id: number;
      price: number;
      updated_at: any;
      created_at: any;
      productName: string;
      receiptUrl?: string | null;
    }> | null;
  };
};

export const ChangeClientRoleAndCreatePaymentDocument = gql`
  mutation ChangeClientRoleAndCreatePayment(
    $input: ChangeClientRoleAndCreatePaymentInput!
  ) {
    changeClientRoleAndCreatePayment(input: $input) {
      error
      ok
      paymentId
    }
  }
`;

export function useChangeClientRoleAndCreatePaymentMutation() {
  return Urql.useMutation<
    ChangeClientRoleAndCreatePaymentMutation,
    ChangeClientRoleAndCreatePaymentMutationVariables
  >(ChangeClientRoleAndCreatePaymentDocument);
}
export const UpdatePaymentDocument = gql`
  mutation UpdatePayment($input: UpdatePaymentInput!) {
    updatePayment(input: $input) {
      error
      ok
    }
  }
`;

export function useUpdatePaymentMutation() {
  return Urql.useMutation<
    UpdatePaymentMutation,
    UpdatePaymentMutationVariables
  >(UpdatePaymentDocument);
}
export const CreatePaymentDocument = gql`
  mutation CreatePayment($input: CreatePaymentInput!) {
    createPayment(input: $input) {
      error
      ok
    }
  }
`;

export function useCreatePaymentMutation() {
  return Urql.useMutation<
    CreatePaymentMutation,
    CreatePaymentMutationVariables
  >(CreatePaymentDocument);
}
export const GetMyPaymentsDocument = gql`
  query GetMyPayments {
    getMyPayments {
      error
      ok
      payments {
        id
        price
        updated_at
        created_at
        productName
        receiptUrl
      }
    }
  }
`;

export function useGetMyPaymentsQuery(
  options?: Omit<Urql.UseQueryArgs<GetMyPaymentsQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetMyPaymentsQuery, GetMyPaymentsQueryVariables>({
    query: GetMyPaymentsDocument,
    ...options,
  });
}
