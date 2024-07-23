import React, { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import WithHead from '@components/common/head/WithHead';
import QuestionComponent from '@components/question/QuestionComponent';
import { removeHtmlTag } from '@lib/utils/utils';
import { ReadMockExamQuestionInput } from 'types';
import { QUESTION_PAGE } from '@lib/constants/displayName';
import GoogleAd from '@components/common/ad/GoogleAd';
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import {
  getQuestionKey,
  getQuestionQueryOption,
} from '@lib/queryOptions/getQuestionQueryOption';

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
  noIndex,
}) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <WithHead
        title={`${title} | 모두CBT`}
        pageHeadingTitle={`${title} 상세 페이지`}
        description={description}
        noIndex={noIndex}
      />
      <GoogleAd />
      <QuestionComponent questionQueryInput={questionQueryInput} />
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
  const question = await queryClient.fetchQuery(
    getQuestionQueryOption({
      queryKey: queryKey as string[],
      input: questionQueryInput,
    })
  );
  const title = removeHtmlTag((question.question || '').slice(0, 50));

  const description = removeHtmlTag(
    (question.question || '') + (question.solution || '')
  );
  const dehydratedState = dehydrate(queryClient);
  return {
    props: {
      title,
      description,
      questionQueryInput,
      dehydratedState,
      noIndex: !question.mockExam.approved,
    },
    revalidate: 86400,
  };
};
