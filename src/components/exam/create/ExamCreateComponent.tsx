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
import { handleError, removeHtmlTag } from '@lib/utils/utils';
import { useLazyReadMockExam, useSaveExam } from '@lib/graphql/hook/useExam';
import { useRouter } from 'next/router';
import ExamCreateSavedTime from './ExamCreateSavedTime';

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
  const [saveExam] = useSaveExam();
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

  const { handleSubmit, setValue, getValues } = methods;

  const onSubmit = async (data: CreateExamForm) => {
    try {
      if (!data.title) {
        return message.error('시험지 제목을 입력해주세요.');
      }
      const questions = Array.from(data.questions).filter(
        (v) =>
          Object.values(v).filter((v) => {
            if (typeof v === 'string') {
              return removeHtmlTag(v).length > 0;
            }
            if (Array.isArray(v)) {
              return v.length > 0 && v[0].url;
            }
            return true;
          }).length > 1
      );
      const questionOrderIds = questions.map((v) => v.orderId);

      if (questions.length === 0) {
        return message.error('문제를 1개 이상 입력해주세요.');
      }
      const res = await saveExam({
        variables: {
          input: {
            title: data.title,
            uuid: data.uuid,
            questionOrderIds,
            questions,
          },
        },
      });
      if (res.data.saveExam.error) {
        return message.error(res.data.saveExam.error);
      }
      if (!router.query.examId) {
        router.replace({
          pathname: router.pathname,
          query: {
            examId: res.data.saveExam.examId,
          },
        });
      }
      return message.success('시험지가 저장되었습니다.');
    } catch (e) {
      handleError(e);
    }
  };

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

  return (
    <FormProvider {...methods}>
      <ExamCreateComponentBlock>
        <form onSubmit={handleSubmit(onSubmit)}>
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
