import MainBanner from '@components/banner/MainBanner';
import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';
import Nav from './Nav';

interface LayoutProps {
  children: React.ReactNode;
  mainBanner?: boolean;
  sideBanner?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  mainBanner,
  sideBanner,
}) => {
  return (
    <LayoutContainer>
      <Nav />
      <div className="layout-children-wrapper">
        <>
          {mainBanner && <MainBanner />}
          {sideBanner ? (
            <div className="layout-wrapper">
              <div className="layout-sub-banner-wrapper">
                <div className="layout-sub-banner">광고문의01</div>
                <div className="layout-sub-banner">광고문의02</div>
              </div>
              <div className="layout-sub-banner-children">{children}</div>
            </div>
          ) : (
            <>{children}</>
          )}
        </>
      </div>
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  .layout-sub-banner-wrapper {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 250px;
    flex: 1;
  }
  .layout-sub-banner-children {
    flex: 2;
  }
  .layout-sub-banner {
    width: 250px;
    height: 180px;
    background-color: ${palette.gray_200};
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .layout-wrapper {
    margin-top: 40px;
    display: flex;
  }
  .layout-children-wrapper {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    max-width: 1024px;
    margin-top: 45px;
  }
`;
