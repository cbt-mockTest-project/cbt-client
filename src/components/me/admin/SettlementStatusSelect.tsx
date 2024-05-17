import { updateSettlementRequestMutation } from '@lib/mutation/settlementRequest';
import { Modal, Select } from 'antd';
import React, { useState } from 'react';
import { SettlementRequestStatus } from 'types';

interface SettlementStatusSelectProps {
  defaultStatus: SettlementRequestStatus;
  id: number;
}

const SettlementStatusSelect: React.FC<SettlementStatusSelectProps> = ({
  defaultStatus,
  id,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(defaultStatus);
  const onSelect = (value: SettlementRequestStatus) => {
    Modal.confirm({
      title: '출금 요청 상태 변경',
      content: '출금 요청 상태를 변경하시겠습니까?',
      onOk: async () => {
        await updateSettlementRequestMutation({
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
        { label: '대기', value: SettlementRequestStatus.Pending },
        { label: '완료', value: SettlementRequestStatus.Approved },
        { label: '실패', value: SettlementRequestStatus.Rejected },
      ]}
      onSelect={onSelect}
    />
  );
};

export default SettlementStatusSelect;
