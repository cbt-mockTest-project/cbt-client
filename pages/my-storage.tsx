import { NextPage } from 'next';
import React, { useEffect } from 'react';
import WithHead from '@components/common/head/WithHead';
import MyStorageComponent from '@components/myStorage/MyStorageComponent';
import StorageLayout from '@components/common/layout/storage/StorageLayout';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { useLazyGetMyExamCategories } from '@lib/graphql/hook/useExam';
import useStorage from '@lib/hooks/useStorage';
import { StorageType } from 'customTypes';

interface MyStorageProps {}

const MyStorage: NextPage<MyStorageProps> = () => {
  const { data: meQuery } = useMeQuery();
  const { fetchCategories, categories } = useStorage(StorageType.MY);

  useEffect(() => {
    if (meQuery?.me.user) {
      fetchCategories();
    }
  }, [meQuery]);
  return (
    <>
      <WithHead
        title="모두CBT | 모두 저장소"
        pageHeadingTitle="모두CBT 서비스 모두 저장소 페이지"
      />
      <StorageLayout
        storageType={StorageType.MY}
        hasOpenSaveCategoryModalButton={
          meQuery?.me.user?.id === categories[0]?.user.id
        }
        title="내 암기장"
      >
        <MyStorageComponent />
      </StorageLayout>
    </>
  );
};

export default MyStorage;
