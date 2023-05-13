import MainBannerSkeleton from '@components/banner/MainBannerSkeleton';
import useIsMobile from '@lib/hooks/useIsMobile';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { Suspense } from 'react';
import styled from 'styled-components';
import BottomAppbar from './BottomAppbar';
import Footer from './Footer';
import Nav from './nav/NavContainer';
import SubNav from './SubNav';
import {
  MAIN_SUB_NAV_OPTIONS,
  MANAGE_SUB_NAV_OPTIONS,
} from './nav/Nav.constants';
import { SubNavOption } from './nav/Nav.interface';

const MainBanner = dynamic(() => import('@components/banner/MainBanner'), {
  ssr: false,
  loading: () => <MainBannerSkeleton />,
});

interface LayoutProps {
  children: React.ReactNode;
  mainBanner?: boolean;
  sideBanner?: boolean;
  subNav?: 'main' | 'manage';
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  mainBanner,
  sideBanner,
  subNav,
  className,
}) => {
  let SUB_NAV_OPTIONS: SubNavOption[] = [];
  switch (subNav) {
    case 'main':
      SUB_NAV_OPTIONS = MAIN_SUB_NAV_OPTIONS;
      break;
    case 'manage':
      SUB_NAV_OPTIONS = MANAGE_SUB_NAV_OPTIONS;
      break;
    default:
      SUB_NAV_OPTIONS = MAIN_SUB_NAV_OPTIONS;
      break;
  }

  return (
    <LayoutContainer className={className}>
      <Nav />
      {subNav && <SubNav options={SUB_NAV_OPTIONS} />}
      <div className="layout-children-wrapper">
        <>
          {mainBanner && <MainBanner />}
          {sideBanner ? (
            <div className="layout-wrapper">
              <div className="layout-sub-banner-wrapper">
                <div className="layout-coupang-ad-wrapper">
                  <a
                    href="https://link.coupang.com/a/XBNyk"
                    target="_blank"
                    rel="noreferrer"
                  ></a>
                  <iframe
                    src="https://coupa.ng/cdOt5V"
                    width="120"
                    height="240"
                  ></iframe>
                </div>
                <div className="layout-coupang-ad-wrapper">
                  <a
                    href="https://link.coupang.com/a/XBMMA"
                    target="_blank"
                    rel="noreferrer"
                  ></a>
                  <iframe
                    src="https://coupa.ng/cdOt6m"
                    width="120"
                    height="240"
                  ></iframe>
                </div>
              </div>
              <div className="layout-sub-banner-children">{children}</div>
            </div>
          ) : (
            <>{children}</>
          )}
        </>
      </div>
      <footer>
        <Footer className="layout-pc-footer" />
        <BottomAppbar className="layout-mobile-bottom-app-bar" />
      </footer>
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  position: relative;
  .layout-sub-banner-wrapper {
    display: flex;
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
    min-height: calc(100vh - 165px);
  }
  .layout-mobile-bottom-app-bar {
    display: none;
  }

  @media (max-width: ${responsive.medium}) {
    .layout-pc-footer {
      display: none;
    }
    .layout-mobile-bottom-app-bar {
      display: flex;
    }
    .layout-sub-banner-wrapper {
      display: none;
    }

    .home-content-wrapper {
      justify-content: center;
      align-items: center;
    }
    .layout-children-wrapper {
      margin-top: -2px;
    }
    .layout-children-wrapper {
      padding-bottom: 70px;
      min-height: calc(100vh - 125px);
    }
  }
  .layout-coupang-ad-section {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .layout-coupang-ad-wrapper {
    position: relative;
  }
  .layout-coupang-ad-wrapper a {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 120px;
    height: 240px;
    z-index: 3;
  }
  .layout-coupang-ad-wrapper iframe {
    position: relative;
    z-index: 2;
  }
`;
