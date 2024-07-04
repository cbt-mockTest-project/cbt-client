import SolutionModeCardItem from '@components/solutionMode/SolutionModeCardItem';
import useQuestions from '@lib/hooks/useQuestions';
import palette from '@styles/palette';
import { Button, Empty, Skeleton } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import ExamBookmarkStudyModal from './ExamBookmarkStudyModal';

const ExamBookmarkComponentBlock = styled.div`
  padding: 20px;
  .exam-review-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
    color: ${({ theme }) => theme.color('colorTextSecondary')};
  }
  .exam-review-question-list {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
`;

interface ExamBookmarkComponentProps {}

const ExamBookmarkComponent: React.FC<ExamBookmarkComponentProps> = () => {
  const router = useRouter();
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
  const examIds = router.query.examIds as string;
  const categoryName = router.query.categoryName as string;
  const [fetchQuestionsLoading, setFetchQuestionsLoading] = useState(false);
  const { fetchQuestions, resetQuestions } = useQuestions();
  const { data: meQuery } = useMeQuery();
  const questions = useAppSelector((state) => state.mockExam.questions);

  useEffect(() => {
    resetQuestions();
  }, []);

  useEffect(() => {
    if (!meQuery?.me.user || !examIds) return;

    setFetchQuestionsLoading(true);
    fetchQuestions({
      ids: examIds.split(',').map((id) => +id),
      bookmarked: true,
    }).finally(() => {
      setFetchQuestionsLoading(false);
    });
  }, [examIds, meQuery?.me.user]);

  if (!categoryName) return null;

  return (
    <ExamBookmarkComponentBlock>
      <div className="exam-review-title">{`"${categoryName}" 북마크`}</div>
      <Button className="mb-4" onClick={() => setIsStudyModalOpen(true)}>
        풀이모드 전환
      </Button>
      <div className="exam-review-question-list">
        {!fetchQuestionsLoading &&
          questions.map((question, index) => (
            <SolutionModeCardItem
              key={question.id}
              index={index}
              isAnswerAllHidden={false}
            />
          ))}
        {!fetchQuestionsLoading && questions.length === 0 && (
          <Empty description="문제가 없습니다." />
        )}
        {fetchQuestionsLoading && (
          <>
            <Skeleton active />
            <Skeleton active />
          </>
        )}
      </div>
      {isStudyModalOpen && (
        <ExamBookmarkStudyModal
          open={isStudyModalOpen}
          onCancel={() => setIsStudyModalOpen(false)}
        />
      )}
    </ExamBookmarkComponentBlock>
  );
};

export default ExamBookmarkComponent;
