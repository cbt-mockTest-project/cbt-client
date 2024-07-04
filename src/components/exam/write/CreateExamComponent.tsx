import Label from '@components/common/label/Label';
import palette from '@styles/palette';
import { message, UploadFile } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useCreateExam,
  useCreateExamCategory,
  useDeleteExam,
  useDeleteExamCategory,
  useEditCategory,
  useEditExam,
  useLazyReadMyExamCategories,
  useReadExamTitles,
} from '@lib/graphql/hook/useExam';
import { DefaultOptionType } from 'antd/lib/select';
import useInput from '@lib/hooks/useInput';
import SelectAdd, { SelectAddProps } from '@components/common/select/SelectAdd';
import { FormProvider, useForm } from 'react-hook-form';
import {
  CreateMockExamQuestionInput,
  ExamStatus,
  MockExamQuestionImageInputType,
  QuestionNumber,
} from 'types';
import QuestionAndSolutionForm from './QuestionAndSolutionForm';
import {
  useCreateQusetion,
  useLazyReadQuestionNumbers,
} from '@lib/graphql/hook/useExamQuestion';
import Portal from '@components/common/portal/Portal';
import ExamPreviewModal from '@components/common/modal/ExamPreviewModal';
import useToggle from '@lib/hooks/useToggle';
import { useRouter } from 'next/router';
import EditNameModal from '@components/common/modal/EditNameModal';
import { handleError } from '@lib/utils/utils';
import CreateExamFeedbackModal from './modal/CreateExamFeedbackModal';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import Dimmed from '@components/common/dimmed/Dimmed';

interface CreateExamComponentProps {}

const findBlankQuestionNumber = (questionNumbers: QuestionNumber[]) => {
  let blankQuestionNumber = 0;
  questionNumbers.forEach((number, index) => {
    if (blankQuestionNumber !== 0) return;
    if (index === 0 && number.questionNumber !== 1) {
      blankQuestionNumber = 1;
      return;
    }
    if (index === 0) {
      return;
    }

    if (
      number.questionNumber !==
      questionNumbers[index - 1].questionNumber + 1
    ) {
      blankQuestionNumber = questionNumbers[index - 1].questionNumber + 1;
      return;
    }
  });
  blankQuestionNumber =
    blankQuestionNumber === 0
      ? questionNumbers.length + 1
      : blankQuestionNumber;
  return blankQuestionNumber;
};

const CreateExamComponent: React.FC<CreateExamComponentProps> = () => {
  const router = useRouter();
  const [
    readCategories,
    { data: categoriesQuery, loading: readCategoriesLoading },
  ] = useLazyReadMyExamCategories();
  const { data: meQuery } = useMeQuery();
  const { value: feedbackModalState, onToggle: onToggleFeedbackModal } =
    useToggle(false);
  const [readTitles, { loading: readTitlesLoading }] = useReadExamTitles();
  const [editCategory, { loading: editCategoryLoading }] = useEditCategory();
  const [isNotLoggedIn, setIsNotLoggedIn] = useState<boolean>(false);
  const [editExam, { loading: editExamLoading }] = useEditExam();
  const [readQuestionNumbers, { refetch: refetchReadQuestionNumbers }] =
    useLazyReadQuestionNumbers();
  const [createQuestionLoading, setCreateQuestionLoading] =
    useState<boolean>(false);

  const [selectedQuestionNumber, setSelectedQuestionNumber] =
    useState<number>(1);
  const [createCategory, { loading: createCategoryLoading }] =
    useCreateExamCategory();
  const [deleteCategory, { loading: deleteCategoryLoading }] =
    useDeleteExamCategory();
  const [deleteExam, { loading: deleteExamLoading }] = useDeleteExam();
  const [createQuestion] = useCreateQusetion();
  const [createExam, { loading: createExamLoading }] = useCreateExam();
  const [examStatus, setExamStatus] = useState(ExamStatus.Unset);
  const [categories, setCategories] = useState<DefaultOptionType[]>([]);
  const [titles, setTitles] = useState<DefaultOptionType[]>([]);
  const [questionNumbers, setQuestionNumbers] = useState<QuestionNumber[]>([]);

  const { value: examPreviewModal, onToggle: onToggleExamPreviewModal } =
    useToggle(false);
  const {
    value: editCategoryNameModal,
    onToggle: onToggleEditCategoryNameModal,
  } = useToggle(false);
  const { value: editExamTitleModal, onToggle: onToggleEditExamTitleModal } =
    useToggle(false);

  const [selectedCategory, setSelectedCategory] =
    useState<DefaultOptionType | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<DefaultOptionType | null>(
    null
  );
  const [questionImage, setQuestionImage] = React.useState<
    UploadFile<any>[] | MockExamQuestionImageInputType[]
  >([]);
  const [solutionImage, setSolutionImage] = React.useState<
    UploadFile<any>[] | MockExamQuestionImageInputType[]
  >([]);

  const {
    value: categoryName,
    setValue: setCategoryName,
    onChange: onChangeCategoryName,
  } = useInput('');
  const {
    value: examTitle,
    setValue: setExamTitle,
    onChange: onChangeExamTitle,
  } = useInput('');

  const methods = useForm<CreateMockExamQuestionInput>();

  const requestTitleSelect = async (title: DefaultOptionType) => {
    try {
      setSelectedTitle(title);
      const res = await readQuestionNumbers({
        variables: { input: { mockExamId: title.value as number } },
      });
      if (res.data?.readMockExamQuestionNumbers.ok) {
        const { questionNumbers, examStatus } =
          res.data.readMockExamQuestionNumbers;
        setQuestionNumbers(() => (res.data ? questionNumbers : []));
        setExamStatus(examStatus as ExamStatus);

        setSelectedQuestionNumber(findBlankQuestionNumber(questionNumbers));
        return;
      }
    } catch (e) {
      handleError(e);
    }
  };

  const requestCategorySelect = async (category: DefaultOptionType) => {
    try {
      setSelectedCategory(category);
      const res = await readTitles({
        variables: { input: { name: category.label as string, all: true } },
      });
      if (res.data?.readMockExamTitlesByCateory.ok) {
        const titles = res.data
          ? res.data.readMockExamTitlesByCateory.titles.map((title) => ({
              value: title.id,
              label: title.title,
            }))
          : [];
        setTitles(titles);
        return;
      }
      message.error(res.data?.readMockExamTitlesByCateory.error);
    } catch (e) {
      handleError(e);
    }
  };

  const requestCreateTitlte = async () => {
    try {
      if (!selectedCategory) return;
      if (examTitle.length < 2) {
        return message.error('두 글자 이상 입력해주세요.');
      }
      const res = await createExam({
        variables: {
          input: {
            title: examTitle,
            categoryName: selectedCategory.label as string,
          },
        },
      });
      if (res.data?.createMockExam.ok) {
        setExamTitle('');
        const { mockExam } = res.data.createMockExam;
        const convertedTitle: DefaultOptionType = {
          value: mockExam?.id,
          label: mockExam?.title,
        };
        const newTitles = [...titles, convertedTitle];
        setTitles(newTitles);
        message.success('시험이 생성되었습니다.');
        return;
      }
      message.error(res.data?.createMockExam.error);
    } catch (e) {
      handleError(e);
    }
  };

  const requestCreateCategory = async () => {
    try {
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
        const newCategories = [convertedCategory, ...categories];
        setCategories(newCategories);
        message.success('카테고리가 생성되었습니다.');
        return;
      }
      message.error(res.data?.createMockExamCategory.error);
    } catch (e) {
      handleError(e);
    }
  };

  const requestDeleteExam = async () => {
    try {
      const examId = titles.filter(
        (title) => title.label?.toString().trim() === examTitle.trim()
      )[0]?.value;
      if (!examId) {
        return message.error('존재하지 않는 시험입니다.');
      }
      const confirmed = confirm(
        '정말 삭제하시겠습니까?\n삭제시 등록된 모든 문제가 삭제됩니다.'
      );
      if (!confirmed) return;

      const res = await deleteExam({
        variables: { input: { id: Number(examId) } },
      });
      if (res.data?.deleteMockExam.ok) {
        setTitles(() =>
          titles.filter((title) => title.label?.toString() !== examTitle.trim())
        );
        message.success('삭제되었습니다.');
        return;
      }
      return message.error(res.data?.deleteMockExam.error);
    } catch (e) {
      handleError(e);
    }
  };

  const openEditModal = (type: 'category' | 'exam') => {
    if (type === 'category') {
      const categoryId = categories.filter(
        (category) => category.label?.toString().trim() === categoryName.trim()
      )[0]?.value;
      if (!categoryId) {
        return message.error('존재하지 않는 카테고리입니다.');
      }
      onToggleEditCategoryNameModal();
      return;
    }
    if (type === 'exam') {
      const examId = titles.filter(
        (title) => title.label?.toString().trim() === examTitle.trim()
      )[0]?.value;
      if (!examId) {
        return message.error('존재하지 않는 시험입니다.');
      }
      onToggleEditExamTitleModal();
      return;
    }
  };
  const requestEditTitle = async (value: string) => {
    try {
      const examId = titles.filter(
        (exam) => exam.label?.toString().trim() === examTitle.trim()
      )[0]?.value;
      if (!examId) {
        return message.error('존재하지 않는 시험입니다.');
      }
      const confirmed = confirm('정말 수정하시겠습니까?');
      if (!confirmed) return;
      const res = await editExam({
        variables: { input: { id: Number(examId), title: value.trim() } },
      });
      if (res.data?.editMockExam.ok) {
        message.success('시험명이 수정되었습니다.');
        setTitles(() =>
          titles.map((exam) =>
            exam.value == examId
              ? { value: exam.value, label: value.trim() }
              : { ...exam }
          )
        );
        return;
      }
      return message.error(res.data?.editMockExam.error);
    } catch (e) {
      handleError(e);
    }
  };

  const requestEditCategory = async (value: string) => {
    try {
      const categoryId = categories.filter((category) => {
        return category.label?.toString().trim() === categoryName.trim();
      })[0]?.value;
      if (!categoryId) {
        return message.error('존재하지 않는 카테고리입니다.');
      }
      const confirmed = confirm('정말 수정하시겠습니까?');
      if (!confirmed) return;
      const res = await editCategory({
        variables: { input: { id: Number(categoryId), name: value.trim() } },
      });
      if (res.data?.editMockExamCategory.ok) {
        message.success('카테고리가 수정되었습니다.');
        setCategories(() =>
          categories.map((category) =>
            category.value === categoryId
              ? { value: category.value, label: value.trim() }
              : { ...category }
          )
        );
        return;
      }
      return message.error(res.data?.editMockExamCategory.error);
    } catch (e) {
      handleError(e);
    }
  };

  const requestDeleteCategory = async () => {
    try {
      const categoryId = categories.filter(
        (category) => category.label?.toString().trim() === categoryName.trim()
      )[0]?.value;
      if (!categoryId) {
        return message.error('존재하지 않는 카테고리입니다.');
      }
      const confirmed = confirm('정말 삭제하시겠습니까?');
      if (!confirmed) return;

      const res = await deleteCategory({
        variables: { input: { id: Number(categoryId) } },
      });
      if (res.data?.deleteMockExamCategory.ok) {
        message.success('카테고리가 삭제되었습니다.');
        setCategories(() =>
          categories.filter(
            (category) =>
              category.label?.toString().trim() !== categoryName.trim()
          )
        );
        return;
      }
      return message.error(res.data?.deleteMockExamCategory.error);
    } catch (e) {
      handleError(e);
    }
  };

  useEffect(() => {
    if (meQuery && meQuery.me.user) {
      readCategories();
    }
    if (meQuery && !meQuery.me.user) {
      setIsNotLoggedIn(true);
    }
  }, [meQuery]);

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

  useEffect(() => {
    if (
      router.isReady &&
      router.query.cl &&
      router.query.cv &&
      router.query.el &&
      router.query.ev
    ) {
      requestCategorySelect({
        label: router.query.cl as string,
        value: Number(router.query.cv) as number,
      });
      setSelectedTitle({
        label: router.query.el as string,
        value: Number(router.query.ev) as number,
      });
    }
  }, [router.isReady]);

  useEffect(() => {
    if (
      selectedTitle &&
      titles.length >= 1 &&
      router.query.cl &&
      router.query.cv &&
      router.query.el &&
      router.query.ev
    )
      requestTitleSelect(selectedTitle);
  }, [selectedTitle, titles]);

  const SelectCategoryProps: SelectAddProps = {
    selectOption: {
      placeholder: '카테고리명',
      options: categories,
      onSelect: (value, option) => requestCategorySelect(option),
      value: selectedCategory?.value || null,
    },
    inputOption: {
      placeholder: '카테고리명',
      value: categoryName,
      onChange: onChangeCategoryName,
    },
    createButtonOption: {
      onClick: requestCreateCategory,
      loading: createCategoryLoading,
      children: '등록',
    },
    editButtonOption: {
      onClick: () => openEditModal('category'),
      loading: editCategoryLoading,
      children: '수정',
    },
    deleteButtonOption: {
      onClick: requestDeleteCategory,
      loading: deleteCategoryLoading,
      children: '삭제',
    },
    isLoading: readCategoriesLoading,
  };
  const SelectTitleProps: SelectAddProps = {
    selectOption: {
      disabled: !selectedCategory,
      placeholder: '시험명',
      options: titles,
      onSelect: (value, option) => requestTitleSelect(option),
      value: selectedTitle?.value || null,
    },
    inputOption: {
      placeholder: '시험명',
      value: examTitle,
      onChange: onChangeExamTitle,
    },
    createButtonOption: {
      onClick: requestCreateTitlte,
      loading: createExamLoading,
      children: '등록',
    },
    editButtonOption: {
      onClick: () => openEditModal('exam'),
      loading: editExamLoading,
      children: '수정',
    },
    deleteButtonOption: {
      onClick: requestDeleteExam,
      loading: deleteExamLoading,
      children: '삭제',
    },
    isLoading: readTitlesLoading,
  };
  const onSubmit = async (data: CreateMockExamQuestionInput) => {
    try {
      setCreateQuestionLoading(true);
      if (!selectedTitle) {
        return message.error('시험을 선택해주세요.');
      }
      const res = await createQuestion({
        variables: {
          input: {
            label: data.label,
            mockExamId: selectedTitle.value as number,
            question: data.question,
            solution: data.solution,
            number: selectedQuestionNumber,
            question_img: questionImage as MockExamQuestionImageInputType[],
            solution_img: solutionImage as MockExamQuestionImageInputType[],
          },
        },
      });
      if (res.data?.createMockExamQuestion.ok) {
        const numbersQuery = await refetchReadQuestionNumbers();
        if (numbersQuery.data.readMockExamQuestionNumbers.ok) {
          const { questionNumbers } =
            numbersQuery.data.readMockExamQuestionNumbers;
          setQuestionNumbers(questionNumbers);

          setSelectedQuestionNumber(findBlankQuestionNumber(questionNumbers));
        }
        message.success('문제가 등록되었습니다.');
        // 초기화
        methods.reset();
        setQuestionImage([]);
        setSolutionImage([]);
        return;
      }
      return message.error(res.data?.createMockExamQuestion.error);
    } catch (e) {
      handleError(e);
    } finally {
      setCreateQuestionLoading(false);
    }
  };

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
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <QuestionAndSolutionForm
            questionImage={questionImage}
            setQuestionImage={setQuestionImage}
            solutionImage={solutionImage}
            setSolutionImage={setSolutionImage}
            questionNumbers={questionNumbers}
            setQuestionNumbers={setQuestionNumbers}
            selectedQuestionNumber={selectedQuestionNumber}
            examStatus={examStatus}
            setExamStatus={setExamStatus}
            onToggleExamPreviewModal={onToggleExamPreviewModal}
            createQuestionLoading={createQuestionLoading}
            examId={
              typeof selectedTitle?.value === 'number' ? selectedTitle.value : 0
            }
          />
        </form>
      </FormProvider>
      <Portal>
        {examPreviewModal && (
          <ExamPreviewModal
            open={examPreviewModal}
            onClose={onToggleExamPreviewModal}
            examId={
              typeof selectedTitle?.value === 'number' ? selectedTitle.value : 0
            }
            categoryName={
              typeof selectedCategory?.label === 'string'
                ? selectedCategory?.label
                : ''
            }
            examTitle={
              typeof selectedTitle?.label === 'string'
                ? selectedTitle?.label
                : ''
            }
          />
        )}
        <EditNameModal
          open={editCategoryNameModal}
          onClose={onToggleEditCategoryNameModal}
          onConfirm={(value: string) => {
            requestEditCategory(value);
            setCategoryName(value);
            return;
          }}
          defaultValue={categoryName}
        />
        <EditNameModal
          open={editExamTitleModal}
          onClose={onToggleEditExamTitleModal}
          onConfirm={(value: string) => {
            requestEditTitle(value);
            setExamTitle(value);
            return;
          }}
          defaultValue={examTitle}
        />
        <CreateExamFeedbackModal
          open={feedbackModalState}
          onClose={onToggleFeedbackModal}
        />
      </Portal>
      {isNotLoggedIn && <Dimmed content="로그인 후 이용해주세요." />}
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
    margin-top: 10px;
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
    color: ${({ theme }) => theme.color('colorTextTertiary')};
  }
`;
