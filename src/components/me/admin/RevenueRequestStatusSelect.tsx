import { updateRevenueRequestFormMutation } from '@lib/mutation/revenueRequestForm';
import { updateSettlementRequestMutation } from '@lib/mutation/settlementRequest';
import { Modal, Select } from 'antd';
import React, { useState } from 'react';
import { RevenueRequestFormStatus, SettlementRequestStatus } from 'types';

interface RevenueRequestStatusSelectProps {
  defaultStatus: RevenueRequestFormStatus;
  id: number;
}

const RevenueRequestStatusSelect: React.FC<RevenueRequestStatusSelectProps> = ({
  defaultStatus,
  id,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(defaultStatus);
  const onSelect = (value: RevenueRequestFormStatus) => {
    Modal.confirm({
      title: '수익창출 신청 상태 변경',
      content: '수익창출 신청 상태를 변경하시겠습니까?',
      onOk: async () => {
        await updateRevenueRequestFormMutation({
          id,
          status: value,
        });
        setSelectedStatus(value);
      },
    });
  };
  return (
    <Select
      value={selectedStatus}
      options={[
        { label: '대기', value: RevenueRequestFormStatus.Pending },
        { label: '완료', value: RevenueRequestFormStatus.Approved },
        { label: '거절', value: RevenueRequestFormStatus.Rejected },
      ]}
      onSelect={onSelect}
    />
  );
};

export default RevenueRequestStatusSelect;
