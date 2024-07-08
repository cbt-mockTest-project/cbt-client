import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { ReadMockExamQuestionQuery } from '@lib/graphql/query/questionQuery.generated';
import { READ_QUESTION } from '@lib/graphql/query/questionQuery';
import WithHead from '@components/common/head/WithHead';
import { Image } from 'antd';
import { apolloClient } from '@modules/apollo';

interface SolutionImageProps {
  solutionImageUrl: string;
}

const SolutionImage: NextPage<SolutionImageProps> = ({ solutionImageUrl }) => {
  return (
    <>
      <WithHead
        title={`모두CBT-정답이미지`}
        pageHeadingTitle={`모두CBT-정답이미지`}
        image={solutionImageUrl}
      />
      <Image src={solutionImageUrl} alt="정답이미지" />
    </>
  );
};

export default SolutionImage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params?.Id) {
    return {
      notFound: true,
    };
  }
  const res = await apolloClient.query<ReadMockExamQuestionQuery>({
    query: READ_QUESTION,
    variables: {
      input: {
        questionId: Number(context.params?.Id),
      },
    },
  });
  const solutionImageUrl = res.data.readMockExamQuestion.mockExamQusetion
    ?.solution_img
    ? res.data.readMockExamQuestion.mockExamQusetion?.solution_img[0]?.url
    : '';
  if (!solutionImageUrl) {
    return {
      notFound: true,
    };
  }
  return {
    props: { solutionImageUrl },
  };
};
