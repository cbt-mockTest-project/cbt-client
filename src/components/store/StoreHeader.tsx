import React from 'react';
import { StarFilled } from '@ant-design/icons';
import { Button } from 'antd';
import Link from 'next/link';

interface StoreHeaderProps {}

const StoreHeader: React.FC<StoreHeaderProps> = () => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-2 items-center">
        <div className="text-yellow-500">
          <StarFilled className="text-2xl" />
        </div>
        <p className="text-lg font-bold">암기장 스토어</p>
      </div>
      <Link href="/store/create">
        <Button type="primary">자료 등록</Button>
      </Link>
    </div>
  );
};

export default StoreHeader;
