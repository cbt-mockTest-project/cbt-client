import { Input } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

interface StoreSearchProps {}

const StoreSearch: React.FC<StoreSearchProps> = () => {
  const router = useRouter();
  return (
    <div>
      <Input.Search
        size="large"
        placeholder="자료를 검색하세요."
        onSearch={(value) => {
          router.push({
            query: {
              ...router.query,
              s: value,
            },
          });
        }}
      />
    </div>
  );
};

export default StoreSearch;
