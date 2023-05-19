import { useGetMyPayments } from '@lib/graphql/user/hook/usePayment';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Button, Spin } from 'antd';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface PaymentHistoryComponentProps {}

const PaymentHistoryComponent: React.FC<PaymentHistoryComponentProps> = () => {
  const { data: paymentsResponse, loading: getPaymentsLoading } =
    useGetMyPayments();
  const mock = [
    {
      id: 1,
      productName: '베이직플랜',
      price: 5000,
      date: '2022년 1월 31일 19시',
      receiptUrl: 'https://www.naver.com',
    },
    {
      id: 2,
      productName: '베이직플랜',
      price: 30000,
      date: '2022년 1월 31일 19시',
      receiptUrl: 'https://www.naver.com',
    },
    {
      id: 3,
      productName: '베이직플랜',
      price: 5000,
      date: '2022년 1월 31일 19시',
      receiptUrl: 'https://www.naver.com',
    },
  ];

  return (
    <PaymentHistoryComponentBlock>
      <h3>결제내역을 보여주는 페이지입니다.</h3>
      <div className="payment-history-table-wrapper">
        {getPaymentsLoading && (
          <div className="payment-history-loading">
            <Spin size="large" />
          </div>
        )}
        {!getPaymentsLoading &&
          (paymentsResponse?.getMyPayments.payments &&
          paymentsResponse?.getMyPayments.payments?.length >= 1 ? (
            <table className="payment-history-table">
              <thead>
                <tr>
                  <th className="payment-history-table-head">결제항목</th>
                  <th className="payment-history-table-head">결제금액</th>
                  <th className="payment-history-table-head">결제일</th>
                  <th className="payment-history-table-head">영수증</th>
                </tr>
              </thead>
              <tbody>
                {paymentsResponse?.getMyPayments.payments?.map((payment) => (
                  <tr key={payment.id}>
                    <td className="payment-history-table-data">
                      {payment.productName}
                    </td>
                    <td className="payment-history-table-data">
                      {payment.price}
                    </td>
                    <td className="payment-history-table-data">
                      {format(
                        parseISO(payment.updated_at),
                        'yyyy년 MM월 dd일 HH시 mm분'
                      )}
                    </td>
                    <td className="payment-history-table-data">
                      <a
                        href={String(payment.receiptUrl)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        보기
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="payment-history-table-empty">
              <div className="payment-history-table-empty-data">
                결제 내역이 없습니다.
              </div>
              <Link href="/pricing/basic">
                <Button
                  type="primary"
                  className="payment-history-table-empty-button"
                >
                  프리미엄서비스 가입하기
                </Button>
              </Link>
            </div>
          ))}
      </div>
    </PaymentHistoryComponentBlock>
  );
};

export default PaymentHistoryComponent;

const PaymentHistoryComponentBlock = styled.div`
  .payment-history-table-wrapper {
    overflow-x: auto;
  }
  .payment-history-table {
    width: 100%;
    margin-top: 20px;
    min-width: 800px;
  }
  .payment-history-table-head,
  .payment-history-table-data {
    text-align: left;
    border: 1px solid ${palette.gray_200};
    padding: 10px 15px;
  }
  .payment-history-table-data {
    a {
      color: ${palette.blue_600};
    }
  }
  .payment-history-table-empty {
    display: flex;
    flex-direction: column;
  }
  .payment-history-table-empty-data {
    margin-top: 30px;
  }
  .payment-history-table-empty-button {
    margin-top: 10px;
    height: 40px;
    width: 200px;
  }
  .payment-history-loading {
    margin-top: 30px;
  }

  @media (max-width: ${responsive.medium}) {
    margin-top: 20px;
    padding: 0 20px;
  }
`;
