import { useCreateQuestionCard } from '@lib/graphql/hook/useQuestionCard';
import { Button, App } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Select, { DefaultOptionType } from 'antd/lib/select';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { QuestionCard } from 'types';
import Modal, { ModalProps } from '../Modal';

interface AddQuestionCardModalProps extends Omit<ModalProps, 'children'> {
  cardCategories: DefaultOptionType[];
  setQuestionCards?: React.Dispatch<React.SetStateAction<QuestionCard[]>>;
  defalutQuestion?: string;
  defaultSolution?: string;
  mode?: 'add' | 'edit';
}

export interface AddQuestionCardModalForm {
  question: string;
  solution: string;
}

const AddQuestionCardModal: React.FC<AddQuestionCardModalProps> = ({
  open,
  onClose,
  cardCategories,
  setQuestionCards,
  defalutQuestion = '',
  defaultSolution = '',
  mode = 'add',
}) => {
  const { message } = App.useApp();
  const isEditMode = mode === 'edit';
  const [selectedCardCategory, setSelectedCardCategory] =
    useState<DefaultOptionType>();
  const { control, getValues, handleSubmit, reset, watch } =
    useForm<AddQuestionCardModalForm>({
      defaultValues: { question: defalutQuestion, solution: defaultSolution },
    });
  const [createQuestionCard] = useCreateQuestionCard();
  const onChangeCategory = (
    value: any,
    option: DefaultOptionType | DefaultOptionType[]
  ) => {
    setSelectedCardCategory(option as DefaultOptionType);
  };
  const onSubmit = async (data: { question: string; solution: string }) => {
    const { question, solution } = data;
    const { data: createQuestionCardData } = await createQuestionCard({
      variables: {
        input: {
          question,
          solution,
          categoryId: selectedCardCategory?.value as number,
        },
      },
    });
    if (createQuestionCardData?.createQuestionCard.ok) {
      setQuestionCards &&
        setQuestionCards((prev) => [
          createQuestionCardData.createQuestionCard
            .questionCard as QuestionCard,
          ...prev,
        ]);
      reset();
      return message.success('문제가 추가되었습니다.');
    }
    return message.error('문제 추가에 실패했습니다.');
  };

  return (
    <AddQuestionCardModalContainer open={open} onClose={onClose}>
      <Select
        className="add-question-card-modal-category-selector"
        options={cardCategories}
        onChange={onChangeCategory}
        placeholder="카테고리를 선택해주세요."
      />
      <form
        className="add-question-card-modal-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="question"
          render={({ field }) => (
            <TextArea
              className="add-question-card-modal-question-textarea"
              onChange={field.onChange}
              autoSize={true}
              value={getValues('question')}
              disabled={!selectedCardCategory}
              placeholder="문제를 입력해주세요."
            />
          )}
        />
        <Controller
          control={control}
          name="solution"
          render={({ field }) => (
            <TextArea
              className="add-question-card-modal-solution-textarea"
              onChange={field.onChange}
              autoSize={true}
              value={getValues('solution')}
              disabled={!selectedCardCategory}
              placeholder="답을 입력해주세요."
            />
          )}
        />
        <Button
          type="primary"
          disabled={
            !selectedCardCategory || !watch('question') || !watch('solution')
          }
          htmlType="submit"
        >
          {isEditMode ? '문제수정하기' : '문제추가하기'}
        </Button>
      </form>
    </AddQuestionCardModalContainer>
  );
};

export default AddQuestionCardModal;

const AddQuestionCardModalContainer = styled(Modal)`
  padding: 40px 20px;
  max-height: 450px;
  overflow-y: auto;
  position: fixed;
  top: 0;
  bottom: 0;
  max-width: 500px;
  .add-question-card-modal-form {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .add-question-card-modal-category-selector {
    width: 100%;
  }
  .add-question-card-modal-question-textarea,
  .add-question-card-modal-solution-textarea {
    min-height: 140px;
    max-height: 140px;
  }
  .modal-close-button {
    top: -30px;
    right: -10px;
  }
`;
