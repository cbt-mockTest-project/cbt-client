import { useEffect, useState } from 'react';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { apolloClient } from '@modules/apollo';
import { CHECK_HAS_CATEGORY_ACCESS } from '@lib/graphql/query/examCategoryBookmark';
import {
  CheckHasCategoryAccessMutation,
  CheckHasCategoryAccessMutationVariables,
} from '@lib/graphql/query/examCategoryBookmark.generated';

const useCheckHasCategoryAccess = () => {
  const categoryId = useAppSelector((state) => state.examCategory.category.id);
  const [isCategoryAccess, setIsCategoryAccess] = useState(false);
  const { data: meQuery } = useMeQuery();
  const categoryAuthorId = useAppSelector(
    (state) => state.examCategory.category.user.id
  );

  useEffect(() => {
    if (meQuery?.me?.user?.id === categoryAuthorId) {
      setIsCategoryAccess(true);
      return;
    }
    if (!categoryId) return;
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
        setIsCategoryAccess(true);
      }
    })();
  }, [categoryAuthorId, meQuery, categoryId]);
  return { isCategoryAccess };
};

export default useCheckHasCategoryAccess;
