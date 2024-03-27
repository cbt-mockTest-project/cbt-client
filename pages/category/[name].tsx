import CategoryComponent from '@components/category/CategoryComponent';
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
import dynamic from 'next/dynamic';
import React from 'react';
import { resetServerContext } from 'react-beautiful-dnd';
import { MockExamCategory, ReadMockExamCategoryByCategoryIdInput } from 'types';

const CategoryNoti = dynamic(
  () => import('@components/category/CategoryNoti'),
  {
    ssr: false,
  }
);
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
        title={category.name + ' | 모두CBT'}
        pageHeadingTitle={`${category.name} 페이지`}
        description={category.description}
      />
      {isExistedCategory && (
        <CategoryComponent categoryQueryInput={categoryQueryInput} />
      )}
      <CategoryNoti category={category} />
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
    if (res.data.readMockExamCategoryNames.names) {
      paths = res.data.readMockExamCategoryNames.names.map((el) => ({
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
    try {
      const apolloClient = initializeApollo({}, '');
      const categoryName = context.params?.name;
      if (!categoryName || typeof categoryName !== 'string') {
        console.log('categoryName is undefined');
        return;
      }
      const categoryQueryInput: ReadMockExamCategoryByCategoryIdInput = {
        name: categoryName,
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
      resetServerContext();
      return addApolloState(apolloClient, {
        props: { categoryQueryInput, category },
        revalidate: 43200,
      });
    } catch (e) {
      console.log(e);
      return {
        notFound: true,
        revalidate: 1,
      };
    }
  }
);
