import palette from '@styles/palette';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { navList } from './layout.constants';
import { useRouter } from 'next/router';

const SideNavListBlock = styled.ul`
  display: flex;
  flex-direction: column;
  .side-nav-list-item {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 3px 4px;
    padding: 0px 10px 0px 24px;
    border-radius: 5px;
    transition: background-color 0.2s ease-in-out;
    font-size: 14px;
    &:hover {
      background-color: ${palette.gray_100};
    }
    a {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    svg {
      font-size: 18px;
    }
  }
  .side-nav-list-item.active {
    background-color: ${palette.gray_100};
    color: ${palette.antd_blue_02};
    svg {
      fill: ${palette.antd_blue_02};
    }
  }
`;

interface SideNavListProps {}

const SideNavList: React.FC<SideNavListProps> = () => {
  const router = useRouter();
  return (
    <SideNavListBlock>
      {navList.map((nav) => (
        <li
          className={`side-nav-list-item ${
            router.pathname === nav.path ? 'active' : ''
          }`}
          key={nav.name}
        >
          <Link href={nav.path}>
            {nav.icon}
            <span>{nav.name}</span>
          </Link>
        </li>
      ))}
    </SideNavListBlock>
  );
};

export default SideNavList;
