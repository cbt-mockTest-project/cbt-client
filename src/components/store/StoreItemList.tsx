import React from 'react';
import styled from 'styled-components';
import StoreItem from './StoreItem';

interface StoreItemListProps {}

const StoreItemList: React.FC<StoreItemListProps> = () => {
  return (
    <div className="mt-8 flex flex-col gap-4 overflow-x-auto">
      {Array.from({ length: 10 }).map((_, index) => (
        <StoreItem key={index} />
      ))}
    </div>
  );
};

export default StoreItemList;
