import { getPointTransactionsForAdminQueryOptions } from '../../../_lib/queryOptions/pointTransaction';
import { convertServerTimeToKST } from '../../../_lib/utils/utils';
import { useQuery } from '@tanstack/react-query';
import { Input, Table } from 'antd';
import { useRouter } from 'next/router';
import React, { ComponentProps } from 'react';
import { TransactionType } from '../../../types';

interface PointCheckTabProps {}

const PointCheckTab: React.FC<PointCheckTabProps> = () => {
  const router = useRouter();
  const email = router.query.email as string;
  const { data } = useQuery(getPointTransactionsForAdminQueryOptions(email));
  const TransactionTypeText = {
    [TransactionType.Accumulation]: '적립',
    [TransactionType.Use]: '사용',
    [TransactionType.Withdraw]: '출금',
  };
  const dataSource = data?.getPointTransactionsForAdmin.pointTransactions.map(
    (transaction) => ({
      id: transaction.id,
      date: convertServerTimeToKST(transaction.created_at),
      point: transaction.point,
      type: TransactionTypeText[transaction.type],
      description: transaction.description,
    })
  );
  const totalPoint =
    data?.getPointTransactionsForAdmin.pointTransactions.reduce(
      (acc, cur) => acc + cur.point,
      0
    );
  return (
    <div>
      <Input.Search
        placeholder="email"
        size="large"
        onSearch={(value) => {
          router.push({
            query: { email: value },
          });
        }}
      />
      <div className="mt-4">
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={!data}
          pagination={{ pageSize: 10 }}
          summary={() => (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>합계</Table.Summary.Cell>
              <Table.Summary.Cell index={1}>{totalPoint}</Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />
      </div>
    </div>
  );
};

export default PointCheckTab;

const columns: ComponentProps<typeof Table>['columns'] = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '날짜',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '포인트',
    dataIndex: 'point',
    key: 'point',
  },
  {
    title: '타입',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '설명',
    dataIndex: 'description',
    key: 'description',
  },
];
