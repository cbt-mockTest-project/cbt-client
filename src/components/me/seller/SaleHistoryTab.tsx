import { useGetBuyers } from '@lib/graphql/hook/useSeller';
import { convertServerTimeToKST } from '@lib/utils/utils';
import { Table } from 'antd';
import React, { ComponentProps, useMemo, useState } from 'react';
import styled from 'styled-components';

const SaleHistoryTabBlock = styled.div``;

interface SaleHistoryTabProps {}

const SaleHistoryTab: React.FC<SaleHistoryTabProps> = () => {
  // const [totalPrice, setTotalPrice] = useState(0);
  const { data: getBuyersQuery, loading: getBuyersLoading } = useGetBuyers();
  const salesData = useMemo(() => {
    if (!getBuyersQuery?.getBuyers.userAndRoles) return [];
    return getBuyersQuery?.getBuyers.userAndRoles.map((userAndRole) => {
      return {
        key: userAndRole.id,
        productName: userAndRole.role.name,
        buyer: userAndRole.user?.nickname || '탈퇴한 회원',
        date: convertServerTimeToKST(userAndRole.created_at, 'yy.MM.dd HH:mm'),
        price: `${new Intl.NumberFormat('ko-KR').format(userAndRole.price)}원`,
      };
    });
  }, [getBuyersQuery?.getBuyers.userAndRoles]);

  const columns = [
    {
      title: '상품명',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: '구매자',
      dataIndex: 'buyer',
      key: 'buyer',
    },
    {
      title: '구매일',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '결제금액',
      dataIndex: 'price',
      key: 'price',
    },
  ];

  const totalPrice = useMemo(() => {
    if (!getBuyersQuery?.getBuyers.userAndRoles) return 0;
    return getBuyersQuery?.getBuyers.userAndRoles.reduce(
      (acc, cur) => acc + cur.price,
      0
    );
  }, [getBuyersQuery?.getBuyers.userAndRoles]);
  return (
    <SaleHistoryTabBlock>
      <Table
        columns={columns}
        dataSource={salesData}
        loading={getBuyersLoading}
        footer={() => (
          <div>{`총 판매금액: ${new Intl.NumberFormat('ko-KR').format(
            totalPrice
          )}원`}</div>
        )}
      />
    </SaleHistoryTabBlock>
  );
};

export default SaleHistoryTab;
