import WithHead from '@components/common/head/WithHead';
import HomeComponent from '@components/home/HomeComponent';
import { MAIN_PAGE } from '@lib/constants/displayName';
import { GET_EXAM_CATEGORIES } from '@lib/graphql/query/examQuery';
import { GetExamCategoriesQuery } from '@lib/graphql/query/examQuery.generated';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { homeActions } from '@modules/redux/slices/home';
import wrapper from '@modules/redux/store/configureStore';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import { ExamSource, GetExamCategoriesInput, MockExamCategory } from 'types';

const HomeNoti = dynamic(() => import('@components/home/HomeNoti'), {
  ssr: false,
});

interface Props {}

const IndexPage: React.FC<Props> = () => {
  return (
    <>
      <WithHead
        title="모두CBT | 암기짱 공유 서비스"
        pageHeadingTitle="모두CBT 서비스 메인페이지"
      />
      <HomeComponent />
      <HomeNoti />
    </>
  );
};

IndexPage.displayName = MAIN_PAGE;

export default IndexPage;

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    try {
      const apolloClient = initializeApollo({}, '');
      const getCategories = (input: GetExamCategoriesInput) =>
        apolloClient
          .query<GetExamCategoriesQuery>({
            query: GET_EXAM_CATEGORIES,
            variables: {
              input,
            },
          })
          .then((res) => res.data.getExamCategories.categories || []);
      let [moduCategories, userCategories, ehsCategories] = await Promise.all([
        getCategories({
          examSource: ExamSource.MoudCbt,
          limit: 30,
        }),
        getCategories({
          examSource: ExamSource.User,
          limit: 30,
        }),
        getCategories({
          examSource: ExamSource.EhsMaster,
          limit: 30,
        }),
      ]);

      const sortedUserCategories = [...userCategories].sort(
        (a, b) => b.categoryEvaluations.length - a.categoryEvaluations.length
      );
      const sortedModuCategories = [...moduCategories].sort(
        (a, b) => b.categoryEvaluations.length - a.categoryEvaluations.length
      );
      const sortedEhsCategories = [...ehsCategories].sort(
        (a, b) => b.categoryEvaluations.length - a.categoryEvaluations.length
      );
      store.dispatch(
        homeActions.setModuStorageCategories({
          categories: sortedModuCategories as MockExamCategory[],
        })
      );
      store.dispatch(
        homeActions.setEhsStorageCategories({
          categories: sortedEhsCategories as MockExamCategory[],
        })
      );
      store.dispatch(
        homeActions.setUserStorageCategories({
          categories: sortedUserCategories as MockExamCategory[],
        })
      );

      return addApolloState(apolloClient, {
        revalidate: 60,
      });
    } catch (e) {
      console.log(e);
    }
  }
);
