import React, { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Layout from '@components/common/layout/Layout';
import { addApolloState, initializeApollo, useApollo } from '@modules/apollo';
import {
  ReadAllQuestionsQuery,
  ReadMockExamQuestionQuery,
} from '@lib/graphql/user/query/questionQuery.generated';
import {
  READ_QUESTION,
  READ_ALL_QUESTIONS,
} from '@lib/graphql/user/query/questionQuery';
import WithHead from '@components/common/head/WithHead';
import GoogleAd from '@components/common/ad/GoogleAd';
import QuestionComponent from '@components/question/QuestionComponent';
import parse from 'html-react-parser';
import { removeHtmlTag } from '@lib/utils/utils';

interface QuestionProps {
  questionQuery: ReadMockExamQuestionQuery;
}

const Question: NextPage<QuestionProps> = ({ questionQuery }) => {
  const title = removeHtmlTag(
    questionQuery.readMockExamQuestion.mockExamQusetion?.question.slice(0, 50)
  );
  const googlePlaced =
    typeof document !== 'undefined'
      ? document.querySelector('.google-auto-placed')
      : null;
  useEffect(() => {
    if (googlePlaced) {
      googlePlaced.remove();
    }
  }, [googlePlaced]);
  return (
    <>
      <WithHead
        title={`${title} | 모두CBT`}
        pageHeadingTitle={`${title} 상세 페이지`}
      />
      <Layout>
        <QuestionComponent questionQuery={questionQuery} />
      </Layout>
    </>
  );
};

export default Question;

export const getStaticPaths: GetStaticPaths = async (context) => {
  const apolloClient = initializeApollo({}, '');
  let paths: { params: { Id: string } }[] = [];
  try {
    const res = await apolloClient.query<ReadAllQuestionsQuery>({
      query: READ_ALL_QUESTIONS,
    });
    if (res.data.readAllQuestions.questions) {
      paths = res.data.readAllQuestions.questions.map((el) => ({
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
  const questionQuery = res ? res.data : null;
  return addApolloState(apolloClient, {
    props: { questionQuery },
    revalidate: 43200,
  });
};
