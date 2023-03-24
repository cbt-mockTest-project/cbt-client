import GoogleAd from '@components/common/ad/GoogleAd';
import SquareCheckboxGroup from '@components/common/checkbox/SquareCheckboxGroup';
import ExamSolutionList from '@components/exam/solution/ExamSolutionList';
import { circleIcon, clearIcon, triangleIcon } from '@lib/constants';
import { useLazyReadQuestionsByExamId } from '@lib/graphql/user/hook/useExamQuestion';
import { useReadExamTitleAndIdByState } from '@lib/graphql/user/hook/useQuestionState';
import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/user/query/questionQuery.generated';
import useToggle from '@lib/hooks/useToggle';
import { responsive } from '@lib/utils/responsive';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { Button, Checkbox } from 'antd';
import Select, { DefaultOptionType } from 'antd/lib/select';
import { checkboxOption } from 'customTypes';
import { shuffle } from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { QuestionState } from 'types';
import BookmarkedQuestionsComponentSkeleton from '../bookmark/BookmarkedQuestionsComponentSkeleton';

interface ReviewNoteComponentProps {}

type Question =
  | ReadMockExamQuestionsByMockExamIdQuery['readMockExamQuestionsByMockExamId']['questions']
  | null;

const states: checkboxOption[] = [
  { value: QuestionState.High, label: circleIcon },
  { value: QuestionState.Middle, label: triangleIcon },
  { value: QuestionState.Row, label: clearIcon },
];

const ReviewNoteComponent: React.FC<ReviewNoteComponentProps> = () => {
  const { data: examTitleAndIdQuery } = useReadExamTitleAndIdByState();
  const [checkedStates, setCheckedStates] = useState<QuestionState[]>([]);
  const [
    readQuestions,
    {
      data: questionsQuery,
      refetch: refetchReadQuestions,
      loading: readQuestionsLoading,
    },
  ] = useLazyReadQuestionsByExamId('cache-and-network');
  const [examTitleAndIdOptions, setExamTitleAndIdOptions] = useState<
    DefaultOptionType[]
  >([]);
  const [questions, setQuestions] = useState<Question>(null);
  const [currentExamId, setCurrentExamId] = useState<number>(0);
  const { value: isSolutionAllHide, onToggle: onToggleSolutionAllHide } =
    useToggle(false);
  useEffect(() => {
    readQuestions({
      variables: {
        input: {
          states: [],
        },
      },
    });
  }, []);
  useEffect(() => {
    if (examTitleAndIdQuery?.readExamTitleAndIdByQuestionState.ok) {
      const titleAndId =
        examTitleAndIdQuery.readExamTitleAndIdByQuestionState.titleAndId;
      if (titleAndId) {
        const options: DefaultOptionType[] = titleAndId.map((el) => ({
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

  const requsetReadQuestions = async (examId: number) => {
    const input = examId === 0 ? { states: [] } : { id: examId, states: [] };
    await readQuestions({
      variables: { input },
    });
  };
  const tryReadQuestions = (examId: number) =>
    convertWithErrorHandlingFunc({
      callback: () => requsetReadQuestions(examId),
    });
  const onShuffleQuestion = () => {
    setQuestions(shuffle);
  };
  if (questions === null || readQuestionsLoading) {
    return <BookmarkedQuestionsComponentSkeleton />;
  }

  const onChangeExamTitle = (value: number) => {
    setCheckedStates([]);
    setCurrentExamId(value);
    tryReadQuestions(value)();
  };

  const onClickAllCheckbox = () => {
    if (checkedStates.length === 0) return;
    setCheckedStates([]);
    setCurrentExamId(0);
    readQuestions({
      variables: {
        input: {
          states: [],
        },
      },
    });
  };

  return (
    <ReviewNoteComponentContainer>
      <div className="review-note-google-display-ad-wrapper">
        <GoogleAd type="display" />
      </div>
      <Select
        className="review-note-exam-title-select"
        options={examTitleAndIdOptions}
        defaultValue={examTitleAndIdOptions[0].value as number}
        onChange={onChangeExamTitle}
      />
      <div>
        <Checkbox
          onClick={onClickAllCheckbox}
          checked={checkedStates.length === 0}
        >
          전체
        </Checkbox>
        <Checkbox.Group
          className="review-note-checkbox-group"
          options={states}
          value={checkedStates}
          onChange={(values) => {
            setCheckedStates(values as QuestionState[]);
            const input =
              currentExamId === 0
                ? { states: values as QuestionState[] }
                : { id: currentExamId, states: values as QuestionState[] };
            readQuestions({
              variables: {
                input,
              },
            });
          }}
        />
      </div>
      <div className="review-note-top-button-wrapper">
        <Button onClick={onToggleSolutionAllHide} type="primary">
          {isSolutionAllHide ? '정답 모두 보이기' : '정답 모두 가리기'}
        </Button>
        <Button onClick={onShuffleQuestion} type="primary">
          섞기
        </Button>
      </div>

      {questions.map((question, index) => (
        <div key={question.id}>
          <ExamSolutionList
            refetch={refetchReadQuestions}
            isSolutionAllHide={isSolutionAllHide}
            hasStateBox={true}
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
      ))}
    </ReviewNoteComponentContainer>
  );
};

export default ReviewNoteComponent;

const ReviewNoteComponentContainer = styled.div`
  margin-bottom: 20px;
  padding: 0 15px;
  .review-note-top-button-wrapper {
    margin-top: 20px;
    display: flex;
    gap: 10px;
  }
  .review-note-google-display-ad-wrapper {
    margin-bottom: 20px;
  }
  .review-note-exam-title-select {
    max-width: 500px;
    width: 100%;
  }
  .review-note-checkbox-group {
    margin-top: 20px;
    .circle-icon {
      position: relative;
      top: 1px;
      height: 15px;
    }
    .triangle-icon {
      height: 15px;
    }
    .clear-icon {
      position: relative;
      top: 4px;
      right: 3px;
      height: 20px;
      width: 20px;
    }
  }
  li {
    list-style: none;
  }
  @media (max-width: ${responsive.medium}) {
    padding-top: 20px;
  }
`;
