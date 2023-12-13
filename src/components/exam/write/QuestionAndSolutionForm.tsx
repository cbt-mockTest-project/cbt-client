import Label from '@components/common/label/Label';
import ErrorText from '@components/common/layout/errorText/ErrorText';
import palette from '@styles/palette';
import { Button, Input, UploadFile } from 'antd';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { ExamStatus, QuestionNumber, UserRole } from 'types';
import ImageDragger from './ImageDragger';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import QuestionNumberItem from './QuestionNumberItem';
import CreateQuestionEditor from './CreateQuestionEditor';

interface QuestionAndSolutionFormProps {
  questionNumbers: QuestionNumber[];
  setQuestionNumbers: React.Dispatch<React.SetStateAction<QuestionNumber[]>>;
  selectedQuestionNumber: number;
  questionImage: UploadFile<any>[];
  setQuestionImage: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  solutionImage: UploadFile<any>[];
  setSolutionImage: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  examStatus: ExamStatus;
  setExamStatus: React.Dispatch<React.SetStateAction<ExamStatus>>;
  examId: number;
  createQuestionLoading: boolean;
  onToggleExamPreviewModal: () => void;
}

const QuestionAndSolutionForm: React.FC<QuestionAndSolutionFormProps> = ({
  questionNumbers,
  selectedQuestionNumber,
  questionImage,
  setQuestionImage,
  solutionImage,
  setSolutionImage,
  onToggleExamPreviewModal,
  setQuestionNumbers,
  createQuestionLoading,

  examId,
}) => {
  const { control, formState, getValues, watch, setValue } = useFormContext();
  const { data: meQuery } = useMeQuery();
  return (
    <QuestionAndSolutionFormContainer>
      <Label content={'2.본격작업 - 문제 등록하기'} />
      <div className="create-exam-question-part-wrapper">
        <label className="create-exam-small-label">
          2.1 문제번호 - 앞에서부터 자동등록, 임의등록 불가
        </label>
        <div className="create-exam-input-error-wrapper">
          <Input type="number" value={selectedQuestionNumber} readOnly />
          {formState.errors.number?.type === 'required' && (
            <ErrorText
              content="문제번호를 입력해주세요."
              className="create-exam-question-error-text"
            />
          )}
        </div>
      </div>
      <div className="create-exam-question-part-wrapper">
        <label className="create-exam-small-label">
          2.2 현재 등록된 문제번호 - 번호 클릭시 수정 및 삭제 가능
        </label>
        {questionNumbers.length >= 1 ? (
          <ul className="create-exam-question-number-wrapper">
            {questionNumbers.map((questionNumber) => (
              <QuestionNumberItem
                key={questionNumber.questionId}
                id={questionNumber.questionId}
                number={questionNumber.questionNumber}
                setNumbers={setQuestionNumbers}
              />
            ))}
          </ul>
        ) : (
          <p className="create-exam-small-description">
            등록된 문제가 없습니다.
          </p>
        )}
      </div>
      <div className="create-exam-question-part-wrapper">
        <label className="create-exam-small-label">
          2.3 문제,해설 내용 입력하기
        </label>
        {meQuery?.me.user?.role === UserRole.Admin && (
          <Controller
            name="label"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input
                placeholder="라벨을 입력해주세요."
                onChange={field.onChange}
                value={getValues('label')}
              />
            )}
          />
        )}
        <div className="create-exam-question-and-solution-area-wrapper">
          <div className="create-exam-question-area">
            <CreateQuestionEditor
              placeholder="문제를 입력해주세요."
              content={watch('question') || ''}
              setContent={(value) => {
                setValue('question', value);
              }}
            />
            {formState.errors.question?.type === 'required' && (
              <ErrorText
                content="문제를 입력해주세요."
                className="create-exam-question-error-text"
              />
            )}
            <ImageDragger
              text="문제와 관련된 사진을 등록해주세요."
              hint={`사진은 한개만 등록 가능합니다.\n사진이 없을 경우 빈칸으로 두세요.`}
              images={questionImage}
              setImages={setQuestionImage}
            />
          </div>
          <div className="create-exam-question-area">
            <CreateQuestionEditor
              placeholder="해설을 입력해주세요."
              content={watch('solution') || ''}
              setContent={(value) => {
                setValue('solution', value);
              }}
            />
            {formState.errors.solution?.type === 'required' && (
              <ErrorText
                content="해설을 입력해주세요."
                className="create-exam-question-error-text"
              />
            )}
            <ImageDragger
              images={solutionImage}
              setImages={setSolutionImage}
              text="해설과 관련된 사진을 등록해주세요."
              hint={`사진은 한개만 등록 가능합니다.\n사진이 없을 경우 빈칸으로 두세요.`}
            />
          </div>
        </div>

        <div className="create-exam-submit-button-wrapper">
          <Button
            type="primary"
            className="create-exam-question-submit-button"
            htmlType="submit"
            loading={createQuestionLoading}
          >
            문제 등록하기
          </Button>
          <div className="create-exam-preview-button-wrapper">
            <Label content={'3.검토작업 - 시험지 미리보기'} />
            <Button
              type="dashed"
              className="create-exam-preview-button"
              onClick={onToggleExamPreviewModal}
              disabled={!examId}
            >
              시험지 미리보기
            </Button>
          </div>
        </div>
        <div className="create-exam-kakaotalk-link-wrapper">
          <Label content={'4.카카오톡 문의'} />
          <label className="create-exam-small-label">
            시험지 제작과 관련하여 문의사항이 있을 경우, 아래 링크로 문의주세요!
            <br />
            <a
              href="https://open.kakao.com/o/sZy6kxbf"
              target="_blank"
              rel="noreferrer"
            >
              https://open.kakao.com/o/sZy6kxbf
            </a>
          </label>
        </div>
      </div>
    </QuestionAndSolutionFormContainer>
  );
};

export default QuestionAndSolutionForm;

const QuestionAndSolutionFormContainer = styled.div`
  .create-exam-input-error-wrapper {
    display: flex;
    flex-direction: column;
  }
  .create-exam-question-error-text {
    font-size: 0.9rem;
  }
  .create-exam-question-part-wrapper {
    margin-top: 10px;
    input {
      max-width: 250px;
    }
  }
  .create-exam-question-and-solution-area-wrapper {
    display: flex;
    gap: 20px;
    width: 100%;
  }
  .create-exam-question-number-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .create-exam-question-area {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    textarea {
      min-height: 150px;
      max-height: 350px;
    }
  }
  .create-exam-submit-button-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    gap: 10px;
  }
  .create-exam-question-submit-button {
    margin-top: 20px;
    width: 100%;
    height: 50px;
  }
  .create-exam-submit-button {
    width: 100%;
    height: 50px;
  }
  .create-exam-small-description {
    font-size: 0.9rem;
    color: ${palette.gray_900};
  }
  .create-exam-preview-button-wrapper {
    margin-top: 20px;
  }
  .create-exam-preview-button {
    margin-top: 10px;
    width: 100%;
    height: 50px;
  }
  .create-exam-kakaotalk-link-wrapper {
    margin-top: 30px;
  }
`;
