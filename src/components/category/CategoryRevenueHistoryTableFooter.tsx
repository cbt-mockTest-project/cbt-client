import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';

interface CategoryRevenueHistoryTableFooterProps {
  totalPoint: number;
}

const CategoryRevenueHistoryTableFooter: React.FC<
  CategoryRevenueHistoryTableFooterProps
> = ({ totalPoint }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-gray-700">
        총 수익: {totalPoint.toLocaleString()} 포인트
      </div>
      <Link href="/me/settlement">
        <Button type="primary">정산하러 가기</Button>
      </Link>
    </div>
  );
};

export default CategoryRevenueHistoryTableFooter;
