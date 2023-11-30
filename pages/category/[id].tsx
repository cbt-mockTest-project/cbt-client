import CategoryComponent from '@components/category/CategoryComponent';
import WithHead from '@components/common/head/WithHead';
import Layout02 from '@components/common/layout/Layout02';
import {
  READ_EXAM_CATEGORY_BY_ID,
  READ_EXAM_CATEGORY_IDS,
} from '@lib/graphql/user/query/examQuery';
import {
  ReadMockExamCategoryByCategoryIdQuery,
  ReadMockExamCategoryIdsQuery,
} from '@lib/graphql/user/query/examQuery.generated';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import { MockExamCategory } from 'types';

interface CategoryPageProps {
  category: MockExamCategory;
}

const CategoryPage: NextPage<CategoryPageProps> = ({ category }) => {
  return (
    <>
      <WithHead
        title="모두CBT | 국가고시 실기시험 부시기!"
        pageHeadingTitle="모두CBT 서비스 메인페이지"
      />
      <Layout02 title={category?.name}>
        {category && <CategoryComponent category={category} />}
      </Layout02>
    </>
  );
};
export default CategoryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo({}, '');
  let paths: { params: { id: string } }[] = [];
  try {
    const res = await apolloClient.query<ReadMockExamCategoryIdsQuery>({
      query: READ_EXAM_CATEGORY_IDS,
    });
    if (res.data.readMockExamCategoryIds.ids) {
      paths = res.data.readMockExamCategoryIds.ids.map((el) => ({
        params: { id: String(el) },
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
  try {
    const apolloClient = initializeApollo({}, '');
    const categoryId = context.params?.id;
    if (!categoryId) {
      return {
        notFound: true,
      };
    }
    const res = await apolloClient.query<ReadMockExamCategoryByCategoryIdQuery>(
      {
        query: READ_EXAM_CATEGORY_BY_ID,
        variables: {
          input: {
            id: Number(categoryId),
          },
        },
      }
    );
    if (!res.data.readMockExamCategoryByCategoryId.ok) {
      return {
        notFound: true,
      };
    }
    const category = res.data.readMockExamCategoryByCategoryId.category;
    if (!category) {
      return {
        notFound: true,
      };
    }
    return addApolloState(apolloClient, {
      props: { category },
      revalidate: 43200,
    });
  } catch {
    return {
      notFound: true,
    };
  }
};
