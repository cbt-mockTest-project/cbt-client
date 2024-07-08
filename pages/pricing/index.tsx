import WithHead from '../../app/_components/common/head/WithHead';
import PricingComponent from '../../app/_components/pricing/PricingComponent';
import { PRICING_PAGE } from '../../app/_lib/constants/displayName';
import React from 'react';

interface PricingPageProps {}

const PricingPage: React.FC<PricingPageProps> = () => {
  return (
    <>
      <WithHead
        title="모두CBT | 결제페이지"
        pageHeadingTitle="모두CBT 결제페이지"
      />
      <PricingComponent />
    </>
  );
};

PricingPage.displayName = PRICING_PAGE;

export default PricingPage;
