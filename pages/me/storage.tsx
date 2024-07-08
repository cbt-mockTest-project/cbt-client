import { NextPage } from 'next';
import React, { useEffect } from 'react';
import WithHead from '../../app/_components/common/head/WithHead';
import MyStorageComponent from '../../app/_components/myStorage/MyStorageComponent';
import StorageLayout from '../../app/_components/common/layout/storage/StorageLayout';
import { useMeQuery } from '../../app/_lib/graphql/hook/useUser';
import useStorage from '../../app/_lib/hooks/useStorage';
import { StorageType } from '../../app/customTypes';
import withAuth from '../../app/_lib/hocs/withAuth';
import Link from 'next/link';

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
      <div className="text-sm text-gray-400 flex items-center justify-center mt-4">
        * 암기장 생성시, 저작권을 주의해주세요.
        <Link
          className="ml-2 text-blue-500 hover:text-blue-500"
          href="https://spotless-possum-447.notion.site/CBT-0d581bc623724239a4e228ff48b4a757"
          target="_blank"
          rel="noopener noreferrer"
        >
          저작권 정책
        </Link>
      </div>
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
