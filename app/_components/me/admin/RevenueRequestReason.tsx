import { updateRevenueRequestFormMutation } from '../../../_lib/mutation/revenueRequestForm';
import { App, Button, Input } from 'antd';
import React, { useState } from 'react';

interface RevenueRequestReasonProps {
  defaultReason: string;
  id: number;
}

const RevenueRequestReason: React.FC<RevenueRequestReasonProps> = ({
  defaultReason,
  id,
}) => {
  const { modal } = App.useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [reason, setReason] = useState(defaultReason);
  const onSave = () => {
    modal.confirm({
      title: '수익창출 신청 사유 변경',
      content: '수익창출 신청 사유를 변경하시겠습니까?',
      onOk: async () => {
        await updateRevenueRequestFormMutation({
          id,
          reason,
        });
        setIsEditing(false);
      },
    });
  };
  return (
    <div className="flex items-start gap-4">
      <Input.TextArea
        value={reason}
        disabled={!isEditing}
        onChange={(e) => setReason(e.target.value)}
      />
      {isEditing ? (
        <div className="flex flex-col gap-1">
          <Button type="primary" onClick={onSave}>
            저장
          </Button>
          <Button onClick={() => setIsEditing(false)}>취소</Button>
        </div>
      ) : (
        <Button onClick={() => setIsEditing(true)}>수정</Button>
      )}
    </div>
  );
};

export default RevenueRequestReason;
