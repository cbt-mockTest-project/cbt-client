import CategoryRevenueHistoryTableFooter from '@components/category/CategoryRevenueHistoryTableFooter';
import useMyPointTransactions from '@lib/hooks/useMyPointTransactions.query';
import { convertServerTimeToKST } from '@lib/utils/utils';
import { Button, Table, Tag } from 'antd';
import Link from 'next/link';
import React, { ComponentProps } from 'react';
import { TransactionType } from 'types';

interface MyPointHistoryTabProps {}

const MyPointHistoryTab: React.FC<MyPointHistoryTabProps> = () => {
  const { pointHistories, isLoading } = useMyPointTransactions();
  const makePointLabel = (point: number, type: TransactionType) => {
    if (type === TransactionType.Accumulation)
      return (
        <div className="flex items-center gap-2">
          <Tag color="blue">적립</Tag>
          <span>{point}</span>
        </div>
      );
    if (type === TransactionType.Use)
      return (
        <div className="flex items-center gap-2">
          <Tag color="red">사용</Tag>
          <span>{point}</span>
        </div>
      );
    if (type === TransactionType.Withdraw)
      return (
        <div className="flex items-center gap-2">
          <Tag color="orange">출금</Tag>
          <span>{point}</span>
        </div>
      );
    return '';
  };
  const dataSource = pointHistories.map((pointHistory) => ({
    point: makePointLabel(pointHistory.point, pointHistory.type),
    date: convertServerTimeToKST(pointHistory.created_at),
    description: pointHistory.description,
  }));
  const totalPoint = pointHistories.reduce((acc, cur) => {
    if (cur.type === TransactionType.Accumulation) return acc + cur.point;
    if (cur.type === TransactionType.Use) return acc - cur.point;
    if (cur.type === TransactionType.Withdraw) return acc - cur.point;
    return acc;
  }, 0);
  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        pagination={{
          pageSize: 10,
        }}
        footer={() => (
          <div className="flex justify-between items-center">
            <div className="text-gray-700">
              누적: {totalPoint.toLocaleString()} 포인트
            </div>
            <Link href="/me/settlement">
              <Button type="primary">정산하러 가기</Button>
            </Link>
          </div>
        )}
      />
    </div>
  );
};

const columns: ComponentProps<typeof Table>['columns'] = [
  {
    title: '포인트',
    dataIndex: 'point',
    key: 'point',
    width: '150px',
  },

  {
    title: '적립일',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '내용',
    dataIndex: 'description',
    key: 'description',
  },
];

export default MyPointHistoryTab;
