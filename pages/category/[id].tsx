import CategoryComponent from '@components/category/CategoryComponent';
import WithHead from '@components/common/head/WithHead';
import {
  READ_EXAM_CATEGORY_BY_ID,
  READ_EXAM_CATEGORY_IDS,
} from '@lib/graphql/user/query/examQuery';
import {
  ReadMockExamCategoryByCategoryIdQuery,
  ReadMockExamCategoryIdsQuery,
} from '@lib/graphql/user/query/examQuery.generated';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { examCategoryActions } from '@modules/redux/slices/examCategory';
import wrapper from '@modules/redux/store/configureStore';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import { MockExamCategory, ReadMockExamCategoryByCategoryIdInput } from 'types';

interface CategoryPageProps {
  categoryQueryInput: ReadMockExamCategoryByCategoryIdInput;
}

const CategoryPage: NextPage<CategoryPageProps> = ({ categoryQueryInput }) => {
  return (
    <>
      <WithHead
        title="모두CBT | 국가고시 실기시험 부시기!"
        pageHeadingTitle="모두CBT 서비스 메인페이지"
      />
      <CategoryComponent categoryQueryInput={categoryQueryInput} />
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

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    try {
      const apolloClient = initializeApollo({}, '');
      const categoryId = context.params?.id;
      if (!categoryId) {
        return {
          notFound: true,
          revalidate: 1,
        };
      }
      const categoryQueryInput: ReadMockExamCategoryByCategoryIdInput = {
        id: Number(categoryId),
      };
      const res =
        await apolloClient.query<ReadMockExamCategoryByCategoryIdQuery>({
          query: READ_EXAM_CATEGORY_BY_ID,
          variables: {
            input: categoryQueryInput,
          },
        });
      if (!res.data.readMockExamCategoryByCategoryId.ok) {
        return {
          notFound: true,
          revalidate: 1,
        };
      }
      const category = res.data.readMockExamCategoryByCategoryId.category;
      store.dispatch(
        examCategoryActions.setCategory({
          category: category as MockExamCategory,
        })
      );
      return addApolloState(apolloClient, {
        props: { categoryQueryInput, category },
        revalidate: 43200,
      });
    } catch {
      return {
        notFound: true,
        revalidate: 1,
      };
    }
  }
);
