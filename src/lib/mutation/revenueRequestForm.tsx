import { UPDATE_REVENUE_REQUEST_FORM_MUTATION } from '@lib/graphql/query/revenueRequestFormQuery';
import {
  UpdateRevenueRequestFormMutation,
  UpdateRevenueRequestFormMutationVariables,
} from '@lib/graphql/query/revenueRequestFormQuery.generated';
import { apolloClient } from '@modules/apollo';
import { UpdateRevenueRequestFormInput } from 'types';

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
