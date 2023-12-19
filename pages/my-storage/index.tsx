import { NextPage } from 'next';
import React, { useEffect } from 'react';
import WithHead from '@components/common/head/WithHead';
import MyStorageComponent from '@components/myStorage/MyStorageComponent';
import StorageLayout from '@components/common/layout/storage/StorageLayout';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import useStorage from '@lib/hooks/useStorage';
import { StorageType } from 'customTypes';
import withAuth from '@lib/hocs/withAuth';

interface MyStorageProps {}

const MyStorage: NextPage<MyStorageProps> = () => {
  const { data: meQuery } = useMeQuery();
  const { fetchCategories: fetchMyCategories } = useStorage(StorageType.MY);
  const { fetchCategories: fetchBookmarkedCategories } = useStorage(
    StorageType.BOOKMARK
  );

  useEffect(() => {
    if (meQuery?.me.user) {
      fetchMyCategories({
        categoryMakerId: meQuery.me.user.id,
      });
      fetchBookmarkedCategories({
        isBookmarked: true,
      });
    }
  }, [meQuery]);
  return (
    <>
      <WithHead
        title="내 암기장 | 모두CBT"
        pageHeadingTitle="모두CBT 서비스 모두 저장소 페이지"
      />
      <StorageLayout
        storageType={StorageType.MY}
        hasOpenSaveCategoryModalButton={!!meQuery?.me.user}
        title="내 암기장"
      >
        {meQuery?.me.user && <MyStorageComponent />}
      </StorageLayout>
    </>
  );
};

export default withAuth(MyStorage);
