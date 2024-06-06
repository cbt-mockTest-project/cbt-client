import { useUpsertRecentlyStudiedExams } from '@lib/graphql/hook/useUser';
import useAuth from '@lib/hooks/useAuth';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';

interface SolutionModeCoreProps {}

const SolutionModeCore: React.FC<SolutionModeCoreProps> = () => {
  const router = useRouter();
  const categoryId = useAppSelector(
    (state) => state.examCategory?.category?.id
  );
  const examId = router.query.Id;
  const { isLoggedIn } = useAuth();
  const [upsertRecentlyStudiedExams] = useUpsertRecentlyStudiedExams();

  useEffect(() => {
    try {
      if (categoryId && examId && isLoggedIn) {
        upsertRecentlyStudiedExams({
          variables: {
            input: {
              categoryId,
              examIds: [Number(examId)],
              questionIndex: 1,
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
