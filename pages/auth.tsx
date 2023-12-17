import { NextPage } from 'next';
import React, { useEffect } from 'react';
import WithHead from '@components/common/head/WithHead';
import AuthComponent from '@components/auth/AuthComponent';
import { useRouter } from 'next/router';

interface AuthProps {}

const Auth: NextPage<AuthProps> = () => {
  return (
    <>
      <WithHead
        title="모두CBT | 로그인"
        pageHeadingTitle="모두CBT 서비스 로그인 페이지"
      />
      <AuthComponent />
    </>
  );
};

export default Auth;
