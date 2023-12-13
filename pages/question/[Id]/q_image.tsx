import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { ReadMockExamQuestionQuery } from '@lib/graphql/query/questionQuery.generated';
import { READ_QUESTION } from '@lib/graphql/query/questionQuery';
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

export const getServerSideProps: GetServerSideProps = async (context) => {
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
  });
};
