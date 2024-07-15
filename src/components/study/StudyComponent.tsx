import SolutionModeComponent from '@components/solutionMode/SolutionModeComponent';
import useQuestions from '@lib/hooks/useQuestions';
import { ExamMode } from 'customTypes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  QuestionState,
  ReadBookmarkedQuestionsInput,
  ReadQuestionsByExamIdsInput,
} from 'types';
import StudyPaymentGuard from './StudyPaymentGuard';
import StudyHeaderV2 from './StudyHeaderV2';
import { responsive } from '@lib/utils/responsive';
import StudyModeWrapper from './StudyModeWrapper';
import { useAppSelector } from '@modules/redux/store/configureStore';
import {
  PUBLIC_CATEGORY_ID,
  PUBLIC_EXAM_ID,
} from '@lib/constants/sessionStorage';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { CHECK_IS_ACCESSIBLE_CATEGORY } from '@lib/graphql/query/examCategoryBookmark';
import { apolloClient } from '@modules/apollo';
import {
  CheckIsAccessibleCategoryMutation,
  CheckIsAccessibleCategoryMutationVariables,
} from '@lib/graphql/query/examCategoryBookmark.generated';
import { SessionStorage } from '@lib/utils/sessionStorage';
import Portal from '@components/common/portal/Portal';
import { Spin } from 'antd';

const StudyComponentBlock = styled.div`
  min-height: 100vh;
  .study-component-wrapper {
    padding: 10px 20px;
    position: relative;
    max-width: 1280px;
    margin: 0 auto;
  }
  @media (max-width: ${responsive.medium}) {
    .study-component-wrapper {
      padding: 10px;
    }
  }
`;

interface StudyComponentProps {}

const StudyComponent: React.FC<StudyComponentProps> = () => {
  const sessionStorage = new SessionStorage();
  const isPrivate = useAppSelector(
    (state) => state.mockExam.questions?.[0]?.mockExam.isPrivate
  );
  const firstQuestionExamId = useAppSelector(
    (state) => state.mockExam.questions?.[0]?.mockExam.id
  );
  const examAuthorId = useAppSelector(
    (state) => state.mockExam.questions?.[0]?.user.id
  );

  const { data: meQuery } = useMeQuery();
  const [isFetchedQuestions, setIsFetchedQuestions] = useState(false);
  const [fetchQuestionsLoading, setFetchQuestionsLoading] = useState(false);
  const { fetchQuestions, fetchBookmarkedQuestions, resetQuestions } =
    useQuestions();

  const [questionsQueryInput, setQuestionsQueryInput] =
    useState<ReadQuestionsByExamIdsInput | null>(null);
  const router = useRouter();
  const {
    order,
    states,
    limit,
    examIds,
    mode,
    examId,
    bookmarked,
    categoryId,
    folderId,
  } = router.query;
  useEffect(() => {
    setFetchQuestionsLoading(true);
    if (!router.isReady) return;
    if (bookmarked === 'true') {
      const input: ReadBookmarkedQuestionsInput = {
        order: order as string,
        limit: Number(limit),
        folderId: Number(folderId),
      };
      fetchBookmarkedQuestions(input).then(() => {
        setIsFetchedQuestions(true);
      });
      return;
    }
    if (examId) {
      const input: ReadQuestionsByExamIdsInput = {
        order: 'normal',
        ids: [Number(examId)],
      };
      setQuestionsQueryInput(input);
      fetchQuestions(input).then(() => {
        setIsFetchedQuestions(true);
      });
    }
    // 다중 문제 풀이
    else {
      if (!order || !examIds || !mode) return;
      const input: ReadQuestionsByExamIdsInput = {
        order: order as string,
        limit: Number(limit),
        ids: String(examIds)
          .split(',')
          .map((id) => Number(id)),
      };
      if (bookmarked && bookmarked === 'true') {
        input.bookmarked = true;
      }
      if (states && typeof states === 'string')
        input.states = states.split(',') as QuestionState[];

      setQuestionsQueryInput(input);
      fetchQuestions(input).then(() => {
        setIsFetchedQuestions(true);
      });
    }
  }, [router.isReady]);

  useEffect(() => {
    resetQuestions();
    return () => {
      resetQuestions();
    };
  }, []);

  useEffect(() => {
    if (!isFetchedQuestions || !firstQuestionExamId) return;
    (async () => {
      try {
        if (!isPrivate) {
          setFetchQuestionsLoading(() => false);
          return;
        }
        if (!meQuery) {
          return;
        }
        const publicExamId = sessionStorage.get(PUBLIC_EXAM_ID);
        const publicCategoryId = sessionStorage.get(PUBLIC_CATEGORY_ID);

        if (publicExamId && Number(publicExamId) === firstQuestionExamId) {
          setFetchQuestionsLoading(() => false);
          return;
        }
        if (
          publicCategoryId &&
          categoryId &&
          Number(publicCategoryId) === Number(categoryId)
        ) {
          setFetchQuestionsLoading(() => false);
          return;
        }
        if (!meQuery.me.user) {
          const res = await apolloClient.mutate<
            CheckIsAccessibleCategoryMutation,
            CheckIsAccessibleCategoryMutationVariables
          >({
            fetchPolicy: 'network-only',
            mutation: CHECK_IS_ACCESSIBLE_CATEGORY,
            variables: {
              input: {
                examId: firstQuestionExamId,
              },
            },
          });
          if (res.data?.checkIsAccessibleCategory.ok) {
            setFetchQuestionsLoading(() => false);
            return;
          }
          router.replace('/');
          return;
        }
        if (meQuery?.me?.user?.id && examAuthorId) {
          const res = await apolloClient.mutate<
            CheckIsAccessibleCategoryMutation,
            CheckIsAccessibleCategoryMutationVariables
          >({
            fetchPolicy: 'network-only',
            mutation: CHECK_IS_ACCESSIBLE_CATEGORY,
            variables: {
              input: {
                examId: firstQuestionExamId,
              },
            },
          });
          if (res.data?.checkIsAccessibleCategory.ok) {
            setFetchQuestionsLoading(() => false);
            return;
          }
          setFetchQuestionsLoading(() => meQuery.me.user.id !== examAuthorId);
          if (meQuery.me.user.id !== examAuthorId) {
            router.replace('/');
            return;
          }
        }
      } catch (e) {
        console.log(e);
        router.replace('/');
      }
    })();
  }, [
    isFetchedQuestions,
    meQuery,
    examAuthorId,
    isPrivate,
    firstQuestionExamId,
    categoryId,
  ]);

  if (fetchQuestionsLoading)
    return (
      <Portal>
        <Spin size="large" fullscreen />
      </Portal>
    );

  return (
    <StudyComponentBlock>
      <div className="study-component-wrapper">
        {router.query.tab !== 'end' && <StudyHeaderV2 />}
        {mode === ExamMode.SOLUTION && questionsQueryInput && (
          <SolutionModeComponent />
        )}
        {['typing', 'card'].includes(mode as string) && <StudyModeWrapper />}
        <StudyPaymentGuard
          {...(examId ? { examId: String(examId) } : {})}
          {...(examIds ? { examIds: String(examIds) } : {})}
        />
      </div>
    </StudyComponentBlock>
  );
};

export default StudyComponent;
