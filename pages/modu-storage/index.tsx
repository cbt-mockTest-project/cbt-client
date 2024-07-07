import ModuStorageComponent from '@components/moduStorage/ModuStorageComponent';
import { NextPage } from 'next';
import { ExamSource, UserRole } from 'types';
import React from 'react';
import WithHead from '@components/common/head/WithHead';
import StorageLayout from '@components/common/layout/storage/StorageLayout';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { StorageType } from 'customTypes';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import {
  GetCategoriesQueryKey,
  getCategoriesQueryOption,
} from '@lib/queryOptions/getCategoriesQueryOption';

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

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    getCategoriesQueryOption({
      queryKey: GetCategoriesQueryKey.modu_storage,
      input: {
        examSource: ExamSource.MoudCbt,
      },
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
