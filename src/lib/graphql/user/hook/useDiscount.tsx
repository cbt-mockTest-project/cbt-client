import { useMutation } from '@apollo/client';
import {
  CHECK_DISCOUNT_CODE,
  UPDATE_DISCOUNT_CODE,
} from '../query/discountCodeQuery';
import {
  CheckDiscountCodeMutation,
  CheckDiscountCodeMutationVariables,
  UpdateDiscountCodeMutation,
  UpdateDiscountCodeMutationVariables,
} from '../query/discountCodeQuery.generated';

export const useCheckDiscountCode = () =>
  useMutation<CheckDiscountCodeMutation, CheckDiscountCodeMutationVariables>(
    CHECK_DISCOUNT_CODE
  );

export const useUpdateDiscountCode = () =>
  useMutation<UpdateDiscountCodeMutation, UpdateDiscountCodeMutationVariables>(
    UPDATE_DISCOUNT_CODE
  );
