import useStoreItems from '@lib/hooks/useStoreItems.query';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface StorePaginationProps {}

const StorePagination: React.FC<StorePaginationProps> = () => {
  const router = useRouter();
  const { data, page, limit } = useStoreItems();
  if (!data?.getItems?.items) return null;
  return (
    <div className="flex justify-center items-center mt-5">
      <Pagination
        total={data.getItems.totalCount}
        pageSize={limit}
        current={page}
        onChange={(page) => {
          router.push({
            query: {
              ...router.query,
              page,
            },
          });
        }}
      />
    </div>
  );
};

export default StorePagination;
