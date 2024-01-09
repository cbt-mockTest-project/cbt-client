import { Clear } from '@mui/icons-material';
import palette from '@styles/palette';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const HomeSearchedListTemplateBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  .home-searched-list-template-title-anb-clear-button {
    display: flex;
    gap: 10px;
    .home-searched-list-template-clear-button {
      cursor: pointer;
      color: ${palette.colorSubText};
      transition: color 0.2s linear;
      &:hover {
        color: ${palette.antd_blue_02};
      }
    }
    .home-searched-list-template-title {
      font-size: 16px;
      font-weight: 700;
    }
  }
`;

interface HomeSearchedListTemplateProps {
  keyword: string;
  children: React.ReactNode;
}

const HomeSearchedListTemplate: React.FC<HomeSearchedListTemplateProps> = ({
  keyword,
  children,
}) => {
  const router = useRouter();
  return (
    <HomeSearchedListTemplateBlock>
      <div className="home-searched-list-template-title-anb-clear-button">
        <div className="home-searched-list-template-title">{`"${keyword}" 에 대한 검색결과`}</div>
        <Clear
          className="home-searched-list-template-clear-button"
          onClick={() => router.push('/', undefined, { shallow: true })}
        />
      </div>
      {children}
    </HomeSearchedListTemplateBlock>
  );
};

export default HomeSearchedListTemplate;
