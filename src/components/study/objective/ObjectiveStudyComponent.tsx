import useQuestions from '@lib/hooks/useQuestions';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  QuestionState,
  ReadBookmarkedQuestionsInput,
  ReadQuestionsByExamIdsInput,
} from 'types';
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
import { Button, Divider, Empty, Pagination, Spin } from 'antd';
import StudyPaymentGuard from '../StudyPaymentGuard';
import ObjectiveStudyTestMode from './testMode/ObjectiveStudyTestMode';
import ObjectiveStudyAutoMode from './autoMode/ObjectiveStudyAutoMode';
import Clear from '@mui/icons-material/Clear';
import { ObjectiveExamMode } from 'customTypes';
import ObjectiveStudyTestModeFooterPc from './testMode/ObjectiveStudyTestModeFooterPc';
import ObjectiveStudyResult from './result/ObjectiveStudyResult';
import useIsMobile from '@lib/hooks/useIsMobile';
import ObjectiveStudyTestModeFooterMobile from './testMode/ObjectiveStudyTestModeFooterMobile';
import { responsive } from '@lib/utils/responsive';

const ObjectiveStudyComponentBlock = styled.div`
  height: 100vh;
  color: ${({ theme }) => theme.color('colorText')};

  .objective-study-component-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 10px 20px;
    position: relative;
    max-width: 1440px;
    margin: 0 auto;
    .objective-study-header-wrapper {
      height: 50px;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      svg {
        font-size: 30px;
      }

      .objective-study-header-title-wrapper {
        display: flex;
        align-items: center;

        .objective-study-header-title-divider {
          height: 30px;
          border-color: ${({ theme }) => theme.color('colorBorder')};
          @media (max-width: ${responsive.medium}) {
            display: none;
          }
        }

        .objective-study-header-title-mode {
          color: ${({ theme }) => theme.color('colorTextTertiary')};
          @media (max-width: ${responsive.medium}) {
            display: none;
          }
        }

        .objective-study-header-title {
          font-size: 18px;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
`;

interface ObjectiveStudyComponentProps {}

const ObjectiveStudyComponent: React.FC<ObjectiveStudyComponentProps> = () => {
  const sessionStorage = new SessionStorage();
  const isMobile = useIsMobile();
  const examTitle = useAppSelector(
    (state) => state.mockExam.questions?.[0]?.mockExam.title
  );
  const isPrivate = useAppSelector(
    (state) => state.mockExam.questions?.[0]?.mockExam.isPrivate
  );
  const isEmptyQuestions = useAppSelector(
    (state) => state.mockExam.questions?.length === 0
  );
  const firstQuestionExamId = useAppSelector(
    (state) => state.mockExam.questions?.[0]?.mockExam.id
  );
  const examAuthorId = useAppSelector(
    (state) => state.mockExam.questions?.[0]?.user.id
  );

  const { data: meQuery } = useMeQuery();
  const [isFetchedQuestions, setIsFetchedQuestions] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const { fetchQuestions, fetchBookmarkedQuestions, resetQuestions } =
    useQuestions();

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
    highlighted,
    feedbacked,
    step,
  } = router.query;

  useEffect(() => {
    setIsVerifying(true);
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
      if (highlighted && highlighted === 'true') input.highlighted = true;
      if (feedbacked && feedbacked === 'true') input.feedbacked = true;
      if (states && typeof states === 'string')
        input.states = states.split(',') as QuestionState[];

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
          setIsVerifying(() => false);
          return;
        }
        if (!meQuery) {
          return;
        }
        const publicExamId = sessionStorage.get(PUBLIC_EXAM_ID);
        const publicCategoryId = sessionStorage.get(PUBLIC_CATEGORY_ID);

        if (publicExamId && Number(publicExamId) === firstQuestionExamId) {
          setIsVerifying(() => false);
          return;
        }
        if (
          publicCategoryId &&
          categoryId &&
          Number(publicCategoryId) === Number(categoryId)
        ) {
          setIsVerifying(() => false);
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
            setIsVerifying(() => false);
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
            setIsVerifying(() => false);
            return;
          }
          setIsVerifying(() => meQuery.me.user.id !== examAuthorId);
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
  if (isFetchedQuestions && isEmptyQuestions)
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <Empty description="문제가 없습니다." />
        <Button type="primary" size="large" onClick={() => router.back()}>
          뒤로가기
        </Button>
      </div>
    );
  if (isVerifying)
    return (
      <Portal>
        <Spin size="large" fullscreen />
      </Portal>
    );

  return (
    <ObjectiveStudyComponentBlock>
      <div className="objective-study-component-wrapper">
        <div className="objective-study-header-wrapper">
          <Button type="text" onClick={() => router.back()}>
            <Clear />
          </Button>
          <div className="objective-study-header-title-wrapper">
            <div className="objective-study-header-title">{examTitle}</div>
            <Divider
              type="vertical"
              className="objective-study-header-title-divider"
            />
            <span className="objective-study-header-title-mode">
              {step === 'end' ? (
                '결과'
              ) : (
                <>
                  {mode === ObjectiveExamMode.TEST && '시험모드'}
                  {mode === ObjectiveExamMode.AUTO && '자동모드'}
                </>
              )}
            </span>
          </div>
        </div>
        {step === 'end' ? (
          <ObjectiveStudyResult />
        ) : (
          <>
            {mode === ObjectiveExamMode.TEST && <ObjectiveStudyTestMode />}
            {mode === ObjectiveExamMode.AUTO && <ObjectiveStudyAutoMode />}
          </>
        )}
        <StudyPaymentGuard
          {...(examId ? { examId: String(examId) } : {})}
          {...(examIds ? { examIds: String(examIds) } : {})}
        />
        {step !== 'end' &&
          (isMobile ? (
            <ObjectiveStudyTestModeFooterMobile />
          ) : (
            <ObjectiveStudyTestModeFooterPc />
          ))}
      </div>
    </ObjectiveStudyComponentBlock>
  );
};

export default ObjectiveStudyComponent;
