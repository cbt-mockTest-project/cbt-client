import {
  APPROVE_CATEGORY_INVITATION_LINK,
  CREATE_CATEGORY_INVITATION_LINK,
} from '../graphql/query/categoryInvitationLinkQuery';
import { apolloClient } from '../../_modules/apollo';
import { useMutation } from '@tanstack/react-query';

export const useCreateCategoryInviteLinkMutation = () =>
  useMutation({
    mutationKey: ['createCategoryInviteLink'],
    mutationFn: async (categoryId: number) => {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_CATEGORY_INVITATION_LINK,
        variables: {
          input: {
            categoryId,
          },
        },
      });
      return data;
    },
  });

export const useApproveCategoryInviteLinkMutation = () =>
  useMutation({
    mutationKey: ['approveCategoryInviteLink'],
    mutationFn: async (code: string) => {
      const { data } = await apolloClient.mutate({
        mutation: APPROVE_CATEGORY_INVITATION_LINK,
        variables: {
          input: {
            code,
          },
        },
      });
      return data;
    },
  });
