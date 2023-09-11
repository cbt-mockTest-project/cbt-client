import GoogleAd from '@components/common/ad/GoogleAd';
import { RoundCheckboxGroupOnChangeValueType } from '@components/common/checkbox/RoundCheckboxGroup';
import ExamSolutionList from '@components/exam/solution/ExamSolutionList';
import { useLazyReadQuestionsByExamId } from '@lib/graphql/user/hook/useExamQuestion';
import {
  useReadExamTitleAndIdOfBookmarkedQuestion,
  useResetMyQuestionBookmark,
} from '@lib/graphql/user/hook/useQuestionBookmark';
import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { responsive } from '@lib/utils/responsive';
import { Button, Select, message } from 'antd';
import { checkboxOption } from 'customTypes';
import { shuffle } from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ExamHistorySkeleton from '../examhistory/ExamHistorySkeleton';

interface BookmarkedQuestionsComponentProps {}

const BookmarkedQuestionsComponent: React.FC<
  BookmarkedQuestionsComponentProps
> = () => {
  const { data: examTitleAndIdQuery, loading: loadingReadTitleAndId } =
    useReadExamTitleAndIdOfBookmarkedQuestion();
  const [resetBookmark] = useResetMyQuestionBookmark();
  const [
    readQuestions,
    { data: questionsQuery, loading: loadingReadQuestions },
  ] = useLazyReadQuestionsByExamId('cache-and-network');
  const [examTitleAndIdOptions, setExamTitleAndIdOptions] = useState<
    checkboxOption[]
  >([]);
  const [questions, setQuestions] = useState<
    | ReadMockExamQuestionsByMockExamIdQuery['readMockExamQuestionsByMockExamId']['questions']
    | null
  >(null);

  const [isSolutionAllHide, setIsSolutionAllHide] = useState(false);
  useEffect(() => {
    if (examTitleAndIdQuery?.readExamTitleAndIdOfBookmarkedQuestion.ok) {
      const titleAndId =
        examTitleAndIdQuery.readExamTitleAndIdOfBookmarkedQuestion.titleAndId;
      if (titleAndId) {
        const options: checkboxOption[] = titleAndId.map((el) => ({
          value: Number(el.id),
          label: String(el.title),
        }));
        setExamTitleAndIdOptions([{ value: 0, label: '전체' }, ...options]);
      }
    }
  }, [examTitleAndIdQuery]);

  useEffect(() => {
    if (questionsQuery) {
      setQuestions(questionsQuery.readMockExamQuestionsByMockExamId.questions);
    }
  }, [questionsQuery]);

  const requsetReadBookmarkedQuestions = async (
    examId: RoundCheckboxGroupOnChangeValueType
  ) => {
    await readQuestions({
      variables: { input: { id: Number(examId), bookmarked: true } },
    });
  };
  const onToggleSolutionAllHide = () =>
    setIsSolutionAllHide(!isSolutionAllHide);

  const onShuffleQuestion = () => {
    setQuestions(shuffle);
  };
  const onResetBookmark = async () => {
    const confrimed = confirm('저장을 초기화 하시겠습니까?');
    if (confrimed) {
      const res = await resetBookmark();
      if (res.data?.resetMyQuestionBookmark.ok) {
        message.success('저장이 초기화 되었습니다.');
        setQuestions(null);
      }
    }
  };

  return (
    <BookmarkedQuestionsComponentBlock>
      <div className="bookmark-question-google-display-ad-wrapper">
        <GoogleAd type="display" />
      </div>

      <div className="bookmark-reset-button-wrapper">
        <Button type="primary" onClick={onResetBookmark}>
          저장 초기화
        </Button>
      </div>
      <Select
        className="bookmark-question-exam-title-select"
        options={examTitleAndIdOptions}
        placeholder="시험을 선택해주세요"
        onChange={requsetReadBookmarkedQuestions}
        loading={loadingReadTitleAndId}
      />
      <div>
        {questions && questions.length >= 1 && (
          <div className="bookmark-page-top-button-wrapper">
            <Button
              onClick={onToggleSolutionAllHide}
              className="bookmark-question-solution-all-hide-button"
              type="primary"
            >
              {isSolutionAllHide ? '정답 모두 보이기' : '정답 모두 가리기'}
            </Button>
            <Button
              onClick={onShuffleQuestion}
              className="bookmark-question-solution-all-hide-button"
              type="primary"
            >
              섞기
            </Button>
          </div>
        )}
      </div>
      {loadingReadQuestions ? (
        <ExamHistorySkeleton />
      ) : (
        questions?.map((question, index) => (
          <div key={question.id}>
            <ExamSolutionList
              isSolutionAllHide={isSolutionAllHide}
              question={question}
              title={
                questionsQuery?.readMockExamQuestionsByMockExamId.title || ''
              }
            />
            {(index === 0 || index === 2) && (
              <div className="bookmark-page-google-feed-ad-wrapper">
                <GoogleAd type="feed" />
              </div>
            )}
          </div>
        ))
      )}
    </BookmarkedQuestionsComponentBlock>
  );
};

export default BookmarkedQuestionsComponent;
const BookmarkedQuestionsComponentBlock = styled.div`
  margin-bottom: 20px;
  padding: 0 15px;
  .bookmark-page-top-button-wrapper {
    display: flex;
    gap: 10px;
  }
  .bookmark-question-exam-title-select {
    max-width: 500px;
    width: 100%;
  }
  .bookmark-question-solution-all-hide-button {
    margin-top: 20px;
    margin-bottom: -10px;
  }
  .bookmark-question-google-display-ad-wrapper {
    margin-bottom: 20px;
  }
  .bookmark-page-google-feed-ad-wrapper {
    margin-top: 20px;
  }
  .bookmark-reset-button-wrapper {
    margin-bottom: 20px;
  }
  li {
    list-style: none;
  }
  @media (max-width: ${responsive.medium}) {
    padding-top: 20px;
  }
`;
