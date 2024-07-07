import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import SolutionModeCardItem from './SolutionModeCardItem';
import { useAppSelector } from '@modules/redux/store/configureStore';
import useInfinityScroll from '@lib/hooks/useInfinityScroll';
import { Skeleton, App } from 'antd';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { useRouter } from 'next/router';
import { apolloClient } from '@modules/apollo';
import {
  CheckIsAccessibleCategoryMutation,
  CheckIsAccessibleCategoryMutationVariables,
} from '@lib/graphql/query/examCategoryBookmark.generated';
import { CHECK_IS_ACCESSIBLE_CATEGORY } from '@lib/graphql/query/examCategoryBookmark';
import { SessionStorage } from '@lib/utils/sessionStorage';
import {
  PUBLIC_CATEGORY_ID,
  PUBLIC_EXAM_ID,
} from '@lib/constants/sessionStorage';

const SolutionModeCardItemListBlock = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

interface SolutionModeCardItemListProps {
  isAnswerAllHidden: boolean;
  isStaticPage?: boolean;
}

const LIMIT = 50;

const SolutionModeCardItemList: React.FC<SolutionModeCardItemListProps> = ({
  isAnswerAllHidden,
  isStaticPage,
}) => {
  const { message } = App.useApp();
  const sessionStorage = new SessionStorage();
  const router = useRouter();
  const categoryId = router.query.categoryId;
  const [page, setPage] = useState(1);
  const { data: meQuery } = useMeQuery();
  const [isMyExam, setIsMyExam] = useState(false);
  const serverSideQuestionIds = useAppSelector(
    (state) =>
      state.mockExam.serverSideQuestions?.length
        ? state.mockExam.serverSideQuestions.map((question) => question.id)
        : [],
    (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
  );
  const clientSideQuestionIds = useAppSelector(
    (state) =>
      state.mockExam.questions?.length
        ? state.mockExam.questions.map((question) => question.id)
        : [],
    (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
  );
  const questionIds = useMemo(() => {
    if (isStaticPage) {
      if (clientSideQuestionIds.length > 0) {
        return clientSideQuestionIds.slice(0, page * LIMIT);
      }
      if (serverSideQuestionIds.length > 0) {
        return serverSideQuestionIds.slice(0, page * LIMIT);
      }
    } else {
      return clientSideQuestionIds.slice(0, page * LIMIT);
    }
  }, [serverSideQuestionIds, clientSideQuestionIds, isStaticPage, page]);

  const isPrivate = useAppSelector((state) => {
    return (
      state.mockExam.serverSideQuestions?.[0]?.mockExam.isPrivate ||
      state.mockExam.questions?.[0]?.mockExam.isPrivate
    );
  });

  const examId = useAppSelector(
    (state) =>
      state.mockExam.serverSideQuestions?.[0]?.mockExam.id ||
      state.mockExam.questions?.[0]?.mockExam.id
  );

  const examAuthorId = useAppSelector(
    (state) =>
      state.mockExam.serverSideQuestions?.[0]?.user.id ||
      state.mockExam.questions?.[0]?.user.id
  );

  const { isLoading, loadingRef } = useInfinityScroll({
    loadMore: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setPage((prev) => prev + 1);
    },
    hasMore:
      questionIds.length > (page - 1) * LIMIT &&
      (clientSideQuestionIds.length > LIMIT ||
        serverSideQuestionIds.length > LIMIT),
    rootMargin: '500px',
  });

  useEffect(() => {
    (async () => {
      try {
        if (!isPrivate) return;
        if (!meQuery) {
          return;
        }
        const publicExamId = sessionStorage.get(PUBLIC_EXAM_ID);
        const publicCategoryId = sessionStorage.get(PUBLIC_CATEGORY_ID);

        if (publicExamId && Number(publicExamId) === examId) {
          setIsMyExam(() => true);
          return;
        }
        if (
          publicCategoryId &&
          categoryId &&
          Number(publicCategoryId) === Number(categoryId)
        ) {
          setIsMyExam(() => true);
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
                examId,
              },
            },
          });
          if (res.data?.checkIsAccessibleCategory.ok) {
            setIsMyExam(() => true);
            return;
          }
          message.error('잘못된 접근입니다.');
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
                examId,
              },
            },
          });
          if (res.data?.checkIsAccessibleCategory.ok) {
            setIsMyExam(() => true);
            return;
          }
          setIsMyExam(() => meQuery.me.user.id === examAuthorId);
          if (meQuery.me.user.id !== examAuthorId) {
            message.error('잘못된 접근입니다.');
            router.replace('/');
            return;
          }
        }
      } catch {
        message.error('잘못된 접근입니다.');
        router.replace('/');
      }
    })();
  }, [meQuery, examAuthorId, isPrivate, examId, categoryId]);

  return (
    <SolutionModeCardItemListBlock>
      {isPrivate && !isMyExam ? (
        <div className="flex flex-col gap-4">
          <Skeleton active />
          <Skeleton active />
        </div>
      ) : (
        questionIds.map((id, index) => (
          <SolutionModeCardItem
            key={id}
            isAnswerAllHidden={isAnswerAllHidden}
            index={index}
            isStaticPage={isStaticPage}
          />
        ))
      )}
      {isLoading && (
        <div className="flex flex-col gap-4">
          <Skeleton active />
          <Skeleton active />
        </div>
      )}
      <div className="h-2 w-2" ref={loadingRef} />
    </SolutionModeCardItemListBlock>
  );
};

export default SolutionModeCardItemList;
