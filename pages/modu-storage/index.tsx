import ModuStorageComponent from '@components/moduStorage/ModuStorageComponent';
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

interface ModuStorageProps {}

const ModuStorage: NextPage<ModuStorageProps> = () => {
  const { data: meQuery } = useMeQuery();
  return (
    <>
      <WithHead
        title="모두CBT | 모두 저장소"
        pageHeadingTitle="모두CBT 서비스 모두 저장소 페이지"
      />
      <StorageLayout
        hasOpenSaveCategoryModalButton={
          meQuery?.me.user?.role === UserRole.Admin
        }
        title="모두CBT 공식 암기장"
        storageType={StorageType.MODU}
      >
        <ModuStorageComponent />
      </StorageLayout>
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
      storageActions.setModuStorageCategories({
        categories: categories as MockExamCategory[],
      })
    );
    return addApolloState(apolloClient, {});
  }
);
