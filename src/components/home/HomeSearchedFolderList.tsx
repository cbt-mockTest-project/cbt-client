import CategoryFolderList from '@components/moduStorage/CategoryFolderList';
import React from 'react';
import { MockExamCategory } from 'types';
import HomeSearchedListTemplate from './HomeSearchedListTemplate';
import HomeSearchLoader from './HomeSearchLoader';

interface HomeSearchedFolderListProps {
  keyword: string;
  categories: MockExamCategory[];
  loading?: boolean;
  handleToggleBookmark: (categoryId: number) => Promise<void>;
}

const HomeSearchedFolderList: React.FC<HomeSearchedFolderListProps> = ({
  keyword,
  categories,
  loading,
  handleToggleBookmark,
}) => {
  return (
    <HomeSearchedListTemplate keyword={keyword}>
      {!loading && (
        <CategoryFolderList
          categories={categories}
          handleToggleBookmark={handleToggleBookmark}
        />
      )}
      {loading && <HomeSearchLoader />}
    </HomeSearchedListTemplate>
  );
};

export default HomeSearchedFolderList;
