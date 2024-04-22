import { StarFilled } from '@ant-design/icons';
import React from 'react';
import StoreSearch from './StoreSearch';
import StoreItemList from './StoreItemList';
import StorePagination from './StorePagination';

interface StoreComponentProps {}

const StoreComponent: React.FC<StoreComponentProps> = () => {
  return (
    <div className="py-5 px-7">
      <div className="flex gap-2 items-center">
        <div className="text-yellow-500">
          <StarFilled className="text-2xl mb-3" />
        </div>
        <p className="text-lg font-bold mb-3">자료 스토어</p>
      </div>
      <StoreSearch />
      <StoreItemList />
      <StorePagination />
    </div>
  );
};

export default StoreComponent;
