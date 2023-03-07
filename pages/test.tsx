import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import QuestionShareModal from '@components/common/modal/QuestionShareModal';
const ClickMonAd = dynamic(() => import('@components/common/ad/ClickMonAd'), {
  ssr: false,
});
const Test: NextPage = () => {
  return (
    <div>
      <ClickMonAd />
      <QuestionShareModal
        open={true}
        onClose={() => {}}
        questionId={850}
        shareTitle="test"
        title="test"
        shareDescription="test"
      />
    </div>
  );
};

export default Test;
