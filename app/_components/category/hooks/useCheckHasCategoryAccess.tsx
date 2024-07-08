import { useEffect, useState } from 'react';
import { useMeQuery } from '../../../_lib/graphql/hook/useUser';
import { apolloClient } from '../../../_modules/apollo';
import { CHECK_HAS_CATEGORY_ACCESS } from '../../../_lib/graphql/query/examCategoryBookmark';
import {
  CheckHasCategoryAccessMutation,
  CheckHasCategoryAccessMutationVariables,
} from '../../../_lib/graphql/query/examCategoryBookmark.generated';
import { SessionStorage } from '../../../_lib/utils/sessionStorage';
import { App } from 'antd';
import { useRouter } from 'next/router';
import { MockExamCategory } from '../../../types';

interface UseCheckHasCategoryAccessProps {
  category: MockExamCategory;
}

const useCheckHasCategoryAccess = ({
  category,
}: UseCheckHasCategoryAccessProps) => {
  const { message } = App.useApp();
  const router = useRouter();
  const [isCategoryAccess, setIsCategoryAccess] = useState(false);
  const { data: meQuery } = useMeQuery();
  const sessionStorage = new SessionStorage();

  useEffect(() => {
    if (!category.id || !meQuery || category.isPublic) return;
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
            categoryId: category.id,
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
  }, [meQuery, category.isPublic]);
  return { isCategoryAccess };
};

export default useCheckHasCategoryAccess;
