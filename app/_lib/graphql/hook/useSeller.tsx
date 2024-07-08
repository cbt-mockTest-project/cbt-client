import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_BUYERS } from '../query/sellerQuery';
import {
  GetBuyersQuery,
  GetBuyersQueryVariables,
} from '../query/sellerQuery.generated';

export const useLazyGetBuyers = () =>
  useLazyQuery<GetBuyersQuery, GetBuyersQueryVariables>(GET_BUYERS);

export const useGetBuyers = () =>
  useQuery<GetBuyersQuery, GetBuyersQueryVariables>(GET_BUYERS);
