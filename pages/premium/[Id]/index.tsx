import React from 'react';
import { addApolloState, initializeApollo } from '@modules/apollo';
import {
  READ_EXAM_CATEGORIES_QUERY,
  READ_EXAM_TITLES_QUERY,
} from '@lib/graphql/user/query/examQuery';
import Layout from '@components/common/layout/Layout';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import WithHead from '@components/common/head/WithHead';
import {
  ReadAllMockExamCategoriesQuery,
  ReadMockExamTitlesByCateoryQuery,
} from '@lib/graphql/user/query/examQuery.generated';
import { ExamTitleAndId, UserRole } from 'types';
import MainComponent from '@components/main/MainComponent';
import styled from 'styled-components';
import { responsive } from '@lib/utils/responsive';
import { GET_PARTNERS } from '@lib/graphql/user/query/partnerQuery';
import { GetPartnersQuery } from '@lib/graphql/user/query/partnerQuery.generated';

interface TitlesAndCategories {
  category: string;
  titles: ExamTitleAndId[];
}
interface HomeProps {
  categoriesQuery: ReadAllMockExamCategoriesQuery;
  titlesAndCategories: TitlesAndCategories[];
  examLinks: ExamTitleAndId[];
}

const Home: NextPage<HomeProps> = ({
  categoriesQuery,
  titlesAndCategories,
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
        />
      </HomeContainer>
    </>
  );
};
export default Home;

const HomeContainer = styled(Layout)`
  @media (max-width: ${responsive.medium}) {
    .sub-nav-container {
      display: none;
    }
  }
`;

export const getStaticPaths: GetStaticPaths = async (context) => {
  const apolloClient = initializeApollo({}, '');
  let paths: { params: { Id: string } }[] = [];
  try {
    const res = await apolloClient.query<GetPartnersQuery>({
      query: GET_PARTNERS,
    });
    if (res.data.getPartners.ok) {
      paths =
        res.data.getPartners.partners?.map((partner) => ({
          params: { Id: partner.id.toString() },
        })) || [];
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
  const apolloClient = initializeApollo({}, '');
  const partnerId = Number(context.params?.Id);
  const titlesAndCategories: TitlesAndCategories[] = [];
  const categoriesRes =
    await apolloClient.query<ReadAllMockExamCategoriesQuery>({
      query: READ_EXAM_CATEGORIES_QUERY,
      variables: {
        input: {
          partnerId,
        },
      },
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
