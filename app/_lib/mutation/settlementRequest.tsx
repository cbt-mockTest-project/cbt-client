import { UPDATE_SETTLEMENT_REQUEST } from '../graphql/query/settlementRequestQuery';
import {
  UpdateSettlementRequestMutation,
  UpdateSettlementRequestMutationVariables,
} from '../graphql/query/settlementRequestQuery.generated';
import { apolloClient } from '../../_modules/apollo';
import { UpdateSettlementRequestInput } from '../../types';

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
