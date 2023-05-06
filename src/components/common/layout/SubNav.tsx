import palette from '@styles/palette';
import React from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { responsive } from '@lib/utils/responsive';
import { SubNavOption } from './nav/Nav.interface';

interface SubNavProps {
  options: SubNavOption[];
}

const SubNav: React.FC<SubNavProps> = ({ options }) => {
  const router = useRouter();

  const onCategoryChange = async ({
    value,
    pathname,
  }: {
    value: string;
    pathname: string;
  }) => {
    if (router.pathname.indexOf(value) > -1) return;
    await router.push({ pathname });
    const subNav = document.querySelector('.sub-nav-link-list.active');
    subNav?.scrollIntoView({ block: 'center' });
  };

  const isActiveNavItem = (value: string) =>
    router.pathname.indexOf(value) > -1;
  return (
    <SubNavContainer className="sub-nav-container">
      <div className="sub-nav-contents-wrapper">
        <ul className="sub-nav-link-wrapper">
          {options.map((option, index) => {
            return (
              <li
                className={`sub-nav-link-list ${
                  isActiveNavItem(option.value) && 'active'
                }`}
                key={index}
              >
                <button
                  className="sub-nav-link-list-button"
                  onClick={() =>
                    onCategoryChange({
                      value: option.value,
                      pathname: option.path,
                    })
                  }
                >
                  {option.label}
                  {isActiveNavItem(option.value) && <ArrowDropUpIcon />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className="sub-nav-blur"
        style={{
          filter: 'blur(10px)',
          backgroundColor: 'white',
          position: 'fixed',
          top: 58,
          right: -10,
          width: '20px',
          height: '45px',
          zIndex: 999,
        }}
      />
    </SubNavContainer>
  );
};

export default SubNav;

const SubNavContainer = styled.div`
  background-color: ${palette.antd_blue_01};
  position: sticky;
  top: 58.5px;
  z-index: 99;

  .sub-nav-contents-wrapper {
    max-width: 1030px;
    margin: 0 auto;
  }
  .sub-nav-link-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
    color: white;
    font-size: 0.9rem;
    height: 100%;
    display: flex;
    width: 100%;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .sub-nav-link-list {
    height: 100%;
    position: relative;
    width: max-content;
    svg {
      width: 44px;
      height: 44px;
      position: absolute;
      bottom: -20px;
      transform: translateX(-50%);
      left: 50%;
    }
    :hover {
      color: inherit;
      background-color: ${palette.blue_500};
    }
  }
  .sub-nav-link-list-button {
    padding: 10px 10px;
    width: max-content;
    transition: all 0.2s ease-out;
  }
  .sub-nav-blur {
    display: none;
    position: fixed;
    top: 58px;
    right: -10;
    width: 20px;
    height: 45px;
    z-index: 999;
    filter: blur(10px);
    background-color: white;
    @media (max-width: ${responsive.small}) {
      display: block;
    }
  }
`;
