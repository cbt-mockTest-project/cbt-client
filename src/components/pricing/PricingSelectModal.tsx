import Modal, { ModalProps } from '@components/common/modal/Modal';
import AttachMoneyIcon from '@assets/svg/won_sign.svg';
import { Button, Input, Select, App } from 'antd';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { checkRole, makeMoneyString } from '@lib/utils/utils';
import usePayment from './usePayment';
import { useCheckDiscountCode } from '@lib/graphql/hook/useDiscount';
import useInput from '@lib/hooks/useInput';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { coreActions } from '@modules/redux/slices/core';
import { loginModal } from '@lib/constants';

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
      color: ${({ theme }) => theme.color('colorText')};
      * {
        fill: ${({ theme }) => theme.color('colorText')};
      }
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
const 만팔천원과목리스트 = [5, 8];
const 만육천원과목리스트 = [4];
const 만오천원과목리스트 = [7, 9];
const 만사천원과목리스트 = [6];
const categoryOptions = [
  { label: '산업안전기사', value: 4 },
  { label: '산업안전산업기사', value: 5 },
  { label: '위험물산업기사', value: 6 },
  { label: '인간공학기사', value: 9 },
  { label: '산업위생관리기사', value: 10 },
  { label: '대기환경기사', value: 7 },
  { label: '건설안전기사', value: 8 },
];

const PricingSelectModal: React.FC<PricingSelectModalProps> = (props) => {
  const { message } = App.useApp();
  const { price, setPrice, ...modalProps } = props;
  const { handlePayment } = usePayment();
  const { data: meQuery } = useMeQuery();
  const dispatch = useAppDispatch();
  const { value: discountCode, onChange: onChangeDiscountCode } = useInput('');
  const [isUsedDiscountCode, setIsUsedDiscountCode] = useState<boolean>(false);
  const openLoginModal = () => dispatch(coreActions.openModal(loginModal));
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
    if (!meQuery?.me.user) {
      openLoginModal();
      return;
    }
    const res = await checkDiscountCode({
      variables: {
        input: {
          code: discountCode,
        },
      },
    });
    if (res.data?.checkDiscountCode.ok) {
      setPrice(6000);
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
            if (만팔천원과목리스트.includes(value)) {
              setPrice(18000);
            }
            if (만육천원과목리스트.includes(value)) {
              setPrice(16000);
            }
            if (만오천원과목리스트.includes(value)) {
              setPrice(15000);
            }
            if (만사천원과목리스트.includes(value)) {
              setPrice(14000);
            }
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
