import ImageDragger from '@components/exam/write/ImageDragger';
import {
  useEditQuestion,
  useLazyReadQuestion,
} from '@lib/graphql/user/hook/useExamQuestion';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { Button, message, UploadFile } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useRouter } from 'next/router';
import React, { Dispatch, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import {
  CreateMockExamQuestionInput,
  MockExamQuestionImageInputType,
} from 'types';

interface QuestionEditComponentProps {}

const QuestionEditComponent: React.FC<QuestionEditComponentProps> = () => {
  const router = useRouter();
  const { handleSubmit, setValue, getValues, register, watch, control } =
    useForm<CreateMockExamQuestionInput>();
  const [readQuestion, { data: readQuestionQuery }] =
    useLazyReadQuestion('cache-and-network');
  const [editQuestion, { loading: editQuestionLoading }] = useEditQuestion();
  const [solutionImage, setSolutionImage] = useState<UploadFile<any>[]>([]);
  const [questionImage, setQuestionImage] = useState<UploadFile<any>[]>([]);
  const [editButtonDisabled, setEditButtonDisabled] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await readQuestion({
        variables: { input: { questionId: Number(String(router.query.Id)) } },
      });
      if (res.data?.readMockExamQuestion.ok) {
        const { mockExamQusetion } = res.data.readMockExamQuestion;
        setValue('question', mockExamQusetion.question);
        setValue('solution', mockExamQusetion.solution);
        const newSolutionImage =
          mockExamQusetion.solution_img as MockExamQuestionImageInputType[];
        const newQuestionImage =
          mockExamQusetion.question_img as MockExamQuestionImageInputType[];
        newSolutionImage.length >= 1 &&
          setSolutionImage([
            { ...newSolutionImage[0], thumbUrl: newSolutionImage[0].url },
          ]);
        newQuestionImage.length >= 1 &&
          setQuestionImage([
            { ...newQuestionImage[0], thumbUrl: newQuestionImage[0].url },
          ]);
      }
    })();
  }, [router.query.Id]);
  const requestSumbit = async (data: CreateMockExamQuestionInput) => {
    setEditButtonDisabled(true);
    const solution_img: MockExamQuestionImageInputType[] =
      solutionImage.length >= 1
        ? [
            {
              url: solutionImage[0].url as string,
              uid: solutionImage[0].url as string,
              name: solutionImage[0].name as string,
            },
          ]
        : [];
    const question_img: MockExamQuestionImageInputType[] =
      questionImage.length >= 1
        ? [
            {
              url: questionImage[0].url as string,
              uid: questionImage[0].url as string,
              name: questionImage[0].name as string,
            },
          ]
        : [];
    const res = await editQuestion({
      variables: {
        input: {
          id: Number(String(router.query.Id)),
          ...data,
          solution_img,
          question_img,
        },
      },
    });
    if (res.data?.editMockExamQuestion.ok) {
      message.success('문제가 수정됐습니다.');
      router.push(`/preview/question/${router.query.Id}`);
      return;
    }
    setEditButtonDisabled(false);
    return message.error(res.data?.editMockExamQuestion.error);
  };
  const trySubmit = (data: CreateMockExamQuestionInput) =>
    convertWithErrorHandlingFunc({ callback: () => requestSumbit(data) });
  if (!readQuestionQuery) return null;
  const { mockExamQusetion } = readQuestionQuery.readMockExamQuestion;
  return (
    <QuestionEditComponentContainer
      onSubmit={handleSubmit((data) => trySubmit(data)())}
    >
      <h2>
        {`${mockExamQusetion.mockExam.title} - ${mockExamQusetion.number}번 문제`}
      </h2>
      <div className="question-edit-block-wrapper">
        <div className="question-edit-block">
          <Controller
            name="question"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextArea
                placeholder="해설을 입력해주세요."
                autoSize={true}
                onChange={field.onChange}
                value={getValues('question') as string}
              />
            )}
          />
          <ImageDragger
            images={questionImage}
            setImages={setQuestionImage}
            text="문제와 관련된 사진을 등록해주세요."
            hint="사진은 한개만 등록 가능합니다."
          />
        </div>
        <div className="question-edit-block">
          <Controller
            name="solution"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextArea
                placeholder="해설을 입력해주세요."
                autoSize={true}
                onChange={field.onChange}
                value={getValues('solution') as string}
              />
            )}
          />
          <ImageDragger
            images={solutionImage}
            setImages={setSolutionImage}
            text="해설과 관련된 사진을 등록해주세요."
            hint="사진은 한개만 등록 가능합니다."
          />
        </div>
      </div>
      <Button
        className="question-edit-submit-button"
        type="primary"
        htmlType="submit"
        loading={editQuestionLoading}
        disabled={editButtonDisabled}
      >
        수정하기
      </Button>
    </QuestionEditComponentContainer>
  );
};

export default QuestionEditComponent;

const QuestionEditComponentContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .question-edit-block-wrapper {
    display: flex;
    width: 100%;
    gap: 15px;
  }
  .question-edit-submit-button {
    margin-top: 30px;
    height: 50px;
  }

  .question-edit-block {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    textArea {
      min-height: 150px;
      max-height: 350px;
    }
  }
`;
