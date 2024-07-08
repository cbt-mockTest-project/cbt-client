import { revenueRequestFormsQueryOptions } from '../../../_lib/queryOptions/revenueRequestForms';
import { convertServerTimeToKST } from '../../../_lib/utils/utils';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
import Link from 'next/link';
import React, { ComponentProps } from 'react';
import RevenueRequestStatusSelect from './RevenueRequestStatusSelect';
import RevenueRequestReason from './RevenueRequestReason';

interface RevenueRequestTabProps {}

const RevenueRequestTab: React.FC<RevenueRequestTabProps> = () => {
  const { data, isLoading } = useQuery(revenueRequestFormsQueryOptions);
  const dataSource = data?.getRevenueRequestForms.revenueRequestForms.map(
    (form) => ({
      id: form.id,
      email: form.category.user.email,
      date: convertServerTimeToKST(form.created_at),
      categoryLink: (
        <Link href={'/category/' + form.category.urlSlug}>
          {form.category.urlSlug}
        </Link>
      ),
      reason: <RevenueRequestReason defaultReason={form.reason} id={form.id} />,
      status: (
        <RevenueRequestStatusSelect defaultStatus={form.status} id={form.id} />
      ),
    })
  );
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} loading={isLoading} />
    </div>
  );
};

export default RevenueRequestTab;

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
    title: '신청일',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '암기장주소',
    dataIndex: 'categoryLink',
    key: 'categoryLink',
  },
  {
    title: '사유',
    dataIndex: 'reason',
    key: 'reason',
  },
  {
    title: '상태',
    dataIndex: 'status',
    key: 'status',
  },
];
