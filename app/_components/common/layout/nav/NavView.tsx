import palette from '../../../../_styles/palette';
import React from 'react';
import styled, { css } from 'styled-components';
import { responsive } from '../../../../_lib/utils/responsive';
import { NavViewProps } from './Nav.interface';
import useIsMobile from '../../../../_lib/hooks/useIsMobile';
import NavViewPc from './NavViewPc';
import NavViewMobile from './NavViewMobile';

const NavView: React.FC<NavViewProps> = (props) => {
  const isMobile = useIsMobile();
  return (
    <NavBlock
      sticky={props.sticky}
      profileDropBoxState={props.profileDropBoxState}
    >
      {!isMobile && <NavViewPc {...props} />}
      {isMobile && <NavViewMobile {...props} />}
    </NavBlock>
  );
};

export default NavView;

interface NavBlockProps {
  sticky: boolean;
  profileDropBoxState: boolean;
}

const NavBlock = styled.div<NavBlockProps>`
  height: 60px;
  border-bottom: 1.5px solid ${palette.gray_200};
  display: flex;
  flex-direction: row;
  position: sticky;
  top: 0px;
  z-index: 500;
  background-color: white;
  width: 100vw;
  transition: box-shadow 0.2s ease-in;
  padding: 0 80px;
  ${(props) =>
    props.sticky &&
    css`
      box-shadow: rgb(0 0 0 / 10%) 0px 4px 8px 4px;
    `}
  .nav-item {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.color('colorTextTertiary')};
    cursor: pointer;
    transition: color 0.2s ease-in;
    position: relative;
    top: 5px;
  }
  .nav-item.active {
    color: ${palette.antd_blue_01};
  }

  .nav-home-logo-wrapper {
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    width: 80px;
    height: 50px;
    /* width: 100px; */
  }
  .nav-item-link-text,
  .nav-register-link-text {
    :hover {
      color: ${palette.antd_blue_01};
      transition: color 0.3s ease-in;
    }
    color: ${palette.gray_500};
    cursor: pointer;
  }
  .selected {
    color: ${palette.antd_blue_01};
  }
  .nav-user-content-wrapper {
    display: flex;
    gap: 15px;
    align-items: center;
    position: relative;
  }
  .nav-user-content-notice-button {
    position: relative;

    svg {
      color: ${({ theme }) => theme.color('colorTextTertiary')};
      transition: color 0.2s ease-in;
    }
    position: relative;
    top: 1.5px;
    cursor: pointer;
    :hover {
      svg {
        color: ${palette.antd_blue_01};
      }
    }
  }
  .nav-user-content-notice-button.active {
    ::before {
      content: '';
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: ${palette.antd_blue_01};
      top: 2px;
      right: 3px;
      position: absolute;
    }
  }
  .nav-user-content {
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${({ theme }) => theme.color('colorTextTertiary')};
    cursor: pointer;
    transition: color 0.2s ease-in;
    ${(props) =>
      props.profileDropBoxState &&
      css`
        color: ${palette.antd_blue_01};
      `}
    :hover {
      color: ${palette.antd_blue_01};
    }
    .nav-user-content-profile-image {
      span {
        font-size: 1.3rem;
      }
    }
    span {
      font-size: 0.9rem;
    }
  }

  @media (max-width: ${responsive.medium}) {
    padding: 0 10px;
  }
`;
