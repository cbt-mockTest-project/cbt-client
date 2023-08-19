import React from 'react';
import { addApolloState, initializeApollo } from '@modules/apollo';
import {
  READ_EXAM_CATEGORIES_QUERY,
  READ_EXAM_TITLES_QUERY,
} from '@lib/graphql/user/query/examQuery';
import Layout from '@components/common/layout/Layout';
import { GetStaticProps, NextPage } from 'next';
import WithHead from '@components/common/head/WithHead';
import {
  ReadAllMockExamCategoriesQuery,
  ReadMockExamTitlesByCateoryQuery,
} from '@lib/graphql/user/query/examQuery.generated';
import { ExamTitleAndId } from 'types';
import MainComponent from '@components/main/MainComponent';
import styled from 'styled-components';
import { responsive } from '@lib/utils/responsive';
import { cloneDeep } from 'lodash';
import RecentNotice from '@components/main/RecentNotice';

interface TitlesAndCategories {
  category: string;
  titles: ExamTitleAndId[];
}
interface HomeProps {
  categoriesQuery: ReadAllMockExamCategoriesQuery;
  titlesAndCategories: TitlesAndCategories[];
}

const Home: NextPage<HomeProps> = ({
  categoriesQuery,
  titlesAndCategories,
}) => {
  return (
    <>
      <WithHead
        title="나눔cbt | nanumcbt"
        pageHeadingTitle="나눔cbt 페이지 | nunumcbt"
      />
      <HomeContainer
        mainBanner={true}
        subNav="main"
        className="layout-component"
      >
        <MainComponent
          categoriesQuery={categoriesQuery}
          titlesAndCategories={titlesAndCategories}
        />
        <RecentNotice />
      </HomeContainer>
    </>
  );
};
export default Home;

const HomeContainer = styled(Layout)`
  @media (max-width: ${responsive.medium}) {
  }
`;

export const getStaticProps: GetStaticProps = async (context) => {
  const apolloClient = initializeApollo({}, '');

  const titlesAndCategories: TitlesAndCategories[] = [];

  const categoriesRes =
    await apolloClient.query<ReadAllMockExamCategoriesQuery>({
      query: READ_EXAM_CATEGORIES_QUERY,
    });

  const categoriesQuery = categoriesRes?.data;
  if (categoriesQuery)
    await Promise.all(
      categoriesQuery?.readAllMockExamCategories.categories.map(
        async (category) => {
          const res =
            await apolloClient.query<ReadMockExamTitlesByCateoryQuery>({
              query: READ_EXAM_TITLES_QUERY,
              variables: {
                input: {
                  name: category.name,
                },
              },
            });
          let titles: ExamTitleAndId[] =
            res.data.readMockExamTitlesByCateory.titles;
          if (category.name === '산업안전기사실기(필답형)') {
            titles = cloneDeep(res.data.readMockExamTitlesByCateory.titles);
            titles.sort((a, b) => {
              if (a.id === 167) {
                return -1;
              }
              return 1;
            });
          }
          titlesAndCategories.push({
            category: category.name,
            titles,
          });
        }
      )
    );

  return addApolloState(apolloClient, {
    props: { categoriesQuery, titlesAndCategories },
    revalidate: 43200,
  });
};
