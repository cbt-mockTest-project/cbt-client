import { CREATE_ITEM_MUTATION } from '@lib/graphql/query/itemQuery';
import {
  CreateItemMutation,
  CreateItemMutationVariables,
} from '@lib/graphql/query/itemQuery.generated';
import { apolloClient } from '@modules/apollo';
import { useMutation } from '@tanstack/react-query';
import { CreateItemInput } from 'types';

export const useCreateStoreItemMutation = () =>
  useMutation({
    mutationKey: ['createStoreItem'],
    mutationFn: async (input: CreateItemInput) => {
      const { data } = await apolloClient.mutate<
        CreateItemMutation,
        CreateItemMutationVariables
      >({
        mutation: CREATE_ITEM_MUTATION,
        variables: {
          input,
        },
      });
      return data;
    },
  });
