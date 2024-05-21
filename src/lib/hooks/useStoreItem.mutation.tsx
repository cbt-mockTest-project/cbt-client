import {
  CREATE_ITEM_MUTATION,
  UPDATE_ITEM_MUTATION,
} from '@lib/graphql/query/itemQuery';
import {
  CreateItemMutation,
  CreateItemMutationVariables,
  UpdateItemMutation,
  UpdateItemMutationVariables,
} from '@lib/graphql/query/itemQuery.generated';
import { apolloClient } from '@modules/apollo';
import { useMutation } from '@tanstack/react-query';
import { CreateItemInput, UpdateItemInput } from 'types';

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

export const useUpdateStoreItemMutation = () =>
  useMutation({
    mutationKey: ['updateStoreItem'],
    mutationFn: async (input: UpdateItemInput) => {
      const { data } = await apolloClient.mutate<
        UpdateItemMutation,
        UpdateItemMutationVariables
      >({
        mutation: UPDATE_ITEM_MUTATION,
        variables: {
          input,
        },
      });
      return data;
    },
  });
