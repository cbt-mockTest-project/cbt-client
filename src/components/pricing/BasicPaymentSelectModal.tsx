import { Button, Modal, ModalProps, Select } from 'antd';
import AttachMoneyIcon from '@assets/svg/won_sign.svg';
import React, { useEffect, useMemo } from 'react';
import { checkRole, makeMoneyString } from '@lib/utils/utils';
import usePayment from './usePayment';
import { useMeQuery } from '@lib/graphql/hook/useUser';

interface BasicPaymentSelectModalModalProps
  extends Omit<ModalProps, 'children'> {
  title: string;
  onClose: () => void;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
}

const BasicPaymentSelectModalModal: React.FC<
  BasicPaymentSelectModalModalProps
> = (props) => {
  const { onClose, setPrice, price, title, ...modalProps } = props;
  const { data: meQuery } = useMeQuery();
  const [selectedRoleId, setSelectedRoleId] = React.useState<number>(1);
  const { handlePayment } = usePayment();
  const periodOptions = [
    { label: '3개월', value: 1 },
    { label: '12개월', value: 2 },
    { label: '무제한', value: 3 },
  ];
  const handleBasicPayment = async (roleId: number) => {
    await handlePayment({
      orderName: `모두CBT 베이직 플랜 - ${
        periodOptions.find((el) => el.value === roleId)?.label
      }`,
      price,
      roleId,
      checkRoleIds: [roleId],
    });
    onClose();
  };
  const isUsingLicense = useMemo(
    () =>
      checkRole({
        roleIds: [selectedRoleId],
        meQuery,
      }),
    [selectedRoleId]
  );
  useEffect(() => {
    setPrice(9900);
  }, []);
  return (
    <Modal {...modalProps} footer={false} onCancel={onClose}>
      <div className="text-base font-bold">{title}</div>
      <div className="mt-3 flex items-end">
        <AttachMoneyIcon class="w-7 h-7 mr-2" />
        <div className="text-2xl font-bold">{makeMoneyString(price)}</div>
        <div className="text-lg ml-1">원</div>
      </div>
      <Select
        className="w-full mt-3"
        size="large"
        placeholder="이용기간을 선택해주세요"
        options={periodOptions}
        defaultValue={periodOptions[0].value}
        onChange={(value) => {
          if (value === 1) {
            setPrice(9900);
            setSelectedRoleId(1);
          }
          if (value === 2) {
            setPrice(19900);
            setSelectedRoleId(2);
          }
          if (value === 3) {
            setPrice(49900);
            setSelectedRoleId(3);
          }
        }}
      />
      <Button
        type="primary"
        size="large"
        className="w-full mt-3"
        disabled={isUsingLicense || !selectedRoleId}
        onClick={() => handleBasicPayment(selectedRoleId)}
      >
        {isUsingLicense ? '이미 이용중입니다.' : '결제하기'}
      </Button>
    </Modal>
  );
};
export default BasicPaymentSelectModalModal;
