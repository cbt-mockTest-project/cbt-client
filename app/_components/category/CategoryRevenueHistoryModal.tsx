import useCategoryPointHistories from '../../_lib/hooks/useCategoryPointHistories.query';
import { convertServerTimeToKST } from '../../_lib/utils/utils';
import { Modal, ModalProps, Table } from 'antd';
import React from 'react';
import styled from 'styled-components';
import CategoryRevenueHistoryTableFooter from './CategoryRevenueHistoryTableFooter';

const CategoryRevenueHistoryModalBlock = styled(Modal)``;

interface CategoryRevenueHistoryModalProps
  extends Omit<ModalProps, 'children'> {
  categoryId: number;
}

const CategoryRevenueHistoryModal: React.FC<
  CategoryRevenueHistoryModalProps
> = (props) => {
  const { categoryId, ...modalProps } = props;
  const { pointHistories, isLoading } = useCategoryPointHistories(categoryId);
  const columns = [
    {
      title: '날짜',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: '내용',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '포인트',
      dataIndex: 'point',
      key: 'point',
    },
    {
      title: '유저',
      dataIndex: 'buyer',
      key: 'buyer',
    },
  ];
  const dataSource = pointHistories.map((pointHistory) => ({
    created_at: convertServerTimeToKST(pointHistory.created_at),
    description: pointHistory.pointTransaction.description,
    point: pointHistory.pointTransaction.point,
    buyer: pointHistory.buyer.nickname,
  }));

  const totalPoint = dataSource.reduce((acc, cur) => acc + cur.point, 0);
  return (
    <CategoryRevenueHistoryModalBlock
      {...modalProps}
      title="수익 현황"
      footer={false}
    >
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 6 }}
        loading={isLoading}
        footer={() => (
          <CategoryRevenueHistoryTableFooter totalPoint={totalPoint} />
        )}
      />
    </CategoryRevenueHistoryModalBlock>
  );
};
export default CategoryRevenueHistoryModal;
