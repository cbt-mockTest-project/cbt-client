import { useGetMyCategories } from '../graphql/hook/useExam';
import {
  useDeleteExamCategoryBookmark,
  useGetCategorySubscribers,
} from '../graphql/hook/useExamCategoryBookmark';
import { useCreateCategoryInvitation } from '../graphql/hook/useExamCategoryInvitation';
import { useLazyGetUser } from '../graphql/hook/useUser';
import { handleError } from '../utils/utils';
import { App } from 'antd';
import { User } from '../../types';
import useApolloClient from './useApolloCient';
import { GET_EXAM_CATEROGY_SUBSCRIBERS } from '../graphql/query/examCategoryBookmark';
import { GetExamCategorySubscribersQuery } from '../graphql/query/examCategoryBookmark.generated';
import { useRef } from 'react';

export interface SearchAndInviteUserParams {
  keyword: string;
  categoryId: number;
}

const useCategoryInvitation = (categoryId: number) => {
  const { message } = App.useApp();
  const isInviting = useRef(false);
  const { data: getMyCategoriesResponse } = useGetMyCategories();
  const { updateCache } = useApolloClient();
  const [getUser] = useLazyGetUser();
  const [deleteCategorySubscriber] = useDeleteExamCategoryBookmark();
  const [createCategoryInvitation] = useCreateCategoryInvitation();
  const { data: getCategorySubscribersResponse } =
    useGetCategorySubscribers(categoryId);

  const handleDeleteCategorySubscriber = async (userId: number) => {
    try {
      const confirmed = confirm('정말로 삭제하시겠습니까?');
      if (confirmed) {
        const res = await deleteCategorySubscriber({
          variables: { input: { categoryId, userId } },
        });
        if (res.data?.deleteExamCategoryBookmark.ok) {
          updateCache<GetExamCategorySubscribersQuery>(
            {
              query: GET_EXAM_CATEROGY_SUBSCRIBERS,
              variables: { input: { categoryId } },
            },
            (data) => {
              return {
                ...data,
                getExamCategorySubscribers: {
                  ...data.getExamCategorySubscribers,
                  users: data.getExamCategorySubscribers.users.filter(
                    (subscriber) => subscriber.id !== userId
                  ),
                },
              };
            }
          );
          message.success('삭제에 성공했습니다.');
        } else {
          message.error('삭제에 실패했습니다.');
        }
      }
    } catch (e) {
      handleError(e);
    }
  };

  const handleSearchAndInviteUser = async ({
    keyword,
    categoryId,
  }: SearchAndInviteUserParams) => {
    if (isInviting.current) return;
    isInviting.current = true;
    try {
      if (!categoryId) return message.error('카테고리를 선택해주세요.');
      const res = await getUser({
        variables: { input: { keyword } },
      });
      if (res.data?.getUserByNicknameOrEmail.ok) {
        const userToInvite = res.data.getUserByNicknameOrEmail.user;
        const confirmed = confirm(
          `${res.data.getUserByNicknameOrEmail.user?.nickname}님을 초대하시겠습니까?`
        );
        if (confirmed && userToInvite) {
          const res = await createCategoryInvitation({
            variables: {
              input: {
                categoryId,
                userIdForInvitation: userToInvite.id,
              },
            },
          });
          if (res.data?.createExamCategoryInvitation.ok) {
            return message.success('초대에 성공했습니다.');
          }
          return message.error(res.data?.createExamCategoryInvitation.error);
        }
      }

      if (res.data?.getUserByNicknameOrEmail.error) {
        message.error(res.data.getUserByNicknameOrEmail.error);
      }
    } catch (e) {
      handleError(e);
      message.error('초대에 실패했습니다.');
    } finally {
      isInviting.current = false;
    }
  };

  return {
    handleDeleteCategorySubscriber,
    handleSearchAndInviteUser,
    subscribers: (getCategorySubscribersResponse?.getExamCategorySubscribers
      .users || []) as User[],
    myCategories: (
      getMyCategoriesResponse?.getMyExamCategories.categories || []
    ).map((category) => ({
      label: category.name,
      value: category.id,
    })),
  };
};

export default useCategoryInvitation;
