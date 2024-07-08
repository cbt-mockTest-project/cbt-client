import { NextPage } from 'next';
import { ExamSource, UserRole } from '../../app/types';
import React from 'react';
import WithHead from '../../app/_components/common/head/WithHead';
import StorageLayout from '../../app/_components/common/layout/storage/StorageLayout';
import { useMeQuery } from '../../app/_lib/graphql/hook/useUser';
import { StorageType } from '../../app/customTypes';
import EhsStorageComponent from '../../app/_components/ehsStorage/EhsStorageComponent';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import {
  GetCategoriesQueryKey,
  getCategoriesQueryOption,
} from '../../app/_lib/queryOptions/getCategoriesQueryOption';

interface ModuStorageProps {}

const ModuStorage: NextPage<ModuStorageProps> = () => {
  const { data: meQuery } = useMeQuery();
  return (
    <>
      <WithHead
        title="직8딴 저장소 | 모두CBT"
        pageHeadingTitle="모두CBT 서비스 직8딴 저장소 페이지"
      />
      <StorageLayout
        hasOpenSaveCategoryModalButton={
          meQuery?.me.user?.role === UserRole.Admin
        }
        title="직8딴 공식 암기장"
        storageType={StorageType.MODU}
      >
        <EhsStorageComponent />
      </StorageLayout>
    </>
  );
};

export default ModuStorage;

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    getCategoriesQueryOption({
      queryKey: GetCategoriesQueryKey.ehs_storage,
      input: {
        examSource: ExamSource.EhsMaster,
      },
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
