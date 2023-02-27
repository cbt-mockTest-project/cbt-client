import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';

interface CoupangAdProps {}

const CoupangAd: React.FC<CoupangAdProps> = () => {
  return (
    <CoupangAdContainer>
      <iframe
        src="https://ads-partners.coupang.com/widgets.html?id=620466&template=carousel&trackingCode=AF8104485&subId=&width=1024&height=180"
        width="1024"
        height="180"
        referrerPolicy="unsafe-url"
      />
    </CoupangAdContainer>
  );
};

export default CoupangAd;

const CoupangAdContainer = styled.div`
  position: relative;
  text-align: center;
  z-index: 999;
  width: 100%;
  height: 130px;
  margin-top: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  @media (max-width: ${responsive.medium}) {
    height: 100px;
  }
  @media (max-width: ${responsive.small}) {
    height: 80px;
  }
`;
