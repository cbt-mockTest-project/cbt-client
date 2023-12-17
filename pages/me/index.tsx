import { NextPage } from 'next';
import React from 'react';
import WithHead from '@components/common/head/WithHead';
import MyProfileComponent from '@components/me/profile/MyProfileComponent';

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

export default MyProfile;
