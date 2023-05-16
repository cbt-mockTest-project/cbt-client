import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import PricingComponent from '@components/pricing/PricingComponent';
import React from 'react';

interface PricingPageProps {}

const PricingPage: React.FC<PricingPageProps> = () => {
  return (
    <>
      <WithHead
        title="모두CBT | 결제페이지"
        pageHeadingTitle="모두CBT 결제페이지"
      />
      <Layout>
        <PricingComponent />
      </Layout>
    </>
  );
};

export default PricingPage;
