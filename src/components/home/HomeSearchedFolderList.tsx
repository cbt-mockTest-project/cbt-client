import CategoryFolderList from '@components/moduStorage/CategoryFolderList';
import React from 'react';
import { MockExamCategory } from 'types';
import HomeSearchedListTemplate from './HomeSearchedListTemplate';
import HomeSearchLoader from './HomeSearchLoader';

interface HomeSearchedFolderListProps {
  keyword: string;
  categories: MockExamCategory[];
  loading?: boolean;
}

const HomeSearchedFolderList: React.FC<HomeSearchedFolderListProps> = ({
  keyword,
  categories,
  loading,
}) => {
  return (
    <HomeSearchedListTemplate keyword={keyword}>
      {!loading && <CategoryFolderList categories={categories} />}
      {loading && <HomeSearchLoader />}
    </HomeSearchedListTemplate>
  );
};

export default HomeSearchedFolderList;
