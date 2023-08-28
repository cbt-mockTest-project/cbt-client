import React from 'react';
import { NextPage } from 'next';
import { Image } from 'antd';
import WithHead from '@components/common/head/WithHead';

const Test: NextPage = () => {
  return (
    <>
      <WithHead
        title="Im"
        pageHeadingTitle="aa"
        image="https://dxw2azlbq2ays.cloudfront.net/1676511721279%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A3%C3%A1%C2%86%C2%BA%202023-02-16%20%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%8C%C3%A1%C2%85%C2%A5%C3%A1%C2%86%C2%AB%2010.41.53.png"
      />
      <Image
        src="https://dxw2azlbq2ays.cloudfront.net/1676511721279%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A3%C3%A1%C2%86%C2%BA%202023-02-16%20%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%8C%C3%A1%C2%85%C2%A5%C3%A1%C2%86%C2%AB%2010.41.53.png"
        alt="image"
      />
    </>
  );
};

export default Test;
