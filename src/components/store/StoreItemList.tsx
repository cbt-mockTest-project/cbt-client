import React from 'react';
import styled from 'styled-components';
import StoreItem from './StoreItem';
import useStoreItems from '@lib/hooks/useStoreItems.query';
import { Skeleton } from 'antd';
import { Item } from 'types';

interface StoreItemListProps {}

const StoreItemList: React.FC<StoreItemListProps> = () => {
  const { data, isLoading } = useStoreItems();
  return (
    <div className="mt-8 flex flex-col overflow-x-auto">
      {isLoading && (
        <div className="flex flex-col gap-4">
          <Skeleton active />
          <Skeleton active />
        </div>
      )}
      {data?.getItems.items.map((item) => (
        <StoreItem key={item.id} item={item as Item} />
      ))}
    </div>
  );
};

export default StoreItemList;
