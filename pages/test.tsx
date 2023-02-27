import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
const ClickMonAd = dynamic(() => import('@components/common/ad/ClickMonAd'), {
  ssr: false,
});
const Test: NextPage = () => {
  return (
    <div>
      <ClickMonAd />
    </div>
  );
};

export default Test;
