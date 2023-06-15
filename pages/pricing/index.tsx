import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import PricingComponent from '@components/pricing/PricingComponent';
import React from 'react';
import styled from 'styled-components';

interface PricingPageProps {}

const PricingPage: React.FC<PricingPageProps> = () => {
  return (
    <>
      <WithHead
        title="모두CBT | 결제페이지"
        pageHeadingTitle="모두CBT 결제페이지"
      />
      <StyledLayout>
        <PricingComponent />
      </StyledLayout>
    </>
  );
};

export default PricingPage;

const StyledLayout = styled(Layout)`
  .layout-children-wrapper {
    overflow-x: hidden;
  }
`;
