import { NAVER_BLOG_BOT_PAGE } from '@lib/constants/displayName';
import { Tabs, TabsProps } from 'antd';
import React from 'react';
import styled from 'styled-components';
import SearchKeyword from './SearchKeyword';
import BlogAnalysis from './BlogAnalysis';

const NaverBlogBotComponentBlock = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 20px;
`;

interface NaverBlogBotComponentProps {}

const NaverBlogBotComponent: React.FC<NaverBlogBotComponentProps> = () => {
  const tabItems: TabsProps['items'] = [
    {
      key: 'keyword',
      label: '키워드',
      children: <SearchKeyword />,
    },
    {
      key: 'analysis',
      label: '분석',
      children: <BlogAnalysis />,
    },
  ];
  return (
    <NaverBlogBotComponentBlock>
      <Tabs items={tabItems} />
    </NaverBlogBotComponentBlock>
  );
};

export default NaverBlogBotComponent;
