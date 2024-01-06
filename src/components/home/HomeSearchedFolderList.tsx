import CategoryFolderList from '@components/moduStorage/CategoryFolderList';
import React from 'react';
import styled from 'styled-components';
import { MockExamCategory } from 'types';

const HomeSearchedFolderListBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  .home-searched-folder-list-title {
    font-size: 16px;
    font-weight: 700;
  }
`;

interface HomeSearchedFolderListProps {
  keyword: string;
  categories: MockExamCategory[];
}

const HomeSearchedFolderList: React.FC<HomeSearchedFolderListProps> = ({
  keyword,
  categories,
}) => {
  return (
    <HomeSearchedFolderListBlock>
      <div className="home-searched-folder-list-title">{`"${keyword}" 에 대한 검색결과`}</div>
      <CategoryFolderList categories={categories} />
    </HomeSearchedFolderListBlock>
  );
};

export default HomeSearchedFolderList;
