import { NextPage } from 'next';
import { ExamSource } from 'types';
import React from 'react';
import WithHead from '@components/common/head/WithHead';
import StorageLayout from '@components/common/layout/storage/StorageLayout';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { StorageType } from 'customTypes';
import UserStorageComponent from '@components/userStorage/UserStorageComponent';
import {
  GetCategoriesQueryKey,
  getCategoriesQueryOption,
} from '@lib/queryOptions/getCategoriesQueryOption';
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
