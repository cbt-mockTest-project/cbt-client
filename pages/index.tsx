import HomeComponent from '@components/home/HomeComponent';
import { MAIN_PAGE } from '@lib/constants/displayName';
import { GET_EXAM_CATEGORIES } from '@lib/graphql/query/examQuery';
import { GetExamCategoriesQuery } from '@lib/graphql/query/examQuery.generated';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { homeActions } from '@modules/redux/slices/home';
import wrapper from '@modules/redux/store/configureStore';
import { GetStaticProps } from 'next';
import React from 'react';
import { ExamSource, GetExamCategoriesInput, MockExamCategory } from 'types';

interface Props {}

const IndexPage: React.FC<Props> = () => {
  return <HomeComponent />;
};

IndexPage.displayName = MAIN_PAGE;

export default IndexPage;

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
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
      const [moduCategories, userCategories] = await Promise.all([
        getCategories({
          examSource: ExamSource.MoudCbt,
          limit: 30,
          isPublicOnly: true,
        }),
        getCategories({
          examSource: ExamSource.User,
          limit: 30,
          isPublicOnly: true,
        }),
      ]);
      store.dispatch(
        homeActions.setModuStorageCategories({
          categories: moduCategories as MockExamCategory[],
        })
      );
      store.dispatch(
        homeActions.setUserStorageCategories({
          categories: userCategories as MockExamCategory[],
        })
      );
      return addApolloState(apolloClient, {
        revalidate: 43200,
      });
    } catch (e) {
      return {
        revalidate: 1,
        notFound: true,
      };
    }
  }
);
