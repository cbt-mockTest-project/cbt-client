import { useMutation } from '@apollo/client';
import {
  ChangeClientRoleAndCreatePaymentMutation,
  ChangeClientRoleAndCreatePaymentMutationVariables,
  UpdatePaymentMutation,
  UpdatePaymentMutationVariables,
} from '../query/paymentQuery.generated';
import {
  CHANGE_CLIENT_ROLE_AND_CREATE_PAYMENT,
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
