import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { App, Spin } from 'antd';
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
import { shallowEqual } from 'react-redux';
import SolutionModeCardItemListPiece from './SolutionModeCardItemListPiece';
import Portal from '@components/common/portal/Portal';

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
  const { data: meQuery } = useMeQuery();
  const [isMyExam, setIsMyExam] = useState(false);
  const serverSideQuestionIds = useAppSelector(
    (state) =>
      state.mockExam.serverSideQuestions?.length
        ? state.mockExam.serverSideQuestions.map((question) => question.id)
        : [],
    shallowEqual
  );
  const clientSideQuestionIds = useAppSelector(
    (state) =>
      state.mockExam.questions?.length
        ? state.mockExam.questions.map((question) => question.id)
        : [],
    shallowEqual
  );
  const questionIds = useMemo(() => {
    if (isStaticPage) {
      if (clientSideQuestionIds.length > 0) {
        return clientSideQuestionIds;
      }
      if (serverSideQuestionIds.length > 0) {
        return serverSideQuestionIds;
      }
    } else {
      return clientSideQuestionIds;
    }
  }, [serverSideQuestionIds, clientSideQuestionIds, isStaticPage]);

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
        <Portal>
          <Spin size="large" fullscreen />
        </Portal>
      ) : (
        Array.from({ length: questionIds.length / LIMIT + 1 }).map(
          (_, index) => (
            <SolutionModeCardItemListPiece
              key={index}
              page={index}
              questionIds={questionIds}
              isAnswerAllHidden={isAnswerAllHidden}
              isStaticPage={isStaticPage}
              limit={LIMIT}
            />
          )
        )
      )}
    </SolutionModeCardItemListBlock>
  );
};

export default SolutionModeCardItemList;
