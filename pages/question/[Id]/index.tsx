import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { ReadMockExamQuestionQuery } from '@lib/graphql/query/questionQuery.generated';
import { READ_QUESTION } from '@lib/graphql/query/questionQuery';
import WithHead from '@components/common/head/WithHead';
import QuestionComponent from '@components/question/QuestionComponent';
import { removeHtmlTag } from '@lib/utils/utils';
import { OperationVariables, QueryOptions } from '@apollo/client';
import { ReadMockExamQuestionInput } from 'types';
import { QUESTION_PAGE } from '@lib/constants/displayName';

interface QuestionProps {
  title: string;
  description: string;
  questionQueryInput: ReadMockExamQuestionInput;
}

const Question: NextPage<QuestionProps> = ({
  questionQueryInput,
  title,
  description,
}) => {
  return (
    <>
      <WithHead
        title={`${title} | 모두CBT`}
        pageHeadingTitle={`${title} 상세 페이지`}
        description={description}
      />
      <QuestionComponent questionQueryInput={questionQueryInput} />
    </>
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
      revalidate: 1,
    };
  }
  const apolloClient = initializeApollo({}, '');
  const questionQueryInput: ReadMockExamQuestionInput = {
    questionId: Number(context.params?.Id),
  };
  const res = await apolloClient.query<ReadMockExamQuestionQuery>({
    query: READ_QUESTION,
    variables: {
      input: questionQueryInput,
    },
  });
  const questionQuery = res ? res.data : null;
  const title = removeHtmlTag(
    (questionQuery.readMockExamQuestion.mockExamQusetion?.question || '').slice(
      0,
      50
    )
  );
  const description = removeHtmlTag(
    questionQuery.readMockExamQuestion.mockExamQusetion?.question || ''
  );
  return addApolloState(apolloClient, {
    props: { title, description, questionQueryInput },
    revalidate: 43200,
  });
};
