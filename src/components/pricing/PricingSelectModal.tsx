import Modal, { ModalProps } from '@components/common/modal/Modal';
import AttachMoneyIcon from '@assets/svg/won_sign.svg';
import { Button, Input, Select, message } from 'antd';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { checkRole, makeMoneyString } from '@lib/utils/utils';
import usePayment from './usePayment';
import { useCheckDiscountCode } from '@lib/graphql/user/hook/useDiscount';
import useInput from '@lib/hooks/useInput';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';

const PricingSelectModalBlock = styled(Modal)`
  padding: 30px 20px;
  .pricing-select-modal-content {
    margin-top: 0px;
  }
  .pricing-select-modal-title {
    font-size: 16px;
    font-weight: bold;
  }
  .pricing-select-modal-select {
    margin-top: 10px;
    width: 100%;
  }
  .modal-close-button {
    right: -15px;
    top: -25px;
  }
  .pricing-select-modal-price-wrapper {
    display: flex;
    align-items: center;
    margin-top: 10px;
    position: relative;
    right: 6px;
  }
  .pricing-select-modal-price-icon {
    position: relative;
    margin-right: 20px;
    top: 4px;
    left: 4px;
    svg {
      width: 24px;
      height: 24px;
      font-size: 2rem;
    }
  }
  .pricing-select-modal-price-value {
    font-size: 1.5rem;
    font-weight: bold;
    position: relative;
    right: 5px;
  }
  .pricing-select-modal-price-label {
    position: relative;
    right: 2px;
    top: 4px;
  }

  .pricing-select-modal-discount-wrapper {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 10px;
  }
  .pricing-select-modal-pay-button {
    width: 100%;
    margin-top: 10px;
  }
`;

interface PricingSelectModalProps extends Omit<ModalProps, 'children'> {
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
}
// value 는 roleId 와 동일하게 간다.
const categoryOptions = [
  { label: '산업안전기사', value: 4 },
  { label: '건설안전기사', value: 5 },
];

const PricingSelectModal: React.FC<PricingSelectModalProps> = (props) => {
  const { price, setPrice, ...modalProps } = props;
  const { handlePayment } = usePayment();
  const { data: meQuery } = useMeQuery();
  const { value: discountCode, onChange: onChangeDiscountCode } = useInput('');
  const [isUsedDiscountCode, setIsUsedDiscountCode] = useState<boolean>(false);
  const [checkDiscountCode, { loading: checkDiscountCodeLoading }] =
    useCheckDiscountCode();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('');
  const handleEhsMasterPayment = async (roleId: number) => {
    await handlePayment({
      orderName: `모두CBT 직8딴 플랜 ${
        selectedCategoryName ? `-${selectedCategoryName}` : ''
      }`,
      price,
      roleId,
      checkRoleIds: [roleId],
      discountCode,
    });
    modalProps.onClose();
  };

  const handleApplyDiscount = async () => {
    const res = await checkDiscountCode({
      variables: {
        input: {
          code: discountCode,
        },
      },
    });
    if (res.data?.checkDiscountCode.ok) {
      setPrice(5000);
      message.success('할인코드가 적용되었습니다.');
      setIsUsedDiscountCode(true);
      return;
    }
    message.error(res.data?.checkDiscountCode.error);
  };

  const isUsingLicense = useMemo(
    () =>
      checkRole({
        roleIds: [selectedCategoryId],
        meQuery,
      }),
    [selectedCategoryId]
  );
  return (
    <PricingSelectModalBlock {...modalProps}>
      <div className="pricing-select-modal-content">
        <p className="pricing-select-modal-title">{`직8딴 플랜 ${
          selectedCategoryName ? ` - ${selectedCategoryName}` : ''
        }`}</p>
        <div className="pricing-select-modal-price-wrapper">
          <span className="pricing-select-modal-price-icon">
            <AttachMoneyIcon />
          </span>

          <span className="pricing-select-modal-price-value">
            {makeMoneyString(price)}
          </span>
          <span className="pricing-select-modal-price-label">원</span>
        </div>
        <Select
          placeholder="자격증을 선택해주세요"
          className="pricing-select-modal-select"
          size="large"
          options={categoryOptions}
          onChange={(value, option) => {
            setSelectedCategoryId(value);
            if (!Array.isArray(option)) setSelectedCategoryName(option.label);
          }}
          value={selectedCategoryId || null}
        />
        <div className="pricing-select-modal-discount-wrapper">
          <Input
            className="pricing-select-modal-discount-input"
            placeholder="할인코드"
            size="large"
            value={discountCode}
            onChange={onChangeDiscountCode}
          />
          <Button
            size="large"
            disabled={isUsedDiscountCode || !discountCode}
            onClick={handleApplyDiscount}
            loading={checkDiscountCodeLoading}
          >
            적용
          </Button>
        </div>
        <Button
          className="pricing-select-modal-pay-button"
          size="large"
          type="primary"
          disabled={!selectedCategoryId || isUsingLicense}
          onClick={() => handleEhsMasterPayment(selectedCategoryId)}
        >
          {isUsingLicense ? '이용중인 과목입니다.' : '결제하기'}
        </Button>
      </div>
    </PricingSelectModalBlock>
  );
};

export default PricingSelectModal;
