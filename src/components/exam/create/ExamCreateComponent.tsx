import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ExamCreateHeader from './ExamCreateHeader';
import palette from '@styles/palette';
import { responsive } from '@lib/utils/responsive';
import TextInput from '@components/common/input/TextInput';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateExamForm, CreateQuestionForm } from 'customTypes';
import ExamCreateCardList from './ExamCreateCardList';
import { message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { isEqual, pick } from 'lodash';
import { useLazyReadMockExam } from '@lib/graphql/hook/useExam';
import { useRouter } from 'next/router';
import ExamCreateSavedTime from './ExamCreateSavedTime';
import useSaveExamHandler from './useSaveExamHandler';

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
  .exam-create-input-and-time {
    display: flex;
    gap: 30px;
    justify-content: space-between;
    align-items: flex-end;
  }

  @media (max-width: ${responsive.medium}) {
    .exam-create-body {
      padding: 10px;
    }
  }
`;

interface ExamCreateComponentProps {}

const ExamCreateComponent: React.FC<ExamCreateComponentProps> = () => {
  const router = useRouter();
  const { handleSaveExam, debouncedSaveExam } = useSaveExamHandler();
  const [readExam] = useLazyReadMockExam();
  const [defaultForm, setDefaultForm] = useState<CreateExamForm>({
    title: '',
    uuid: uuidv4(),
    questions: [
      {
        orderId: uuidv4(),
        question_img: [],
        solution_img: [],
      },
    ],
  });
  const methods = useForm<CreateExamForm>({
    defaultValues: {
      title: '',
      uuid: uuidv4(),
      questions: defaultForm.questions,
    },
  });

  const { handleSubmit, setValue, getValues, watch } = methods;

  useEffect(() => {
    if (router.query.examId) {
      readExam({
        variables: {
          input: {
            id: Number(router.query.examId),
          },
        },
      }).then((res) => {
        if (res.data?.readMockExam.error) {
          return message.error(res.data.readMockExam.error);
        }

        const { title, mockExamQuestion, uuid } =
          res.data.readMockExam.mockExam;

        const newQuestions: CreateQuestionForm[] = mockExamQuestion.map((v) => {
          const newQuestion = {
            ...v,
            question_img: v.question_img?.[0]
              ? [pick(v.question_img[0], ['url', 'name', 'uid'])]
              : [],
            solution_img: v.solution_img?.[0]
              ? [pick(v.solution_img[0], ['url', 'name', 'uid'])]
              : [],
          };
          return pick(newQuestion, [
            'orderId',
            'question',
            'question_img',
            'solution',
            'solution_img',
          ]);
        });
        if (
          isEqual(getValues('questions'), newQuestions) &&
          getValues('title') === title
        ) {
          return;
        }
        setValue('title', title);
        setValue('uuid', uuid);
        setValue('questions', newQuestions);
        setDefaultForm({
          title,
          uuid,
          questions: newQuestions,
        });
      });
    }
  }, [router.query.examId]);

  useEffect(() => {
    watch(() => {
      debouncedSaveExam(getValues());
    });
  }, []);
  return (
    <FormProvider {...methods}>
      <ExamCreateComponentBlock>
        <form
          onSubmit={handleSubmit((data, e) => {
            e.preventDefault();
            handleSaveExam(data, true);
          })}
          id="exam-create-form"
        >
          <ExamCreateHeader />
          <div className="exam-create-body">
            <div className="exam-create-input-and-time">
              <TextInput
                key={defaultForm.title}
                defaultValue={defaultForm.title}
                onChange={(e) => setValue('title', e.target.value)}
                placeholder="시험지 제목을 입력해주세요."
                className="exam-create-title-input"
              />
              <ExamCreateSavedTime />
            </div>

            <ExamCreateCardList defaultQuestions={defaultForm.questions} />
          </div>
        </form>
      </ExamCreateComponentBlock>
    </FormProvider>
  );
};

export default ExamCreateComponent;
