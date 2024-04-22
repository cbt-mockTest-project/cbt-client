import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import SolutionModeCardItem from './SolutionModeCardItem';
import { useAppSelector } from '@modules/redux/store/configureStore';
import useInfinityScroll from '@lib/hooks/useInfinityScroll';
import { Skeleton } from 'antd';

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
  const [page, setPage] = useState(1);

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
  const { isLoading, loadingRef } = useInfinityScroll({
    loadMore: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setPage((prev) => prev + 1);
    },
    hasMore: questionIds.length > (page - 1) * LIMIT,
    rootMargin: '500px',
  });
  return (
    <SolutionModeCardItemListBlock>
      {questionIds.map((id, index) => (
        <SolutionModeCardItem
          key={id}
          isAnswerAllHidden={isAnswerAllHidden}
          index={index}
          isStaticPage={isStaticPage}
        />
      ))}
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
