import { UPDATE_SETTLEMENT_REQUEST } from '@lib/graphql/query/settlementRequestQuery';
import {
  UpdateSettlementRequestMutation,
  UpdateSettlementRequestMutationVariables,
} from '@lib/graphql/query/settlementRequestQuery.generated';
import { apolloClient } from '@modules/apollo';
import { UpdateSettlementRequestInput } from 'types';

export const updateSettlementRequestMutation = (
  input: UpdateSettlementRequestInput
) =>
  apolloClient.mutate<
    UpdateSettlementRequestMutation,
    UpdateSettlementRequestMutationVariables
  >({
    mutation: UPDATE_SETTLEMENT_REQUEST,
    variables: { input },
  });
