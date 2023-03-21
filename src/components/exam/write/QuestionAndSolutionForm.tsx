import { InboxOutlined } from '@ant-design/icons';
import Label from '@components/common/label/Label';
import ErrorText from '@components/common/layout/errorText/ErrorText';
import { useEditExam } from '@lib/graphql/user/hook/useExam';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import palette from '@styles/palette';
import { Button, Input, message, UploadFile, UploadProps } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Link from 'next/link';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { ExamStatus, QuestionNumber } from 'types';
import ImageDragger from './ImageDragger';

interface QuestionAndSolutionFormProps {
  questionNumbers: QuestionNumber[];
  selectedQuestionNumber: number;
  questionImage: UploadFile<any>[];
  setQuestionImage: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  solutionImage: UploadFile<any>[];
  setSolutionImage: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  examStatus: ExamStatus;
  setExamStatus: React.Dispatch<React.SetStateAction<ExamStatus>>;
  examId: number;
  onToggleExamPreviewModal: () => void;
}

const QuestionAndSolutionForm: React.FC<QuestionAndSolutionFormProps> = ({
  questionNumbers,
  selectedQuestionNumber,
  questionImage,
  setQuestionImage,
  solutionImage,
  setSolutionImage,
  examStatus,
  setExamStatus,
  onToggleExamPreviewModal,
  examId,
}) => {
  const { control, formState, getValues } = useFormContext();
  const [editExam] = useEditExam();
  let examSubmitLabel: string = '...';
  switch (examStatus) {
    case ExamStatus.Unset:
      examSubmitLabel = '시험지 승인요청';
      break;
    case ExamStatus.Request:
      examSubmitLabel = '시험지 승인대기중';
      break;
    case ExamStatus.Approved:
      examSubmitLabel = '시험지 승인됨';
      break;
    case ExamStatus.Rejected:
      examSubmitLabel = '시험지 승인거절됨';
      break;

    default:
      break;
  }
  const examSubminButtonDisabled =
    examStatus === ExamStatus.Approved ||
    examStatus === ExamStatus.Request ||
    !examId ||
    questionNumbers.length < 5;
  const onRequestApprove = async () => {
    const confirmed = confirm('승인요청 하시겠습니까?');
    if (confirmed) {
      const res = await editExam({
        variables: { input: { id: examId, status: ExamStatus.Request } },
      });
      if (res.data?.editMockExam.ok) {
        setExamStatus(ExamStatus.Request);
        return message.success('승인요청이 완료되었습니다.');
      }
      return message.error(res.data?.editMockExam.error);
    }
  };
  const onTryApprove = convertWithErrorHandlingFunc({
    callback: onRequestApprove,
  });
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
          2.2 현재 등록된 문제번호
        </label>
        {questionNumbers.length >= 1 ? (
          <ul className="create-exam-question-number-wrapper">
            {questionNumbers.map((questionNumber) => (
              <li key={questionNumber.questionId}>
                <a
                  href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/preview/question/${questionNumber.questionId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button>{questionNumber.questionNumber}</Button>
                </a>
              </li>
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
              hint={`사진은 한개만 등록 가능합니다.\n사진이 없을 경우 빈칸으로 두세요.`}
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
              hint={`사진은 한개만 등록 가능합니다.\n사진이 없을 경우 빈칸으로 두세요.`}
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
          <div className="create-exam-preview-button-wrapper">
            <Label content={'3.검토작업 - 시험지 미리보기'} />
            <label className="create-exam-small-label">
              시험지 승인요청 전, 미리보기를 통해 시험지를 확인해보세요.
              <br />
              미리보기에서는 북마크,성취도 등 일부 기능이 지원되지 않습니다.
            </label>
            <Button
              type="dashed"
              className="create-exam-preview-button"
              onClick={onToggleExamPreviewModal}
              disabled={!examId}
            >
              시험지 미리보기
            </Button>
          </div>
          <div>
            <Label content={'4.마무리작업 - 시험지 승인요청'} />
            <label className="create-exam-small-label">
              시험지 승인은 5문제 이상 등록 후 요청할 수 있습니다.
              <br />
              시험지 승인은 24시간 내에 완료 할 수 있도록 하겠습니다.
              <br />
              시험지 승인 후, 풀이모드/해설모드/랜덤모의고사 등의 기능을
              이용하실 수 있습니다.
              <br />
              승인된 시험지는 모든 유저에게 공개됩니다.
              <br />
              승인된 시험지는 삭제할 수 없습니다.
              <br />
              승인된 시험지에서 문제수정은 가능합니다.
            </label>
          </div>

          <Button
            type="dashed"
            className="create-exam-submit-button"
            onClick={onTryApprove}
            disabled={examSubminButtonDisabled}
          >
            {examSubmitLabel}
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
`;
