import ModuStorageComponent from '@components/moduStorage/ModuStorageComponent';
import { GET_EXAM_CATEGORIES } from '@lib/graphql/user/query/examQuery';
import { GetExamCategoriesQuery } from '@lib/graphql/user/query/examQuery.generated';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { GetStaticProps, NextPage } from 'next';
import { ExamSource, MockExamCategory } from 'types';
import React from 'react';
import WithHead from '@components/common/head/WithHead';
import wrapper from '@modules/redux/store/configureStore';
import { moduStorageActions } from '@modules/redux/slices/storage';

interface ModuStorageProps {}

const ModuStorage: NextPage<ModuStorageProps> = () => {
  return (
    <>
      <WithHead
        title="모두CBT | 모두 저장소"
        pageHeadingTitle="모두CBT 서비스 모두 저장소 페이지"
      />
      <ModuStorageComponent />
    </>
  );
};

export default ModuStorage;

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    try {
      const apolloClient = initializeApollo({}, '');
      const res = await apolloClient.query<GetExamCategoriesQuery>({
        query: GET_EXAM_CATEGORIES,
        variables: {
          input: {
            examSource: ExamSource.MoudCbt,
          },
        },
      });
      const categories = res.data.getExamCategories.categories;

      if (!categories) {
        return {
          notFound: true,
        };
      }
      store.dispatch(
        moduStorageActions.setCategories(categories as MockExamCategory[])
      );
      return addApolloState(apolloClient, {
        revalidate: 43200,
      });
    } catch {
      return {
        notFound: true,
      };
    }
  }
);
