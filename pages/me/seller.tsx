import { NextPage } from 'next';
import React from 'react';
import WithHead from '../../app/_components/common/head/WithHead';
import withAuth from '../../app/_lib/hocs/withAuth';
import { UserRole } from '../../app/types';
import SellerComponent from '../../app/_components/me/seller/SellerComponent';

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

export default withAuth(SellerPage, [UserRole.Seller, UserRole.Admin]);
