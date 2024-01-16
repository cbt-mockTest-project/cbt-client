import ExamCreateEditor from '@components/exam/create/ExamCreateEditor';
import {
  useEditQuestion,
  useLazyReadQuestion,
} from '@lib/graphql/hook/useExamQuestion';
import { handleError } from '@lib/utils/utils';
import EditorStyle from '@styles/editorStyle';
import { Button, message, UploadFile } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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
  const [solutionImage, setSolutionImage] = useState<UploadFile<any>[] | null>(
    null
  );
  const [questionImage, setQuestionImage] = useState<UploadFile<any>[] | null>(
    null
  );
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
        setSolutionImage(
          newSolutionImage.length >= 1
            ? [{ ...newSolutionImage[0], thumbUrl: newSolutionImage[0].url }]
            : []
        );
        newQuestionImage.length >= 1 &&
          setQuestionImage(
            newQuestionImage.length >= 1
              ? [{ ...newQuestionImage[0], thumbUrl: newQuestionImage[0].url }]
              : []
          );
      }
    })();
  }, [router.query.Id]);

  const requestSumbit = async (data: CreateMockExamQuestionInput) => {
    try {
      setEditButtonDisabled(true);
      const solution_img: MockExamQuestionImageInputType[] =
        solutionImage.length >= 1
          ? [
              {
                url: solutionImage[0].url as string,
                uid: solutionImage[0].url as string,
                name: solutionImage[0].url as string,
              },
            ]
          : [];
      const question_img: MockExamQuestionImageInputType[] =
        questionImage.length >= 1
          ? [
              {
                url: questionImage[0].url as string,
                uid: questionImage[0].url as string,
                name: questionImage[0].url as string,
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

      return message.error(res.data?.editMockExamQuestion.error);
    } catch (e) {
      message.error('문제 수정에 실패했습니다.');
      handleError(e);
    } finally {
      setEditButtonDisabled(false);
    }
  };
  if (!readQuestionQuery || !questionImage || !solutionImage) return null;
  const { mockExamQusetion } = readQuestionQuery.readMockExamQuestion;
  return (
    <QuestionEditComponentContainer onSubmit={handleSubmit(requestSumbit)}>
      <h2>
        {`${mockExamQusetion.mockExam?.title} - ${mockExamQusetion.number}번 문제`}
      </h2>
      <div className="question-edit-editor-wrapper">
        <ExamCreateEditor
          onChangeImage={(value) => {
            setQuestionImage([
              {
                uid: value,
                name: value,
                url: value,
                thumbUrl: value,
              },
            ]);
          }}
          onChangeText={(value) => setValue('question', value)}
          key={'question'}
          defaultValue={watch('question') || ''}
          defaultImgUrl={(questionImage && questionImage[0]?.url) || ''}
          editorPlaceholder="문제를 입력해주세요."
        />
        <ExamCreateEditor
          onChangeImage={(value) => {
            setSolutionImage([
              {
                uid: value,
                name: value,
                url: value,
                thumbUrl: value,
              },
            ]);
          }}
          onChangeText={(value) => setValue('solution', value)}
          key={'solution'}
          defaultValue={watch('solution') || ''}
          defaultImgUrl={(solutionImage && solutionImage[0]?.url) || ''}
          editorPlaceholder="해설을 입력해주세요."
        />
      </div>

      <Button
        type="primary"
        size="large"
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
  ${EditorStyle}
  .question-edit-editor-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;
