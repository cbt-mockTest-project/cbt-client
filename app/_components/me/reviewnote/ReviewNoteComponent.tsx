import GoogleAd from '../../common/ad/GoogleAd';
import ExamSolutionList from '../../exam/solution/ExamSolutionList';
import { circleIcon, clearIcon, triangleIcon } from '../../../_lib/constants';
import { useLazyReadQuestionsByExamId } from '../../../_lib/graphql/hook/useExamQuestion';
import {
  useReadExamTitleAndIdByState,
  useResetAllQuestionState,
} from '../../../_lib/graphql/hook/useQuestionState';
import { ReadMockExamQuestionsByMockExamIdQuery } from '../../../_lib/graphql/query/questionQuery.generated';
import useToggle from '../../../_lib/hooks/useToggle';
import { responsive } from '../../../_lib/utils/responsive';
import { Button, Checkbox, App } from 'antd';
import Select, { DefaultOptionType } from 'antd/lib/select';
import { checkboxOption } from '../../../customTypes';
import { shuffle } from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { QuestionState } from '../../../types';
import ExamHistorySkeleton from '../examhistory/ExamHistorySkeleton';
import { handleError } from '../../../_lib/utils/utils';

interface ReviewNoteComponentProps {}

type Question =
  | ReadMockExamQuestionsByMockExamIdQuery['readMockExamQuestionsByMockExamId']['questions']
  | null;

export const states: checkboxOption[] = [
  { value: QuestionState.High, label: circleIcon },
  { value: QuestionState.Middle, label: triangleIcon },
  { value: QuestionState.Row, label: clearIcon },
];

const ReviewNoteComponent: React.FC<ReviewNoteComponentProps> = () => {
  const { message } = App.useApp();
  const { data: examTitleAndIdQuery, loading: loadingExamTitleAndId } =
    useReadExamTitleAndIdByState();
  const [checkedStates, setCheckedStates] = useState<QuestionState[]>([]);
  const [resetAllQuestionStates] = useResetAllQuestionState();
  const [
    readQuestions,
    { data: questionsQuery, loading: readQuestionsLoading },
  ] = useLazyReadQuestionsByExamId('cache-and-network');
  const [examTitleAndIdOptions, setExamTitleAndIdOptions] = useState<
    DefaultOptionType[]
  >([]);
  const [questions, setQuestions] = useState<Question>(null);
  const [currentExamId, setCurrentExamId] = useState<number>();
  const { value: isSolutionAllHide, onToggle: onToggleSolutionAllHide } =
    useToggle(false);

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

  const requestReadQuestions = async (examId: number) => {
    try {
      const input = examId === 0 ? { states: [] } : { id: examId, states: [] };
      await readQuestions({
        variables: { input },
      });
    } catch (e) {
      handleError(e);
    }
  };

  const onShuffleQuestion = () => {
    setQuestions(shuffle);
  };

  const onChangeExamTitle = (value: number) => {
    setCheckedStates([]);
    setCurrentExamId(value);
    requestReadQuestions(value);
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
  const onResetQuestionStates = async () => {
    const confrimed = confirm('성취도를 초기화 하시겠습니까?');
    if (confrimed) {
      const res = await resetAllQuestionStates();
      if (res.data?.restMyAllQuestionStates.ok) {
        message.success('성취도가 초기화 되었습니다.');
        setQuestions(null);
      }
    }
  };

  return (
    <ReviewNoteComponentContainer>
      <div className="review-note-google-display-ad-wrapper">
        <GoogleAd />
      </div>
      <div className="review-note-reset-button-wrapper">
        <Button type="primary" onClick={onResetQuestionStates}>
          성취도 초기화
        </Button>
      </div>
      <Select
        className="review-note-exam-title-select"
        options={examTitleAndIdOptions}
        onChange={onChangeExamTitle}
        value={currentExamId}
        loading={loadingExamTitleAndId}
        placeholder="시험을 선택해주세요"
      />
      {currentExamId !== undefined && (
        <>
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
        </>
      )}

      {readQuestionsLoading ? (
        <ExamHistorySkeleton />
      ) : (
        questions?.map((question, index) => (
          <div key={question.id}>
            <ExamSolutionList
              isSolutionAllHide={isSolutionAllHide}
              hasStateBox={true}
              question={question}
              title={
                questionsQuery?.readMockExamQuestionsByMockExamId.title || ''
              }
            />
            {(index === 0 || index === 2) && (
              <div className="bookmark-page-google-feed-ad-wrapper">
                <GoogleAd />
              </div>
            )}
          </div>
        ))
      )}
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
  .review-note-reset-button-wrapper {
    margin-bottom: 20px;
  }
  li {
    list-style: none;
  }
  @media (max-width: ${responsive.medium}) {
    padding-top: 20px;
  }
`;
