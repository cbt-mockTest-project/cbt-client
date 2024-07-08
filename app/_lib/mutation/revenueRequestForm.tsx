import { UPDATE_REVENUE_REQUEST_FORM_MUTATION } from '../graphql/query/revenueRequestFormQuery';
import {
  UpdateRevenueRequestFormMutation,
  UpdateRevenueRequestFormMutationVariables,
} from '../graphql/query/revenueRequestFormQuery.generated';
import { apolloClient } from '../../_modules/apollo';
import { UpdateRevenueRequestFormInput } from '../../types';

export const updateRevenueRequestFormMutation = (
  input: UpdateRevenueRequestFormInput
) =>
  apolloClient.mutate<
    UpdateRevenueRequestFormMutation,
    UpdateRevenueRequestFormMutationVariables
  >({
    mutation: UPDATE_REVENUE_REQUEST_FORM_MUTATION,
    variables: { input },
  });
