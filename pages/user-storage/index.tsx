import { GET_EXAM_CATEGORIES } from '@lib/graphql/query/examQuery';
import { GetExamCategoriesQuery } from '@lib/graphql/query/examQuery.generated';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { GetStaticProps, NextPage } from 'next';
import { ExamSource, MockExamCategory, UserRole } from 'types';
import React from 'react';
import WithHead from '@components/common/head/WithHead';
import wrapper from '@modules/redux/store/configureStore';
import { storageActions } from '@modules/redux/slices/storage';
import StorageLayout from '@components/common/layout/storage/StorageLayout';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { StorageType } from 'customTypes';
import UserStorageComponent from '@components/userStorage/UserStorageComponent';

interface UserStorageProps {}

const UserStorage: NextPage<UserStorageProps> = () => {
  const { data: meQuery } = useMeQuery();
  return (
    <>
      <WithHead
        title="모두CBT | 모두 저장소"
        pageHeadingTitle="모두CBT 서비스 유저 저장소 페이지"
      />
      <StorageLayout
        hasOpenSaveCategoryModalButton={false}
        title="모두CBT 유저  암기장"
        storageType={StorageType.USER}
      >
        <UserStorageComponent />
      </StorageLayout>
    </>
  );
};

export default UserStorage;

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    const apolloClient = initializeApollo({}, '');
    const res = await apolloClient.query<GetExamCategoriesQuery>({
      query: GET_EXAM_CATEGORIES,
      variables: {
        input: {
          examSource: ExamSource.User,
        },
      },
    });
    const categories = res.data.getExamCategories.categories;

    if (!categories) {
    }
    const sortedUserCategories = [...categories].sort(
      (a, b) => b.categoryEvaluations.length - a.categoryEvaluations.length
    );
    store.dispatch(
      storageActions.setUserStorageCategories({
        categories: sortedUserCategories as MockExamCategory[],
      })
    );
    return addApolloState(apolloClient, {
      revalidate: 86400,
    });
  }
);
