import { RoundCheckboxGroupOnChangeValueType } from '@components/common/checkbox/RoundCheckboxGroup';
import { useReadExamTitleAndIdOfBookmarkedQuestion } from '@lib/graphql/user/hook/useQuestionBookmark';
import { useLazyReadQuestionsByExamId } from '@lib/graphql/user/hook/useExamQuestion';
import { checkboxOption } from 'customTypes';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RoundCheckboxGroupBlurTemplete from '../common/RoundBoxGroupBlurTemplete';
import ExamSolutionList from '@components/exam/solution/ExamSolutionList';
import { Button } from 'antd';

interface BookmarkedQuestionsComponentProps {}

const BookmarkedQuestionsComponent: React.FC<
  BookmarkedQuestionsComponentProps
> = () => {
  const { data: examTitleAndIdQuery } =
    useReadExamTitleAndIdOfBookmarkedQuestion();
  const [readQuestions, { data: questionsQuery }] =
    useLazyReadQuestionsByExamId('cache-and-network');
  const [examTitleAndIdOptions, setExamTitleAndIdOptions] = useState<
    checkboxOption[]
  >([]);
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
        setExamTitleAndIdOptions(options);
      }
    }
  }, [examTitleAndIdQuery]);

  const requsetReadBookmarkedQuestions = async (
    examId: RoundCheckboxGroupOnChangeValueType
  ) => {
    if (!examId) return;
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
      <RoundCheckboxGroupBlurTemplete
        onChange={requsetReadBookmarkedQuestions}
        options={examTitleAndIdOptions}
        type="selectbox"
      />
      {questionsQuery?.readMockExamQuestionsByMockExamId.questions &&
        questionsQuery?.readMockExamQuestionsByMockExamId.questions.length >=
          1 && (
          <Button
            onClick={onToggleSolutionAllHide}
            className="bookmark-question-solution-all-hide-button"
            type="primary"
          >
            {isSolutionAllHide ? '정답 모두 보이기' : '정답 모두 가리기'}
          </Button>
        )}
      {questionsQuery?.readMockExamQuestionsByMockExamId.questions.map(
        (question) => (
          <ExamSolutionList
            isSolutionAllHide={isSolutionAllHide}
            key={question.id}
            question={question}
            title={questionsQuery?.readMockExamQuestionsByMockExamId.title}
          />
        )
      )}
    </BookmarkedQuestionsComponentBlock>
  );
};

export default BookmarkedQuestionsComponent;
const BookmarkedQuestionsComponentBlock = styled.div`
  .bookmark-question-solution-all-hide-button {
    margin-top: 20px;
    margin-bottom: -10px;
  }
  margin-bottom: 20px;
  padding: 0 15px;
  li {
    list-style: none;
  }
`;
