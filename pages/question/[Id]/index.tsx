import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import WithHead from '@components/common/head/WithHead';
import QuestionComponent from '@components/question/QuestionComponent';
import { removeHtmlTag } from '@lib/utils/utils';
import { ExamType, ReadMockExamQuestionInput } from 'types';
import { QUESTION_PAGE } from '@lib/constants/displayName';
import GoogleAd from '@components/common/ad/GoogleAd';
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from '@tanstack/react-query';
import {
  getQuestionKey,
  getQuestionQueryOption,
} from '@lib/queryOptions/getQuestionQueryOption';
import ObjectiveQuestionComponent from '@components/question/ObjectiveQuestionComponent';

interface QuestionProps {
  title: string;
  description: string;
  questionQueryInput: ReadMockExamQuestionInput;
  dehydratedState: DehydratedState;
  noIndex: boolean;
}

const Question: NextPage<QuestionProps> = ({
  questionQueryInput,
  title,
  description,
  dehydratedState,
}) => {
  const { data: questionResponse } = useQuery(
    getQuestionQueryOption({
      queryKey: getQuestionKey(questionQueryInput.questionId) as string[],
      input: questionQueryInput,
    })
  );
  const question = questionResponse?.mockExamQusetion;
  const isObjective = question?.mockExam.examType === ExamType.Objective;
  return (
    <HydrationBoundary state={dehydratedState}>
      <WithHead
        title={`${title} | 모두CBT`}
        pageHeadingTitle={`${title} 상세 페이지`}
        description={description}
      />
      <GoogleAd />
      {isObjective ? (
        <ObjectiveQuestionComponent questionResponse={questionResponse} />
      ) : (
        <QuestionComponent questionQueryInput={questionQueryInput} />
      )}
    </HydrationBoundary>
  );
};

Question.displayName = QUESTION_PAGE;

export default Question;

export const getStaticPaths: GetStaticPaths = async (context) => {
  let paths: { params: { Id: string } }[] = [];
  try {
    return { paths, fallback: 'blocking' };
  } catch (err) {
    return {
      paths,
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params?.Id) {
    return {
      notFound: true,
    };
  }
  const questionQueryInput: ReadMockExamQuestionInput = {
    questionId: Number(context.params?.Id),
  };

  const queryClient = new QueryClient();
  const queryKey = getQuestionKey(questionQueryInput.questionId);
  const questionResponse = await queryClient.fetchQuery(
    getQuestionQueryOption({
      queryKey: queryKey as string[],
      input: questionQueryInput,
    })
  );
  const question = questionResponse?.mockExamQusetion;
  const title = removeHtmlTag((question.question || '').slice(0, 50));

  const description = removeHtmlTag(
    (question.question || '') + (question.solution || '')
  );
  if (description.trim().length === 0) return { notFound: true };
  const dehydratedState = dehydrate(queryClient);
  return {
    props: {
      title,
      description,
      questionQueryInput,
      dehydratedState,
    },
    revalidate: 86400,
  };
};
