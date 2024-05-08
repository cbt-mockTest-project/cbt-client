import WithHead from '@components/common/head/WithHead';
import HomeComponent from '@components/home/HomeComponent';
import HomeCore from '@components/home/HomeCore';
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
      <HomeCore />
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

      const ModuCategoriesSortedByLikes = [...moduCategories].sort(
        (a, b) => b.categoryEvaluations.length - a.categoryEvaluations.length
      );
      const ModuCategoriesSortedByCreatedAt = [...moduCategories]
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .map((category) => ({
          ...category,
          isNew: true,
        }));
      const EhsCategoriesSortedByLikes = [...ehsCategories].sort(
        (a, b) => b.categoryEvaluations.length - a.categoryEvaluations.length
      );

      store.dispatch(
        homeActions.setModuStorageCategories({
          categories: [
            ...ModuCategoriesSortedByCreatedAt.slice(0, 2),
            ...ModuCategoriesSortedByLikes,
          ] as MockExamCategory[],
        })
      );
      store.dispatch(
        homeActions.setEhsStorageCategories({
          categories: EhsCategoriesSortedByLikes as MockExamCategory[],
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
