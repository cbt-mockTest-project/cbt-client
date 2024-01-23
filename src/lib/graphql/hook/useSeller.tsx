import { useLazyQuery } from '@apollo/client';
import { GET_BUYERS } from '../query/sellerQuery';
import {
  GetBuyersQuery,
  GetBuyersQueryVariables,
} from '../query/sellerQuery.generated';

export const useLazyGetBuyers = () =>
  useLazyQuery<GetBuyersQuery, GetBuyersQueryVariables>(GET_BUYERS);
