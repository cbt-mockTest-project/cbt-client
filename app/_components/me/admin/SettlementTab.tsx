import { settlementRequestsQueryOptions } from '../../../_lib/queryOptions/settlementRequests';
import { convertServerTimeToKST } from '../../../_lib/utils/utils';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
import React, { ComponentProps } from 'react';
import SettlementStatusSelect from './SettlementStatusSelect';

interface SettlementTabProps {}

const SettlementTab: React.FC<SettlementTabProps> = () => {
  const { data, isLoading } = useQuery(settlementRequestsQueryOptions);
  const dataSource = data?.getSettlementRequests?.settlementRequests.map(
    (settlementRequest) => ({
      id: settlementRequest.id,
      email: settlementRequest.user.email,
      date: convertServerTimeToKST(settlementRequest.created_at),
      amount: settlementRequest.amount,
      status: (
        <SettlementStatusSelect
          defaultStatus={settlementRequest.status}
          id={settlementRequest.id}
        />
      ),
      accountNumber: settlementRequest.accountNumber,
      accountHolder: settlementRequest.accountHolder,
    })
  );

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} loading={isLoading} />
    </div>
  );
};

const columns: ComponentProps<typeof Table>['columns'] = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '이메일',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '출금 신청일',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '금액',
    dataIndex: 'amount',
    key: 'amount',
  },

  {
    title: '계좌번호',
    dataIndex: 'accountNumber',
    key: 'accountNumber',
  },
  {
    title: '예금주',
    dataIndex: 'accountHolder',
    key: 'accountHolder',
  },
  {
    title: '상태',
    dataIndex: 'status',
    key: 'status',
  },
];

export default SettlementTab;
