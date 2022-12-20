import MainBanner from '@components/banner/MainBanner';
import palette from '@styles/palette';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Nav from './Nav';
import SubNav from './SubNav';

interface LayoutProps {
  children: React.ReactNode;
  mainBanner?: boolean;
  sideBanner?: boolean;
  subNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  mainBanner,
  sideBanner,
  subNav,
}) => {
  return (
    <LayoutContainer>
      <Nav />
      {subNav && <SubNav />}
      <div className="layout-children-wrapper">
        <>
          {mainBanner && <MainBanner />}
          {sideBanner ? (
            <div className="layout-wrapper">
              <div className="layout-sub-banner-wrapper">
                <div className="layout-sub-banner">
                  <a
                    href="https://link.coupang.com/a/IHTQj"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src="/png/ad/ad01.png"
                      alt="coupang-ad"
                      width={200}
                      height={200}
                    />
                  </a>
                </div>
                <div className="layout-sub-banner">
                  <a
                    href="https://link.coupang.com/a/IHT2e"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src="/png/ad/ad02.png"
                      alt="coupang-ad"
                      width={250}
                      height={250}
                    />
                  </a>
                </div>
              </div>
              <div className="layout-sub-banner-children">{children}</div>
            </div>
          ) : (
            <>{children}</>
          )}
        </>
      </div>
      <Footer />
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
    width: 200px;
    background-color: ${palette.gray_200};
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 0;
    img {
      object-fit: cover;
    }
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
