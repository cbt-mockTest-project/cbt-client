import React from 'react';
import { addApolloState, initializeApollo } from '@modules/apollo';
import {
  READ_EXAM_CATEGORIES_QUERY,
  READ_EXAM_TITLES_QUERY,
} from '@lib/graphql/user/query/examQuery';
import Layout from '@components/common/layout/Layout';
import { GetStaticProps } from 'next';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';

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
import RandomSelectComponent from '@components/exam/randomselect/RandomSelectComponent';
import { DefaultOptionType } from 'antd/lib/select';

interface TitlesAndCategories {
  category: string;
  titles: ExamTitleAndId[];
  authorRole: UserRole;
}

export interface Categories extends DefaultOptionType {
  authorRole: UserRole;
}

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

  const categories = categoriesQuery?.readAllMockExamCategories.categories.map(
    (el) => ({ value: el.name, label: el.name, authorRole: el.user.role })
  );

  return addApolloState(apolloClient, {
    props: { categories, titlesAndCategories },
    revalidate: 43200,
  });
};