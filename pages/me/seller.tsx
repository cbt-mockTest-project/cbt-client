import { NextPage } from 'next';
import React from 'react';
import WithHead from '@components/common/head/WithHead';
import withAuth from '@lib/hocs/withAuth';
import { UserRole } from 'types';
import SellerComponent from '@components/me/seller/SellerComponent';

interface SellerPageProps {}

const SellerPage: NextPage<SellerPageProps> = () => {
  return (
    <>
      <WithHead
        title="판매자 페이지 | 모두CBT"
        pageHeadingTitle="모두CBT 서비스 마이 페이지"
      />
      <SellerComponent />
    </>
  );
};

export default withAuth(SellerPage, [UserRole.Seller]);
