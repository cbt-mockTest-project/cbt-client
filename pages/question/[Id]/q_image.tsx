import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Layout from '@components/common/layout/Layout';
import { addApolloState, initializeApollo } from '@modules/apollo';
import {
  ReadAllQuestionsQuery,
  ReadMockExamQuestionQuery,
} from '@lib/graphql/user/query/questionQuery.generated';
import {
  READ_QUESTION,
  READ_ALL_QUESTIONS,
} from '@lib/graphql/user/query/questionQuery';
import WithHead from '@components/common/head/WithHead';
import { Image } from 'antd';

interface QuestionImageProps {
  questionImageUrl: string;
}

const QuestionImage: NextPage<QuestionImageProps> = ({ questionImageUrl }) => {
  return (
    <>
      <WithHead
        title={`모두CBT-문제이미지`}
        pageHeadingTitle={`모두CBT-문제이미지`}
        image={questionImageUrl}
      />
      <Image src={questionImageUrl} alt="문제이미지" />
    </>
  );
};

export default QuestionImage;

export const getStaticPaths: GetStaticPaths = async (context) => {
  const apolloClient = initializeApollo({}, '');
  let paths: { params: { Id: string } }[] = [];
  try {
    const res = await apolloClient.query<ReadAllQuestionsQuery>({
      query: READ_ALL_QUESTIONS,
    });
    if (res.data.readAllQuestions.questions) {
      paths = res.data.readAllQuestions.questions
        .filter((el) => el.question_img && el.question_img?.length >= 1)
        .map((el) => ({
          params: { Id: String(el.id) },
        }));
    }
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
  const apolloClient = initializeApollo({}, '');
  const res = await apolloClient.query<ReadMockExamQuestionQuery>({
    query: READ_QUESTION,
    variables: {
      input: {
        questionId: Number(context.params?.Id),
      },
    },
  });
  const questionImageUrl = res.data.readMockExamQuestion.mockExamQusetion
    ?.question_img
    ? res.data.readMockExamQuestion.mockExamQusetion?.question_img[0]?.url
    : '';
  if (!questionImageUrl) {
    return {
      notFound: true,
    };
  }
  return addApolloState(apolloClient, {
    props: { questionImageUrl },
    revalidate: 43200,
  });
};
