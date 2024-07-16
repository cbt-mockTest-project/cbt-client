import { NextPage } from 'next';
import { UserRole } from 'types';
import React from 'react';
import WithHead from '@components/common/head/WithHead';
import StorageLayout from '@components/common/layout/storage/StorageLayout';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { StorageType } from 'customTypes';

import { DehydratedState } from '@tanstack/react-query';

import withAuth from '@lib/hocs/withAuth';
import AdminStorageComponent from '@components/adminStorage/AdminStorageComponent';

interface UserStorageProps {
  dehydratedState: DehydratedState;
}

const UserStorage: NextPage<UserStorageProps> = ({ dehydratedState }) => {
  useMeQuery();
  return (
    <>
      <WithHead
        title="모두CBT | 모두 저장소"
        pageHeadingTitle="모두CBT 서비스 유저 저장소 페이지"
      />
      <StorageLayout
        hasOpenSaveCategoryModalButton={false}
        title="관리자 암기장"
        storageType={StorageType.USER}
      >
        <AdminStorageComponent />
      </StorageLayout>
    </>
  );
};

export default withAuth(UserStorage, [UserRole.Admin]);
