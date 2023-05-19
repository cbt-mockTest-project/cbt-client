import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import PaymentHistoryComponent from '@components/me/payment/PaymentHistoryComponent';
import React from 'react';
import styled from 'styled-components';

interface PaymentPageProps {}

const PaymentPage: React.FC<PaymentPageProps> = () => {
  return (
    <>
      <WithHead title="결제내역 | 모두CBT" pageHeadingTitle="결제내역 페이지" />
      <Layout subNav="main">
        <PaymentHistoryComponent />
      </Layout>
    </>
  );
};

export default PaymentPage;

const PaymentPageContainer = styled.div``;
