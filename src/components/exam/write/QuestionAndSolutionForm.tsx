import { InboxOutlined } from '@ant-design/icons';
import Label from '@components/common/label/Label';
import ErrorText from '@components/common/layout/errorText/ErrorText';
import { Button, Input, UploadFile, UploadProps } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Link from 'next/link';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { QuestionNumber } from 'types';
import ImageDragger from './ImageDragger';

interface QuestionAndSolutionFormProps {
  questionNumbers: QuestionNumber[];
  selectedQuestionNumber: number;
  questionImage: UploadFile<any>[];
  setQuestionImage: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  solutionImage: UploadFile<any>[];
  setSolutionImage: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
}

const QuestionAndSolutionForm: React.FC<QuestionAndSolutionFormProps> = ({
  questionNumbers,
  selectedQuestionNumber,
  questionImage,
  setQuestionImage,
  solutionImage,
  setSolutionImage,
}) => {
  const { control, formState, getValues } = useFormContext();

  return (
    <QuestionAndSolutionFormContainer>
      <Label content={'3.본격작업 - 문제 등록하기'} />
      <div className="create-exam-question-part-wrapper">
        <label className="create-exam-small-label">3.1 문제번호</label>
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
          3.2 현재 등록된 문제번호
        </label>
        {questionNumbers.length >= 1 && (
          <ul className="create-exam-question-number-wrapper">
            {questionNumbers.map((questionNumber) => (
              <li key={questionNumber.questionId}>
                <a
                  href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/question/${questionNumber.questionId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button>{questionNumber.questionNumber}</Button>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="create-exam-question-part-wrapper">
        <label className="create-exam-small-label">
          3.3 문제,해설 내용 입력하기
        </label>
        <div className="create-exam-question-and-solution-area-wrapper">
          <div className="create-exam-question-area">
            <Controller
              name="question"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextArea
                  placeholder="문제를 입력해주세요."
                  autoSize={true}
                  onChange={field.onChange}
                  value={getValues('question')}
                />
              )}
            />
            {formState.errors.question?.type === 'required' && (
              <ErrorText
                content="문제를 입력해주세요."
                className="create-exam-question-error-text"
              />
            )}
            <ImageDragger
              text="문제와 관련된 사진을 등록해주세요."
              hint="사진은 한개만 등록 가능합니다."
              images={questionImage}
              setImages={setQuestionImage}
            />
          </div>
          <div className="create-exam-question-area">
            <Controller
              name="solution"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextArea
                  placeholder="해설을 입력해주세요."
                  autoSize={true}
                  onChange={field.onChange}
                  value={getValues('solution')}
                />
              )}
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
              hint="사진은 한개만 등록 가능합니다."
            />
          </div>
        </div>
        <div className="create-exam-submit-button-wrapper">
          <Button
            type="primary"
            className="create-exam-question-submit-button"
            htmlType="submit"
          >
            문제 등록하기
          </Button>
          <Label content={'4.마무리작업 - 시험지 공개하기'} />
          <label className="create-exam-small-label">
            시험지 공개 후, 시험모드/해설모드/랜덤모의고사 등의 서비스를 이용 할
            수 있습니다.
          </label>
          <Button type="dashed" className="create-exam-submit-button">
            시험지 공개하기
          </Button>
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
`;
