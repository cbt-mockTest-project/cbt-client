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
import FeedbackFilterComponent from '@components/admin/feedback-filter/FeedbackFilterComponent';

interface UserStorageProps {
  dehydratedState: DehydratedState;
}

const UserStorage: NextPage<UserStorageProps> = () => {
  useMeQuery();
  return <FeedbackFilterComponent />;
};

export default withAuth(UserStorage, [UserRole.Admin]);
