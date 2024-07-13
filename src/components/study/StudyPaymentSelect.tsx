import usePayment from '@components/pricing/usePayment';
import { useCheckDiscountCode } from '@lib/graphql/hook/useDiscount';
import useInput from '@lib/hooks/useInput';
import { makeMoneyString } from '@lib/utils/utils';
import AttachMoneyIcon from '@assets/svg/won_sign.svg';
import { Button, Input, Select, App } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

const StudyPaymentSelectBlock = styled.div`
  width: 100%;
  .study-payment-select-content {
    margin-top: 0px;
  }
  .study-payment-select-title {
    font-size: 16px;
    font-weight: bold;
  }
  .study-payment-select-select {
    margin-top: 10px;
    width: 100%;
  }
  .modal-close-button {
    right: -15px;
    top: -25px;
  }
  .study-payment-select-price-wrapper {
    display: flex;
    align-items: center;
    margin-top: 10px;
    position: relative;
    right: 6px;
  }
  .study-payment-select-price-icon {
    position: relative;
    margin-right: 20px;
    top: 4px;
    left: 4px;
    svg {
      fill: ${({ theme }) => theme.color('colorText')};
      width: 24px;
      height: 24px;
      font-size: 2rem;
    }
  }
  .study-payment-select-price-value {
    font-size: 1.5rem;
    font-weight: bold;
    position: relative;
    right: 5px;
  }
  .study-payment-select-price-label {
    position: relative;
    right: 2px;
    top: 4px;
  }

  .study-payment-select-discount-wrapper {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 10px;
  }
  .study-payment-select-pay-button {
    width: 100%;
    margin-top: 10px;
  }
`;

interface StudyPaymentSelectProps {}

const StudyPaymentSelect: React.FC<StudyPaymentSelectProps> = ({}) => {
  const { message } = App.useApp();
  const [price, setPrice] = useState(0);
  const { handlePayment } = usePayment();
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
      setPrice(6000);
      message.success('할인코드가 적용되었습니다.');
      setIsUsedDiscountCode(true);
      return;
    }
    message.error(res.data?.checkDiscountCode.error);
  };

  return (
    <StudyPaymentSelectBlock>
      <div className="study-payment-select-content">
        <p className="study-payment-select-title">{`직8딴 플랜 ${
          selectedCategoryName ? ` - ${selectedCategoryName}` : ''
        }`}</p>
        <div className="study-payment-select-price-wrapper">
          <span className="study-payment-select-price-icon">
            <AttachMoneyIcon />
          </span>

          <span className="study-payment-select-price-value">
            {makeMoneyString(price)}
          </span>
          <span className="study-payment-select-price-label">원</span>
        </div>
        <Select
          placeholder="자격증을 선택해주세요"
          className="study-payment-select-select"
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
        <div className="study-payment-select-discount-wrapper">
          <Input
            className="study-payment-select-discount-input"
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
          className="study-payment-select-pay-button"
          size="large"
          type="primary"
          disabled={!selectedCategoryId}
          onClick={() => handleEhsMasterPayment(selectedCategoryId)}
        >
          결제하기
        </Button>
      </div>
    </StudyPaymentSelectBlock>
  );
};

export default StudyPaymentSelect;

const 만팔천원과목리스트 = [5, 8];
const 만육천원과목리스트 = [4];
const 만오천원과목리스트 = [7, 9, 10];
const 만사천원과목리스트 = [6];
const categoryOptions = [
  { label: '산업안전기사', value: 4 },
  { label: '산업안전산업기사', value: 5 },
  { label: '위험물산업기사', value: 6 },
  { label: '대기환경기사', value: 7 },
  { label: '건설안전기사', value: 8 },
  { label: '인간공학기사', value: 9 },
  { label: '산업위생기사', value: 10 },
];
