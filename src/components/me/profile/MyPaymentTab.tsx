import { useGetMyPayments } from '@lib/graphql/hook/usePayment';
import { convertToKST } from '@lib/utils/utils';
import { Table } from 'antd';
import React, { ComponentProps, useMemo } from 'react';
import styled from 'styled-components';

const MyPaymentTabBlock = styled.div``;

interface MyPaymentTabProps {}

const MyPaymentTab: React.FC<MyPaymentTabProps> = () => {
  const { data: paymentsQuery, loading: getPaymentsLoading } =
    useGetMyPayments();

  const paymentData = useMemo(() => {
    if (!paymentsQuery?.getMyPayments.payments) return [];
    return paymentsQuery?.getMyPayments.payments.map((payment) => {
      return {
        key: payment.id,
        productName: payment.productName,
        price: payment.price,
        date: convertToKST(payment.created_at),
        receiptUrl: payment.receiptUrl ? (
          <a
            href={payment.receiptUrl.toString()}
            target="_blank"
            rel="noreferrer"
          >
            출력
          </a>
        ) : (
          ''
        ),
      };
    });
  }, [paymentsQuery?.getMyPayments.payments]);
  return (
    <MyPaymentTabBlock>
      <Table
        columns={columns}
        dataSource={paymentData}
        loading={getPaymentsLoading}
        pagination={false}
      />
    </MyPaymentTabBlock>
  );
};

export default MyPaymentTab;

const columns: ComponentProps<typeof Table>['columns'] = [
  {
    title: '결제항목',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: '결제금액',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '결제일',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '영수증',
    dataIndex: 'receiptUrl',
    key: 'receiptUrl',
  },
];
