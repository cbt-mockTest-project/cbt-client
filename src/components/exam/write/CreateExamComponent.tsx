import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import Label from '@components/common/label/Label';
import palette from '@styles/palette';
import { Button, Input, message, UploadProps } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Dragger from 'antd/lib/upload/Dragger';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useCreateExam,
  useCreateExamCategory,
  useDeleteExamCategory,
  useReadExamTitles,
  useReadMyExamCategories,
} from '@lib/graphql/user/hook/useExam';
import { DefaultOptionType } from 'antd/lib/select';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import useInput from '@lib/hooks/useInput';
import SelectAdd, { SelectAddProps } from '@components/common/select/SelectAdd';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateMockExamQuestionInput } from 'types';
import QuestionAndSolutionForm from './QuestionAndSolutionForm';
import {
  useCreateQusetion,
  useLazyReadQuestionNumbers,
} from '@lib/graphql/user/hook/useExamQuestion';

interface CreateExamComponentProps {}

const CreateExamComponent: React.FC<CreateExamComponentProps> = () => {
  const { data: categoriesQuery } = useReadMyExamCategories();
  const [readTitles] = useReadExamTitles();
  const [readQuestionNumbers, { refetch: refetchReadQuestionNumbers }] =
    useLazyReadQuestionNumbers();
  const [createCategory, { loading: createCategoryLoading }] =
    useCreateExamCategory();
  const [deleteCategory, { loading: deleteCategoryLoading }] =
    useDeleteExamCategory();
  const [createQuestion] = useCreateQusetion();
  const [createExam, { loading: createExamLoading }] = useCreateExam();
  const [categories, setCategories] = useState<DefaultOptionType[]>([]);
  const [titles, setTitles] = useState<DefaultOptionType[]>([]);
  const [questionNumbers, setQuestionNumbers] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<DefaultOptionType | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<DefaultOptionType | null>(
    null
  );
  const {
    value: categoryName,
    setValue: setCategoryName,
    onChange: onChangeCategoryName,
  } = useInput('');
  const {
    value: examTitleForCreate,
    setValue: setExamTitleForCreate,
    onChange: onChangeExamTitleForCreate,
  } = useInput('');
  const methods = useForm<CreateMockExamQuestionInput>();

  const requestTitleSelect = async (title: DefaultOptionType) => {
    setSelectedTitle(title);
    const res = await readQuestionNumbers({
      variables: { input: { mockExamId: title.value as number } },
    });
    if (res.data?.readMockExamQuestionNumbers.ok) {
      setQuestionNumbers(() =>
        res.data ? res.data.readMockExamQuestionNumbers.questionNumbers : []
      );
      return;
    }
  };

  const requestCategorySelect = async (category: DefaultOptionType) => {
    setSelectedCategory(category);
    const res = await readTitles({
      variables: { input: { name: category.label as string, all: true } },
    });
    if (res.data?.readMockExamTitlesByCateory.ok) {
      setTitles(() =>
        res.data
          ? res.data.readMockExamTitlesByCateory.titles.map((title) => ({
              value: title.id,
              label: title.title,
            }))
          : []
      );
      return;
    }
    message.error(res.data?.readMockExamTitlesByCateory.error);
  };
  const tryCategorySelect = (category: DefaultOptionType) =>
    convertWithErrorHandlingFunc({
      callback: () => requestCategorySelect(category),
    });
  const requestCreateTitlte = async () => {
    if (!selectedCategory) return;
    if (examTitleForCreate.length < 2) {
      return message.error('두 글자 이상 입력해주세요.');
    }
    const res = await createExam({
      variables: {
        input: {
          title: examTitleForCreate,
          categoryName: selectedCategory.label as string,
        },
      },
    });
    if (res.data?.createMockExam.ok) {
      setExamTitleForCreate('');
      const { mockExam } = res.data.createMockExam;
      const convertedTitle: DefaultOptionType = {
        value: mockExam?.id,
        label: mockExam?.title,
      };
      const newTitles = [...titles, convertedTitle];
      setTitles(newTitles);
      return;
    }
    message.error(res.data?.createMockExam.error);
  };

  const tryCreateTitle = convertWithErrorHandlingFunc({
    callback: requestCreateTitlte,
  });
  const requestCreateCategory = async () => {
    if (categoryName.length < 2) {
      return message.error('두 글자 이상 입력해주세요.');
    }
    const res = await createCategory({
      variables: { input: { name: categoryName } },
    });
    if (res.data?.createMockExamCategory.ok) {
      setCategoryName('');
      const { category } = res.data.createMockExamCategory;
      const convertedCategory: DefaultOptionType = {
        value: category?.id,
        label: category?.name,
      };
      const newCategories = [...categories, convertedCategory];
      setCategories(newCategories);
      return;
    }
    message.error(res.data?.createMockExamCategory.error);
  };
  const tryCreateCategory = convertWithErrorHandlingFunc({
    callback: requestCreateCategory,
  });
  const requestDeleteCategory = async () => {
    const categoryId = categories.filter(
      (category) => category.label === categoryName
    )[0]?.value;
    if (!categoryId) {
      return message.error('존재하지 않는 카테고리입니다.');
    }
    const res = await deleteCategory({
      variables: { input: { id: Number(categoryId) } },
    });
    if (res.data?.deleteMockExamCategory.ok) {
      setCategories(() =>
        categories.filter((category) => category.label !== categoryName)
      );
      return;
    }
    return message.error(res.data?.deleteMockExamCategory.error);
  };
  const tryDeleteCategory = convertWithErrorHandlingFunc({
    callback: requestDeleteCategory,
  });
  useEffect(() => {
    if (categoriesQuery && categoriesQuery.readMyMockExamCategories) {
      setCategories(() =>
        categoriesQuery?.readMyMockExamCategories.categories.map(
          (category) => ({
            label: category.name,
            value: category.id,
          })
        )
      );
    }
  }, [categoriesQuery]);

  const SelectCategoryProps: SelectAddProps = {
    selectOption: {
      placeholder: '카테고리명 (시험 선택에 표시되는 이름)',
      options: categories,
      onSelect: (value, option) => tryCategorySelect(option)(),
    },
    inputOption: {
      placeholder: '추가할 카테고리명',
      value: categoryName,
      onChange: onChangeCategoryName,
    },
    createButtonOption: {
      onClick: tryCreateCategory,
      loading: createCategoryLoading,
      children: '등록하기',
    },
    deleteButtonOption: {
      onClick: tryDeleteCategory,
      loading: deleteCategoryLoading,
      children: '삭제하기',
    },
  };
  const SelectTitleProps: SelectAddProps = {
    selectOption: {
      disabled: !selectedCategory,
      placeholder: '시험명 (회차 선택에 표시되는 이름)',
      options: titles,
      onSelect: (value, option) => requestTitleSelect(option),
    },
    inputOption: {
      placeholder: '추가할 시험명',
      value: examTitleForCreate,
      onChange: onChangeExamTitleForCreate,
    },
    createButtonOption: {
      onClick: tryCreateTitle,
      loading: createExamLoading,
      children: '등록하기',
    },
    deleteButtonOption: {
      onClick: tryCreateTitle,
      loading: createExamLoading,
      children: '삭제하기',
    },
  };
  const onSubmit = async (data: CreateMockExamQuestionInput) => {
    if (!selectedTitle) {
      return message.error('시험을 선택해주세요.');
    }
    console.log(data);
    const res = await createQuestion({
      variables: {
        input: {
          mockExamId: selectedTitle.value as number,
          question: data.question,
          solution: data.solution,
          number: Number(data.number),
          question_img: [],
          solution_img: [],
        },
      },
    });
    if (res.data?.createMockExamQuestion.ok) {
      const numbersQuery = await refetchReadQuestionNumbers();
      if (numbersQuery.data.readMockExamQuestionNumbers.ok) {
        setQuestionNumbers(
          numbersQuery.data.readMockExamQuestionNumbers.questionNumbers
        );
      }
      message.success('문제가 등록되었습니다.');
      return;
    }
    return message.error(res.data?.createMockExamQuestion.error);
  };
  const tryOnSumbit = (data: CreateMockExamQuestionInput) =>
    convertWithErrorHandlingFunc({ callback: () => onSubmit(data) });

  return (
    <CreateExamComponentContainer>
      <Label content={'1.사전작업 - 카테고리,시험명 등록 및 선택하기'} />
      <div className="create-exam-input-button-wrapper">
        <SelectAdd {...SelectCategoryProps} />
        <SelectAdd {...SelectTitleProps} />
      </div>
      <FormProvider {...methods}>
        <form
          className="create-exam-question-wrapper"
          onSubmit={methods.handleSubmit((data) => tryOnSumbit(data)())}
        >
          <QuestionAndSolutionForm questionNumbers={questionNumbers} />
        </form>
      </FormProvider>
    </CreateExamComponentContainer>
  );
};

export default CreateExamComponent;

const CreateExamComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  padding: 0 30px;
  padding-bottom: 50px;
  .create-exam-input-button-wrapper {
    display: flex;
    gap: 20px;
    .ant-select-single {
      flex: 1;
    }
  }
  .create-exam-selector-wrapper {
    margin-top: 20px;
    max-width: 440px;
    position: relative;
    .ant-select {
      width: 100%;
    }
  }
  .create-exam-question-wrapper {
    margin-top: 20px;
  }
  .create-exam-small-label {
    display: block;
    font-size: 0.9rem;
    color: ${palette.gray_700};
  }
`;
