import { useMutation, useQuery } from '@apollo/client';
import {
  ChangeClientRoleAndCreatePaymentMutation,
  ChangeClientRoleAndCreatePaymentMutationVariables,
  CreatePaymentMutation,
  CreatePaymentMutationVariables,
  GetMyPaymentsQuery,
  GetMyPaymentsQueryVariables,
  UpdatePaymentMutation,
  UpdatePaymentMutationVariables,
} from '../query/paymentQuery.generated';
import {
  CHANGE_CLIENT_ROLE_AND_CREATE_PAYMENT,
  CREATE_PAYMENT,
  GET_MY_PAYMENTS,
  UPDATE_PAYMENT,
} from '../query/paymentQuery';

export const useChangeClientRoleAndCreatePayment = () =>
  useMutation<
    ChangeClientRoleAndCreatePaymentMutation,
    ChangeClientRoleAndCreatePaymentMutationVariables
  >(CHANGE_CLIENT_ROLE_AND_CREATE_PAYMENT);

export const useUpdatePayment = () =>
  useMutation<UpdatePaymentMutation, UpdatePaymentMutationVariables>(
    UPDATE_PAYMENT
  );

export const useCreatePayment = () =>
  useMutation<CreatePaymentMutation, CreatePaymentMutationVariables>(
    CREATE_PAYMENT
  );

export const useGetMyPayments = () =>
  useQuery<GetMyPaymentsQuery, GetMyPaymentsQueryVariables>(GET_MY_PAYMENTS);
