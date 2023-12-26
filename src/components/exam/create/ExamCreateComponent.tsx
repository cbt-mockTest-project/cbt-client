import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ExamCreateHeader from './ExamCreateHeader';
import palette from '@styles/palette';
import { responsive } from '@lib/utils/responsive';
import TextInput from '@components/common/input/TextInput';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateExamForm, CreateQuestionForm } from 'customTypes';
import ExamCreateCardList from './ExamCreateCardList';
import { message } from 'antd';
import { difference, differenceWith, isEqual } from 'lodash';

const ExamCreateComponentBlock = styled.div`
  background-color: ${palette.colorContainerBg};
  .exam-create-body {
    max-width: 1280px;
    margin: 0 auto;
    padding: 20px;
  }
  .exam-create-title-input {
    max-width: 600px;
    font-size: 20px;
  }

  @media (max-width: ${responsive.medium}) {
    .exam-create-body {
      padding: 10px;
    }
  }
`;

interface ExamCreateComponentProps {}

const ExamCreateComponent: React.FC<ExamCreateComponentProps> = () => {
  const defaultValues = useRef<CreateExamForm>({
    title: '',
    questions: [
      {
        questionId: -new Date().getTime(),
      },
    ],
  });
  const methods = useForm<CreateExamForm>({
    defaultValues: defaultValues.current,
  });
  const { handleSubmit, setValue, formState, watch, setError, clearErrors } =
    methods;
  const onSubmit = (data: CreateExamForm) => {
    const questions = Array.from(data.questions).filter(
      (v) => Object.values(v).length > 1
    );
    const quiestionOrders = questions.map((v) => v.questionId);
    const differenceQuestions = differenceWith(
      questions,
      defaultValues.current.questions,
      isEqual
    );
    const differenceExamTitle = difference(
      [data.title],
      [defaultValues.current.title]
    );
    defaultValues.current = data;
    console.log('differenceQuestions', differenceQuestions);
    console.log('differenceExamTitle', differenceExamTitle);
    console.log('quiestionOrders', quiestionOrders);
  };
  const requiredError = (message: string) => ({
    type: 'required',
    message,
  });
  useEffect(() => {
    setError('title', requiredError('시험지 제목을 입력해주세요.'));
    watch((value) => {
      if (!value.title) {
        setError('title', requiredError('시험지 제목을 입력해주세요.'));
      } else {
        clearErrors('title');
      }
    });
  }, [watch]);

  useEffect(() => {
    if (formState.errors.title) {
      return message.error('시험지 제목을 입력해주세요.');
    }
  }, [formState.isSubmitting]);

  return (
    <FormProvider {...methods}>
      <ExamCreateComponentBlock>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ExamCreateHeader />
          <div className="exam-create-body">
            <TextInput
              onChange={(e) => setValue('title', e.target.value)}
              placeholder="시험지 제목을 입력해주세요."
              className="exam-create-title-input"
            />
            <ExamCreateCardList />
          </div>
        </form>
      </ExamCreateComponentBlock>
    </FormProvider>
  );
};

export default ExamCreateComponent;
