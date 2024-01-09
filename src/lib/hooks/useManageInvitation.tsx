import {
  useAcceptCategoryInvitation,
  useDeleteCategoryInvitation,
  useGetCategoryInvitations,
} from '@lib/graphql/hook/useExamCategoryInvitation';
import { handleError } from '@lib/utils/utils';
import { message } from 'antd';
import { useMemo } from 'react';
import useApolloClient from './useApolloCient';
import { GET_CATEGORY_INVITATION } from '@lib/graphql/query/examCategoryInvitationQuery';
import { GetExamCategoryInvitationsQuery } from '@lib/graphql/query/examCategoryInvitationQuery.generated';
import useStorage from './useStorage';
import { StorageType } from 'customTypes';

const useManageInvitation = () => {
  const { data: getCategoryInvitationResponse } = useGetCategoryInvitations();
  const { refetchCategories } = useStorage(StorageType.BOOKMARK);
  const { updateCache } = useApolloClient();
  const [deleteCategoryInvitation] = useDeleteCategoryInvitation();
  const [acceptCategoryInvitation] = useAcceptCategoryInvitation();
  const invitations = useMemo(
    () =>
      getCategoryInvitationResponse?.getExamCategoryInvitations?.invitations ||
      [],
    [getCategoryInvitationResponse]
  );

  const handleDeleteCategoryInvitation = async (invitationId: number) => {
    try {
      const confirmed = confirm('정말로 삭제하시겠습니까?');
      if (confirmed) {
        const res = await deleteCategoryInvitation({
          variables: { input: { invitationId } },
        });
        if (res.data?.deleteExamCategoryInvitation.ok) {
          message.success('삭제에 성공했습니다.');
          filterInvitationCache(invitationId);
        } else {
          message.error('삭제에 실패했습니다.');
        }
      }
    } catch (e) {
      handleError(e);
      message.error('삭제에 실패했습니다.');
    }
  };

  const handleAcceptCategoryInvitation = async ({
    categoryId,
    invitationId,
  }: {
    categoryId: number;
    invitationId: number;
  }) => {
    try {
      const res = await acceptCategoryInvitation({
        variables: { input: { categoryId } },
      });
      if (res.data?.acceptExamCategoryInvitation.ok) {
        refetchCategories({
          isBookmarked: true,
        });
        message.success('수락! 저장된 암기장에서 확인하세요.');
        filterInvitationCache(invitationId);
      } else {
        message.error('수락에 실패했습니다.');
      }
    } catch (e) {
      handleError(e);
      message.error('수락에 실패했습니다.');
    }
  };

  const filterInvitationCache = (invitationId: number) => {
    updateCache<GetExamCategoryInvitationsQuery>(
      {
        query: GET_CATEGORY_INVITATION,
      },
      (data) => {
        return {
          ...data,
          getExamCategoryInvitations: {
            ...data.getExamCategoryInvitations,
            invitations: data.getExamCategoryInvitations.invitations.filter(
              (invitation) => invitation.id !== invitationId
            ),
          },
        };
      }
    );
  };

  return {
    invitations,
    handleAcceptCategoryInvitation,
    handleDeleteCategoryInvitation,
  };
};

export default useManageInvitation;
