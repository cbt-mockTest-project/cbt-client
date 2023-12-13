import React from 'react';
import { addApolloState, initializeApollo } from '@modules/apollo';
import {
  READ_EXAM_CATEGORIES_QUERY,
  READ_EXAM_TITLES_QUERY,
} from '@lib/graphql/query/examQuery';
import Layout from '@components/common/layout/Layout';
import { GetStaticProps } from 'next';
import WithHead from '@components/common/head/WithHead';
import {
  ReadAllMockExamCategoriesQuery,
  ReadMockExamTitlesByCateoryQuery,
} from '@lib/graphql/query/examQuery.generated';
import { ExamTitleAndId, UserRole } from 'types';
import styled from 'styled-components';
import { cloneDeep } from 'lodash';
import RandomSelectComponent from '@components/exam/randomselect/RandomSelectComponent';
import { DefaultOptionType } from 'antd/lib/select';
import GoogleAd from '@components/common/ad/GoogleAd';

interface TitlesAndCategories {
  category: string;
  titles: ExamTitleAndId[];
}

export interface Categories extends DefaultOptionType {}

interface RandomSelectPageProps {
  categories: Categories[];
  titlesAndCategories: TitlesAndCategories[];
}

const RandomSelectPage: React.FC<RandomSelectPageProps> = ({
  categories,
  titlesAndCategories,
}) => {
  return (
    <>
      <WithHead
        title="모두CBT | 랜덤모의고사 선택"
        pageHeadingTitle="모두CBT 랜덤모의고사 선택 페이지"
      />
      <RandomSelectPageContainer>
        <RandomSelectComponent
          categories={categories}
          titlesAndCategories={titlesAndCategories}
        />
      </RandomSelectPageContainer>
    </>
  );
};

export default RandomSelectPage;

const RandomSelectPageContainer = styled(Layout)`
  height: 100%;
  position: relative;
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

  const categories = categoriesQuery?.readAllMockExamCategories.categories.map(
    (el) => ({ value: el.name, label: el.name })
  );

  return addApolloState(apolloClient, {
    props: { categories, titlesAndCategories },
    revalidate: 43200,
  });
};
