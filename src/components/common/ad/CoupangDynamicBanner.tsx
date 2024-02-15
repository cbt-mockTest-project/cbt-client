import { useMeQuery } from '@lib/graphql/hook/useUser';
import { responsive } from '@lib/utils/responsive';
import { checkRole } from '@lib/utils/utils';
import palette from '@styles/palette';
import { isUndefined } from 'lodash';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

interface CoupangDynamicBannerProps {
  type?: 'basic' | 'footer';
}

const CoupangDynamicBanner: React.FC<CoupangDynamicBannerProps> = ({
  type = 'footer',
}) => {
  const { data: meQuery } = useMeQuery();
  const [isAdVisible, setIsAdVisible] = useState(false);
  useEffect(() => {
    if (isUndefined(meQuery)) return;
    if (!checkRole({ roleIds: [1, 2, 3, 4, 5, 6, 7], meQuery })) {
      setIsAdVisible(true);
    }
  }, [meQuery]);
  if (!isAdVisible) return null;
  return (
    <CoupangDynamicBannerContainer type={type}>
      <iframe
        src="https://ads-partners.coupang.com/widgets.html?id=620466&template=carousel&trackingCode=AF8104485&subId=&width=1024&height=180"
        width="1024"
        height="180"
        referrerPolicy="unsafe-url"
      />
    </CoupangDynamicBannerContainer>
  );
};

export default CoupangDynamicBanner;

interface CoupangDynamicBannerContainerProps
  extends Pick<CoupangDynamicBannerProps, 'type'> {}

const CoupangDynamicBannerContainer = styled.div<CoupangDynamicBannerContainerProps>`
  position: relative;
  text-align: center;
  width: 100%;
  height: 130px;
  margin-top: 20px;
  overflow: hidden;
  ${(props) =>
    props.type === 'footer' &&
    css`
      position: fixed;
      bottom: 0;
      z-index: 999;
    `}
  display: flex;
  justify-content: center;
  align-items: center;

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
