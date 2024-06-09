import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import SolutionModeCardItem from './SolutionModeCardItem';
import { useAppSelector } from '@modules/redux/store/configureStore';
import useInfinityScroll from '@lib/hooks/useInfinityScroll';
import { Skeleton } from 'antd';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data: meQuery } = useMeQuery();
  const [isMyExam, setIsMyExam] = useState(false);
  const serverSideQuestionIds = useAppSelector((state) =>
    state.mockExam.serverSideQuestions?.length
      ? state.mockExam.serverSideQuestions.map((question) => question.id)
      : []
  );
  const clientSideQuestionIds = useAppSelector((state) =>
    state.mockExam.questions?.length
      ? state.mockExam.questions.map((question) => question.id)
      : []
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

  const isPrivate = useAppSelector(
    (state) =>
      state.mockExam.serverSideQuestions?.[0]?.mockExam.isPrivate ||
      state.mockExam.questions?.[0]?.mockExam.isPrivate
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
    if (!isPrivate) return;
    if (!meQuery) {
      return;
    }
    if (!meQuery.me.user) {
      router.replace('/');
      return;
    }
    if (meQuery?.me?.user?.id && examAuthorId) {
      setIsMyExam(() => meQuery.me.user.id === examAuthorId);
      if (meQuery.me.user.id !== examAuthorId) {
        router.push('/');
        return;
      }
    }
  }, [meQuery, examAuthorId, isPrivate]);

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
