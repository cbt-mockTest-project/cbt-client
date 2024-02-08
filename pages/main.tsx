import WithHead from '@components/common/head/WithHead';
import HomeComponent from '@components/home/HomeComponent';
import { MAIN_PAGE } from '@lib/constants/displayName';
import { LAST_VISITED_CATEGORY } from '@lib/constants/localStorage';
import { IS_FIRST_VISIT } from '@lib/constants/sessionStorage';
import { GET_EXAM_CATEGORIES } from '@lib/graphql/query/examQuery';
import { GetExamCategoriesQuery } from '@lib/graphql/query/examQuery.generated';
import { LocalStorage } from '@lib/utils/localStorage';
import { SessionStorage } from '@lib/utils/sessionStorage';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { homeActions } from '@modules/redux/slices/home';
import wrapper from '@modules/redux/store/configureStore';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { ExamSource, GetExamCategoriesInput, MockExamCategory } from 'types';

interface Props {}

const IndexPage: React.FC<Props> = () => {
  const sesionStorage = new SessionStorage();
  const localStorage = new LocalStorage();
  const router = useRouter();
  useEffect(() => {
    if (!sesionStorage.get(IS_FIRST_VISIT)) {
      sesionStorage.set(IS_FIRST_VISIT, 'true');
      if (localStorage.get(LAST_VISITED_CATEGORY)) {
        router.push(localStorage.get(LAST_VISITED_CATEGORY));
      }
    }
  }, []);
  return (
    <>
      <WithHead
        title="모두CBT | 암기장 공유 서비스"
        pageHeadingTitle="모두CBT 서비스 메인페이지"
      />
      <HomeComponent />
    </>
  );
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
      const [moduCategories, userCategories, ehsCategories] = await Promise.all(
        [
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
          getCategories({
            examSource: ExamSource.EhsMaster,
            limit: 30,
          }),
        ]
      );
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
      store.dispatch(
        homeActions.setEhsStorageCategories({
          categories: ehsCategories as MockExamCategory[],
        })
      );

      return addApolloState(apolloClient, {
        revalidate: 60 * 60 * 24,
      });
    } catch (e) {
      return {
        revalidate: 1,
        notFound: true,
      };
    }
  }
);
