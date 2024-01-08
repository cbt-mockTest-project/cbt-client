import CategoryFolderList from '@components/moduStorage/CategoryFolderList';
import React from 'react';
import { MockExamCategory } from 'types';
import HomeSearchedListTemplate from './HomeSearchedListTemplate';

interface HomeSearchedFolderListProps {
  keyword: string;
  categories: MockExamCategory[];
}

const HomeSearchedFolderList: React.FC<HomeSearchedFolderListProps> = ({
  keyword,
  categories,
}) => {
  return (
    <HomeSearchedListTemplate keyword={keyword}>
      <CategoryFolderList categories={categories} />
    </HomeSearchedListTemplate>
  );
};

export default HomeSearchedFolderList;
