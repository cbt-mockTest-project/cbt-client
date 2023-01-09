import { RoundCheckboxGroupOnChangeValueType } from '@components/common/checkbox/RoundCheckboxGroup';
import { useReadExamTitleAndIdOfBookmarkedQuestion } from '@lib/graphql/user/hook/useQuestionBookmark';
import { useLazyReadQuestionsByExamId } from '@lib/graphql/user/hook/useExamQuestion';
import { checkboxOption } from 'customTypes';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RoundCheckboxGroupBlurTemplete from '../common/RoundBoxGroupBlurTemplete';
import ExamSolutionList from '@components/exam/solution/ExamSolutionList';

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

  return (
    <BookmarkedQuestionsComponentBlock>
      <RoundCheckboxGroupBlurTemplete
        onChange={requsetReadBookmarkedQuestions}
        options={examTitleAndIdOptions}
        type="selectbox"
      />
      {questionsQuery?.readMockExamQuestionsByMockExamId.questions.map(
        (question) => (
          <ExamSolutionList
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
  padding: 0 15px;
  li {
    list-style: none;
  }
`;
