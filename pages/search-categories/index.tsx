import StorageLayout from '@components/common/layout/storage/StorageLayout';
import SearchCategoriesComponent from '@components/searchCategories/SearchCategoriesComponent';
import { StorageType } from 'customTypes';
import { NextPage } from 'next';

const SearchCategoriesPage: NextPage = () => {
  return (
    <StorageLayout title="암기장 통합 검색" storageType={StorageType.SEARCH}>
      <SearchCategoriesComponent />
    </StorageLayout>
  );
};

export default SearchCategoriesPage;
