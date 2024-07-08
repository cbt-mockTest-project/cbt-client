import { NextPage } from 'next';
import React from 'react';
import WithHead from '../../app/_components/common/head/WithHead';
import MyProfileComponent from '../../app/_components/me/profile/MyProfileComponent';
import withAuth from '../../app/_lib/hocs/withAuth';

interface MyProfileProps {}

const MyProfile: NextPage<MyProfileProps> = () => {
  return (
    <>
      <WithHead
        title="마이 페이지 | 모두CBT"
        pageHeadingTitle="모두CBT 서비스 마이 페이지"
      />
      <MyProfileComponent />
    </>
  );
};

export default withAuth(MyProfile);
