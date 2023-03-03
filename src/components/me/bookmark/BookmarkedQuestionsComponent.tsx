import { RoundCheckboxGroupOnChangeValueType } from '@components/common/checkbox/RoundCheckboxGroup';
import { useReadExamTitleAndIdOfBookmarkedQuestion } from '@lib/graphql/user/hook/useQuestionBookmark';
import { useLazyReadQuestionsByExamId } from '@lib/graphql/user/hook/useExamQuestion';
import { checkboxOption } from 'customTypes';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ExamSolutionList from '@components/exam/solution/ExamSolutionList';
import { Button, Select } from 'antd';
import { responsive } from '@lib/utils/responsive';
import SkeletonBox from '@components/common/skeleton/SkeletonBox';
import ExamSolutionListSkeleton from '@components/exam/solution/ExamSolutionListSkeleton';

interface BookmarkedQuestionsComponentProps {}

const BookmarkedQuestionsComponent: React.FC<
  BookmarkedQuestionsComponentProps
> = () => {
  const { data: examTitleAndIdQuery } =
    useReadExamTitleAndIdOfBookmarkedQuestion();
  const [
    readQuestions,
    { data: questionsQuery, loading: questionsQueryLoading },
  ] = useLazyReadQuestionsByExamId('cache-and-network');

  const [examTitleAndIdOptions, setExamTitleAndIdOptions] = useState<
    checkboxOption[]
  >([]);

  useEffect(() => {
    readQuestions({
      variables: {
        input: {
          id: 0,
          bookmarked: true,
        },
      },
    });
  }, []);
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

  const requsetReadBookmarkedQuestions = async (
    examId: RoundCheckboxGroupOnChangeValueType
  ) => {
    const res = await readQuestions({
      variables: { input: { id: Number(examId), bookmarked: true } },
    });
    if (res.data?.readMockExamQuestionsByMockExamId.ok) {
    }
  };
  const onToggleSolutionAllHide = () =>
    setIsSolutionAllHide(!isSolutionAllHide);

  return (
    <BookmarkedQuestionsComponentBlock>
      {examTitleAndIdOptions && examTitleAndIdOptions.length >= 1 ? (
        <Select
          className="bookmark-question-exam-title-select"
          options={examTitleAndIdOptions}
          defaultValue={examTitleAndIdOptions[0].value}
          onChange={requsetReadBookmarkedQuestions}
        />
      ) : (
        <SkeletonBox width="300px" height="30px" />
      )}
      <div>
        {questionsQueryLoading ? (
          <SkeletonBox
            className="bookmark-question-solution-all-hide-button"
            width="130px"
            height="32px"
          />
        ) : (
          questionsQuery?.readMockExamQuestionsByMockExamId.questions &&
          questionsQuery?.readMockExamQuestionsByMockExamId.questions.length >=
            1 && (
            <Button
              onClick={onToggleSolutionAllHide}
              className="bookmark-question-solution-all-hide-button"
              type="primary"
            >
              {isSolutionAllHide ? '정답 모두 보이기' : '정답 모두 가리기'}
            </Button>
          )
        )}
      </div>
      {!questionsQueryLoading
        ? questionsQuery?.readMockExamQuestionsByMockExamId.questions.map(
            (question) => (
              <ExamSolutionList
                isSolutionAllHide={isSolutionAllHide}
                key={question.id}
                question={question}
                title={questionsQuery?.readMockExamQuestionsByMockExamId.title}
              />
            )
          )
        : [1, 2, 3, 4, 5].map((el) => <ExamSolutionListSkeleton key={el} />)}
    </BookmarkedQuestionsComponentBlock>
  );
};

export default BookmarkedQuestionsComponent;
const BookmarkedQuestionsComponentBlock = styled.div`
  .bookmark-question-exam-title-select {
    width: 300px;
  }
  .bookmark-question-solution-all-hide-button {
    margin-top: 20px;
    margin-bottom: -10px;
  }
  margin-bottom: 20px;
  padding: 0 15px;
  li {
    list-style: none;
  }
  @media (max-width: ${responsive.medium}) {
    padding-top: 20px;
  }
`;
