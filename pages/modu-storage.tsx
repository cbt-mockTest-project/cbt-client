import Layout02 from '@components/common/layout/Layout02';
import ModuStorageComponent from '@components/moduStorage/ModuStorageComponent';
import { READ_EXAM_CATEGORIES_QUERY } from '@lib/graphql/user/query/examQuery';
import { ReadAllMockExamCategoriesQuery } from '@lib/graphql/user/query/examQuery.generated';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { GetStaticProps, NextPage } from 'next';
import { MockExamCategory } from 'types';
import React from 'react';
import WithHead from '@components/common/head/WithHead';

interface ModuStorageProps {
  categories: MockExamCategory[];
}

const ModuStorage: NextPage<ModuStorageProps> = ({ categories }) => {
  return (
    <>
      <WithHead
        title="모두CBT | 모두 저장소"
        pageHeadingTitle="모두CBT 서비스 모두 저장소 페이지"
      />
      <Layout02>
        <ModuStorageComponent categories={categories} />
      </Layout02>
    </>
  );
};

export default ModuStorage;

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const apolloClient = initializeApollo({}, '');

    const res = await apolloClient.query<ReadAllMockExamCategoriesQuery>({
      query: READ_EXAM_CATEGORIES_QUERY,
    });
    const categories = res.data.readAllMockExamCategories.categories;

    if (!categories) {
      return {
        notFound: true,
      };
    }

    return addApolloState(apolloClient, {
      props: { categories },
      revalidate: 43200,
    });
  } catch {
    return {
      notFound: true,
    };
  }
};
