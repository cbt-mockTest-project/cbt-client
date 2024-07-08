import ModuStorageComponent from '../../app/_components/moduStorage/ModuStorageComponent';
import { GET_EXAM_CATEGORIES } from '../../app/_lib/graphql/query/examQuery';
import { GetExamCategoriesQuery } from '../../app/_lib/graphql/query/examQuery.generated';
import { addApolloState, initializeApollo } from '../../app/_modules/apollo';
import { GetStaticProps, NextPage } from 'next';
import { ExamSource, MockExamCategory } from '../../app/types';
import React from 'react';
import WithHead from '../../app/_components/common/head/WithHead';
import wrapper from '../../app/_modules/redux/store/configureStore';
import { storageActions } from '../../app/_modules/redux/slices/storage';

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
      throw new Error('No data returned from the query');
    }
    store.dispatch(
      storageActions.setPremiumStorageCategories({
        categories: categories as MockExamCategory[],
      })
    );
    return addApolloState(apolloClient, {});
  }
);
