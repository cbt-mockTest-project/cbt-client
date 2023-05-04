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

const MainBanner = dynamic(() => import('@components/banner/MainBanner'), {
  ssr: false,
  loading: () => <MainBannerSkeleton />,
});

interface LayoutProps {
  children: React.ReactNode;
  mainBanner?: boolean;
  sideBanner?: boolean;
  subNav?: boolean;
  className?: string;
}

const subNavOptions = [
  { label: '북마크', value: 'bookmark' },
  { label: '성취도', value: 'reviewnote' },
  { label: '메모장', value: 'memo' },
  { label: '기록', value: 'examhistory' },
  { label: '문제댓글', value: 'questioncomment' },
  { label: '시험지', value: 'myexam' },
];

const Layout: React.FC<LayoutProps> = ({
  children,
  mainBanner,
  sideBanner,
  subNav,
  className,
}) => {
  return (
    <LayoutContainer className={className}>
      <Nav />
      {subNav && <SubNav options={subNavOptions} />}
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
`;
