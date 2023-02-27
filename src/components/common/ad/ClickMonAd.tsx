import { responsive } from '@lib/utils/responsive';
import { isServer } from '@lib/utils/utils';
import React from 'react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

interface ClickMonAdProps {}

const ClickMonAd: React.FC<ClickMonAdProps> = () => {
  if (isServer()) {
    return null;
  }
  return (
    <ClickMonAdContainer>
      {isMobile ? (
        <iframe
          width="320"
          height="100"
          style={{ overflow: 'hidden' }}
          src="https://mtab.clickmon.co.kr/pop/wp_m_320_100.php?PopAd=CM_M_1003067%7C%5E%7CCM_A_1127998%7C%5E%7CAdver_M_1046207&mon_rf=REFERRER_URL&mon_direct_url=URLENCODE_PASSBACK_INPUT"
        />
      ) : (
        <iframe
          width="500"
          height="90"
          style={{ overflow: 'hidden' }}
          src="https://tab2.clickmon.co.kr/pop/wp_ad_728.php?PopAd=CM_M_1003067%7C%5E%7CCM_A_1127998%7C%5E%7CAdver_M_1046207&mon_rf=REFERRER_URL&mon_direct_url=URLENCODE_PASSBACK_INPUT"
        />
      )}
    </ClickMonAdContainer>
  );
};

export default ClickMonAd;

const ClickMonAdContainer = styled.div`
  position: relative;
  text-align: center;
  width: 100%;
  height: 90px;
  margin-top: 20px;
  overflow: hidden;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  @media (max-width: ${responsive.medium}) {
    height: 110px;
  }
`;
