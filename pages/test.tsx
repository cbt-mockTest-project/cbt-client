import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import QuestionShareModal from '@components/common/modal/QuestionShareModal';
import useToggle from '@lib/hooks/useToggle';
const ClickMonAd = dynamic(() => import('@components/common/ad/ClickMonAd'), {
  ssr: false,
});
const Test: NextPage = () => {
  const { value, onToggle } = useToggle();
  return (
    <div>
      <ClickMonAd />
      <button onClick={onToggle}>클릭</button>
      <input type="file" />
      <QuestionShareModal
        open={value}
        onClose={onToggle}
        questionId={850}
        shareTitle="test"
        title="test"
        shareDescription="test"
      />
    </div>
  );
};

export default Test;
