import { useMeQuery } from '@lib/graphql/hook/useUser';
import { convertServerTimeToKST } from '@lib/utils/utils';
import { Table } from 'antd';
import React, { ComponentProps, useMemo } from 'react';
import styled from 'styled-components';

const MyTicketTabBlock = styled.div``;

interface MyTicketTabProps {}

type CalculateRemainingPeriod = ({
  startDate,
  period,
  endDate,
}: {
  startDate: Date;
  period?: number;
  endDate?: string;
}) => string;

const MyTicketTab: React.FC<MyTicketTabProps> = () => {
  const { data: meQuery, loading } = useMeQuery();
  const calculateRemainingPeriod: CalculateRemainingPeriod = ({
    startDate,
    period,
    endDate,
  }) => {
    const today = new Date();
    let remainingDays: number;

    if (period) {
      const endDateFromPeriod = new Date(startDate);
      endDateFromPeriod.setDate(endDateFromPeriod.getDate() + period);
      remainingDays = Math.ceil(
        (endDateFromPeriod.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );
      return `${remainingDays}일`;
    } else if (endDate) {
      return `${endDate}`;
    } else {
      return '기간 정보 없음';
    }
  };
  const dataSource = meQuery?.me.user.userRoles.map((el) => ({
    name: el.role.name,
    startDate: convertServerTimeToKST(el.created_at),
    remainingPeriod: calculateRemainingPeriod({
      startDate: el.created_at,
      period: el.role.period,
      endDate: el.role.endDate,
    }),
  }));
  return (
    <MyTicketTabBlock>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={{
          pageSize: 10,
        }}
      />
    </MyTicketTabBlock>
  );
};

export default MyTicketTab;

const columns: ComponentProps<typeof Table>['columns'] = [
  {
    title: '이용권',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '시작일',
    dataIndex: 'startDate',
    key: 'startDate',
  },
  {
    title: '남은기간',
    dataIndex: 'remainingPeriod',
    key: 'remainingPeriod',
  },
];
