import palette from '@styles/palette';
import React from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const SubNav = () => {
  const router = useRouter();
  const onCategoryChange = (path: string) => {
    if (router.pathname.indexOf(path) > -1) return;
    router.push({ pathname: `/me/${path}` });
  };
  const subNavOptions = [
    { label: '저장된 문제', value: 'bookmark' },
    { label: '시험내역', value: 'examhistory' },
  ];
  return (
    <SubNavContainer>
      <div className="sub-nav-contents-wrapper">
        <ul className="sub-nav-link-wrapper">
          {subNavOptions.map((option, index) => {
            return (
              <li className="sub-nav-link-list" key={index}>
                <button
                  className="sub-nav-link-list-button"
                  onClick={() => onCategoryChange(option.value)}
                >
                  {option.label}
                  {router.pathname.indexOf(option.value) > -1 && (
                    <ArrowDropUpIcon />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </SubNavContainer>
  );
};

export default SubNav;

const SubNavContainer = styled.div`
  background-color: ${palette.antd_blue_01};
  .sub-nav-contents-wrapper {
    max-width: 1030px;
    margin: 0 auto;
  }
  .sub-nav-link-wrapper {
    color: white;
    font-size: 0.9rem;
    height: 100%;
    display: flex;
  }
  .sub-nav-link-list {
    height: 100%;
    position: relative;
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
    transition: all 0.2s ease-out;
  }
`;
