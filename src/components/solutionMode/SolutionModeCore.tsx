import { useUpsertRecentlyStudiedExams } from '@lib/graphql/hook/useUser';
import useAuth from '@lib/hooks/useAuth';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

interface SolutionModeCoreProps {}

const SolutionModeCore: React.FC<SolutionModeCoreProps> = () => {
  const router = useRouter();
  const categoryId = router.query.cid;
  const examId = router.query.Id;
  const { isLoggedIn } = useAuth();
  const [upsertRecentlyStudiedExams] = useUpsertRecentlyStudiedExams();

  useEffect(() => {
    try {
      if (categoryId && examId && isLoggedIn) {
        upsertRecentlyStudiedExams({
          variables: {
            input: {
              categoryId: Number(categoryId),
              examIds: [Number(examId)],
              questionIndex: 0,
            },
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [categoryId, examId, isLoggedIn]);
  return null;
};

export default SolutionModeCore;
