import FullPageLoader from '@components/common/loader/FullPageLoader';
import SolutionModeCardItem from '@components/solutionMode/SolutionModeCardItem';
import useBookmarkedQuestions from '@lib/hooks/useBookmarkedQuestions';
import useQuestions from '@lib/hooks/useQuestions';
import palette from '@styles/palette';
import { Button, Empty, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';
import styled from 'styled-components';
import HistoryLoader from './HistoryLoader';
import { useRouter } from 'next/router';

const BookmarkTabBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .bookmark-tab-exam-title-select {
    max-width: 400px;
  }
  .bookmark-tab-question-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .bookmark-tab-reset-button {
    width: fit-content;
  }
`;

interface BookmarkTabProps {}

const BookmarkTab: React.FC<BookmarkTabProps> = () => {
  const router = useRouter();
  const { examTitles, getExamTitlesLoading, resetQuestionBookmarks } =
    useBookmarkedQuestions();
  const [fetchQuestionsLoading, setFetchQuestionsLoading] = useState(false);
  const { questions, fetchQuestions } = useQuestions();

  return (
    <BookmarkTabBlock>
      <Button
        className="bookmark-tab-reset-button"
        type="primary"
        onClick={resetQuestionBookmarks}
      >
        저장 초기화
      </Button>
      <Select
        key={(router.query.tab as string) || 'bookmark'}
        className="bookmark-tab-exam-title-select"
        options={examTitles}
        placeholder="시험을 선택해주세요"
        onChange={async (value) => {
          setFetchQuestionsLoading(true);
          await fetchQuestions(
            {
              ids: value > 0 ? [Number(value)] : [],
              bookmarked: true,
            },
            'no-cache'
          );
          setFetchQuestionsLoading(false);
        }}
        loading={getExamTitlesLoading}
      />
      <ul className="bookmark-tab-question-list">
        {!fetchQuestionsLoading &&
          questions.map((question, index) => (
            <SolutionModeCardItem
              key={question.id}
              defaultQuestion={question}
              index={index}
              isAnswerAllHidden={false}
            />
          ))}
        {!fetchQuestionsLoading && questions.length === 0 && (
          <Empty description="북마크한 문제가 없습니다." />
        )}
        {fetchQuestionsLoading && <HistoryLoader />}
      </ul>
    </BookmarkTabBlock>
  );
};

export default BookmarkTab;
