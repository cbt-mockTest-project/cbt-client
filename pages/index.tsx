import React from 'react';
import { addApolloState, initializeApollo } from '@modules/apollo';
import {
  READ_EXAM_CATEGORIES_QUERY,
  READ_EXAM_TITLES_QUERY,
} from '@lib/graphql/user/query/examQuery';
import Layout from '@components/common/layout/Layout';
import { GetStaticProps, NextPage } from 'next';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';

import WithHead from '@components/common/head/WithHead';
import {
  ReadAllMockExamCategoriesQuery,
  ReadMockExamTitlesByCateoryQuery,
} from '@lib/graphql/user/query/examQuery.generated';
import { ExamTitleAndId, UserRole } from 'types';
import MainComponent from '@components/main/MainComponent';

interface TitlesAndCategories {
  category: string;
  titles: ExamTitleAndId[];
  authorRole: UserRole;
}
interface HomeProps {
  categoriesQuery: ReadAllMockExamCategoriesQuery;
  titlesAndCategories: TitlesAndCategories[];
  examLinks: ExamTitleAndId[];
}

const Home: NextPage<HomeProps> = ({
  categoriesQuery,
  titlesAndCategories,
  examLinks,
}) => {
  return (
    <>
      <WithHead
        title="모두CBT | 국가고시 실기시험 부시기!"
        pageHeadingTitle="모두CBT 서비스 메인페이지"
      />
      <Layout mainBanner={true}>
        <MainComponent
          categoriesQuery={categoriesQuery}
          titlesAndCategories={titlesAndCategories}
          examLinks={examLinks}
        />
      </Layout>
    </>
  );
};
export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const apolloClient = initializeApollo({}, '');
  const requestReadCategories = async () =>
    await apolloClient.query<ReadAllMockExamCategoriesQuery>({
      query: READ_EXAM_CATEGORIES_QUERY,
    });

  const requestReadExamTitles = async (category: string) =>
    await apolloClient.query<ReadMockExamTitlesByCateoryQuery>({
      query: READ_EXAM_TITLES_QUERY,
      variables: {
        input: {
          name: category,
        },
      },
    });
  const titlesAndCategories: TitlesAndCategories[] = [];

  const tryReadCategories = convertWithErrorHandlingFunc({
    callback: requestReadCategories,
  });

  const categoriesRes = await tryReadCategories();

  const categoriesQuery = categoriesRes?.data;
  if (categoriesQuery)
    await Promise.all(
      categoriesQuery?.readAllMockExamCategories.categories.map(
        async (category) => {
          const res = await requestReadExamTitles(category.name);
          titlesAndCategories.push({
            category: category.name,
            authorRole: category.user.role,
            titles: res.data.readMockExamTitlesByCateory.titles,
          });
        }
      )
    );
  const examLinks: ExamTitleAndId[] = [];
  titlesAndCategories.forEach((el) => {
    el.titles.forEach((title) => {
      examLinks.unshift(title);
    });
  });
  examLinks.sort((a, b) => {
    if (a.title.includes('산업안전기사실기(필답형)')) {
      return -1;
    }
    if (a.title.includes('산업안전산업기사')) {
      return -1;
    }
    return 0;
  });
  return addApolloState(apolloClient, {
    props: { categoriesQuery, titlesAndCategories, examLinks },
    revalidate: 43200,
  });
};
