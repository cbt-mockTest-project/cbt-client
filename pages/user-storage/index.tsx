import { GET_EXAM_CATEGORIES } from '../../app/_lib/graphql/query/examQuery';
import { GetExamCategoriesQuery } from '../../app/_lib/graphql/query/examQuery.generated';
import { addApolloState, initializeApollo } from '../../app/_modules/apollo';
import { GetStaticProps, NextPage } from 'next';
import { ExamSource, MockExamCategory } from '../../app/types';
import React from 'react';
import WithHead from '../../app/_components/common/head/WithHead';
import wrapper from '../../app/_modules/redux/store/configureStore';
import { storageActions } from '../../app/_modules/redux/slices/storage';
import StorageLayout from '../../app/_components/common/layout/storage/StorageLayout';
import { useMeQuery } from '../../app/_lib/graphql/hook/useUser';
import { StorageType } from '../../app/customTypes';
import UserStorageComponent from '../../app/_components/userStorage/UserStorageComponent';
import {
  GetCategoriesQueryKey,
  getCategoriesQueryOption,
} from '../../app/_lib/queryOptions/getCategoriesQueryOption';
import { QueryClient, dehydrate } from '@tanstack/react-query';

interface UserStorageProps {}

const UserStorage: NextPage<UserStorageProps> = () => {
  useMeQuery();
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

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    getCategoriesQueryOption({
      queryKey: GetCategoriesQueryKey.user_storage,
      input: {
        examSource: ExamSource.User,
      },
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
