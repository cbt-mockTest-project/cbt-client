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
import { ExamTitleAndId, UserRole } from 'types';
import MainComponent from '@components/main/MainComponent';
import styled from 'styled-components';
import { responsive } from '@lib/utils/responsive';
import { cloneDeep } from 'lodash';

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
      <HomeContainer
        mainBanner={true}
        subNav="main"
        className="layout-component"
      >
        <MainComponent
          categoriesQuery={categoriesQuery}
          titlesAndCategories={titlesAndCategories}
          examLinks={examLinks}
        />
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
            authorRole: category.user.role,
            titles,
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
      return 1;
    }
    return 0;
  });
  return addApolloState(apolloClient, {
    props: { categoriesQuery, titlesAndCategories, examLinks },
    revalidate: 43200,
  });
};
