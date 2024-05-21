import React from 'react';
import StoreSearch from './StoreSearch';
import StoreItemList from './StoreItemList';
import StorePagination from './StorePagination';
import StoreHeader from './StoreHeader';

interface StoreComponentProps {}

const StoreComponent: React.FC<StoreComponentProps> = () => {
  return (
    <div className="py-5 px-7">
      <StoreHeader />
      <StoreSearch />
      <StoreItemList />
      <StorePagination />
    </div>
  );
};

export default StoreComponent;
