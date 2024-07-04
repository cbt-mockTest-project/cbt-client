import { useEffect, useState } from 'react';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { apolloClient } from '@modules/apollo';
import { CHECK_HAS_CATEGORY_ACCESS } from '@lib/graphql/query/examCategoryBookmark';
import {
  CheckHasCategoryAccessMutation,
  CheckHasCategoryAccessMutationVariables,
} from '@lib/graphql/query/examCategoryBookmark.generated';
import { SessionStorage } from '@lib/utils/sessionStorage';
import { App } from 'antd';
import { useRouter } from 'next/router';

const useCheckHasCategoryAccess = () => {
  const { message } = App.useApp();
  const router = useRouter();
  const categoryId = useAppSelector((state) => state.examCategory.category.id);

  const isPublic = useAppSelector(
    (state) => state.examCategory.category.isPublic
  );
  const [isCategoryAccess, setIsCategoryAccess] = useState(false);
  const { data: meQuery } = useMeQuery();
  const sessionStorage = new SessionStorage();
  const categoryAuthorId = useAppSelector(
    (state) => state.examCategory.category.user.id
  );

  useEffect(() => {
    if (!categoryId || !meQuery || isPublic) return;
    if (!meQuery.me.user) {
      message.error('잘못된 접근입니다.');
      router.replace('/');
      return;
    }
    (async () => {
      const res = await apolloClient.mutate<
        CheckHasCategoryAccessMutation,
        CheckHasCategoryAccessMutationVariables
      >({
        mutation: CHECK_HAS_CATEGORY_ACCESS,
        variables: {
          input: {
            categoryId,
          },
        },
      });
      if (res.data?.checkHasCategoryAccess.ok) {
        sessionStorage.remove('isCheckingCategoryAccess');
        setIsCategoryAccess(true);
        return;
      }
      message.error('잘못된 접근입니다.');
      router.replace('/');
    })();
  }, [categoryAuthorId, meQuery, categoryId, isPublic]);
  return { isCategoryAccess };
};

export default useCheckHasCategoryAccess;
