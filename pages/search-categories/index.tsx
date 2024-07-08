import StorageLayout from '../../app/_components/common/layout/storage/StorageLayout';
import SearchCategoriesComponent from '../../app/_components/searchCategories/SearchCategoriesComponent';
import { StorageType } from '../../app/customTypes';
import { NextPage } from 'next';

const SearchCategoriesPage: NextPage = () => {
  return (
    <StorageLayout title="암기장 통합 검색" storageType={StorageType.SEARCH}>
      <SearchCategoriesComponent />
    </StorageLayout>
  );
};

export default SearchCategoriesPage;
