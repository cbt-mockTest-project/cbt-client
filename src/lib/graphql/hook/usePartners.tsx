import { useQuery } from '@apollo/client';
import {
  GetPartnersQuery,
  GetPartnersQueryVariables,
} from '../query/partnerQuery.generated';
import { GET_PARTNERS } from '../query/partnerQuery';

export const useGetPartners = () =>
  useQuery<GetPartnersQuery, GetPartnersQueryVariables>(GET_PARTNERS);
