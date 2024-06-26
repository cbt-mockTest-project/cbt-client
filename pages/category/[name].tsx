import CategoryComponent from '@components/category/CategoryComponent';
import CategoryCore from '@components/category/CategoryCore';
import WithHead from '@components/common/head/WithHead';
import {
  READ_EXAM_CATEGORY_BY_ID,
  READ_EXAM_CATEGORY_NAMES,
} from '@lib/graphql/query/examQuery';
import {
  ReadMockExamCategoryByCategoryIdQuery,
  ReadMockExamCategoryNamesQuery,
} from '@lib/graphql/query/examQuery.generated';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { examCategoryActions } from '@modules/redux/slices/examCategory';
import wrapper, { useAppSelector } from '@modules/redux/store/configureStore';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import { resetServerContext } from 'react-beautiful-dnd';
import { MockExamCategory, ReadMockExamCategoryByCategoryIdInput } from 'types';

interface CategoryPageProps {
  category: MockExamCategory;
  categoryQueryInput: ReadMockExamCategoryByCategoryIdInput;
}

const CategoryPage: NextPage<CategoryPageProps> = ({
  categoryQueryInput,
  category,
}) => {
  const isExistedCategory = useAppSelector(
    (state) => !!state.examCategory.category
  );
  return (
    <>
      <WithHead
        title={
          category.isPublic ? category.name : '암기장 공유서비스' + ' | 모두CBT'
        }
        pageHeadingTitle={`${category.name} 페이지`}
        description={category.description}
        noIndex={category.isPublic ? false : true}
      />
      {isExistedCategory && (
        <CategoryComponent categoryQueryInput={categoryQueryInput} />
      )}
      {isExistedCategory && (
        <CategoryCore categoryQueryInput={categoryQueryInput} />
      )}
    </>
  );
};
export default CategoryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo({}, '');
  let paths: { params: { name: string } }[] = [];
  try {
    const res = await apolloClient.query<ReadMockExamCategoryNamesQuery>({
      query: READ_EXAM_CATEGORY_NAMES,
    });
    if (res.data.readMockExamCategoryNames.urlSlugs) {
      paths = res.data.readMockExamCategoryNames.urlSlugs.map((el) => ({
        params: { name: String(el) },
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
    const apolloClient = initializeApollo({}, '');
    const urlSlug = context.params?.name;
    if (!urlSlug || typeof urlSlug !== 'string') {
      return {
        notFound: true,
      };
    }
    const categoryQueryInput: ReadMockExamCategoryByCategoryIdInput = {
      urlSlug,
    };
    const res = await apolloClient.query<ReadMockExamCategoryByCategoryIdQuery>(
      {
        query: READ_EXAM_CATEGORY_BY_ID,
        variables: {
          input: categoryQueryInput,
        },
      }
    );
    if (!res.data.readMockExamCategoryByCategoryId.ok) {
      throw new Error('No data returned from the query');
    }
    const category = res.data.readMockExamCategoryByCategoryId.category;
    store.dispatch(
      examCategoryActions.setCategory({
        category: category as MockExamCategory,
      })
    );
    resetServerContext();
    return addApolloState(apolloClient, {
      props: {
        categoryQueryInput: {
          ...categoryQueryInput,
          name: res.data.readMockExamCategoryByCategoryId.category.name,
        },
        category,
      },
      revalidate: 86400,
    });
  }
);
