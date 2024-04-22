import { Input } from 'antd';
import React from 'react';

interface StoreSearchProps {}

const StoreSearch: React.FC<StoreSearchProps> = () => {
  return (
    <div>
      <Input.Search size="large" placeholder="자료를 검색하세요." />
    </div>
  );
};

export default StoreSearch;
