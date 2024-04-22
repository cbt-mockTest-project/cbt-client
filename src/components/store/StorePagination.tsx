import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface StorePaginationProps {}

const StorePagination: React.FC<StorePaginationProps> = () => {
  const router = useRouter();
  const page = router.query.page ? Number(router.query.page as string) : 1;
  return (
    <div className="flex justify-center items-center">
      <Pagination
        total={50}
        pageSize={10}
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
