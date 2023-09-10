import Modal, { ModalProps } from '@components/common/modal/Modal';
import AttachMoneyIcon from '@assets/svg/won_sign.svg';
import { Button, Input, Select } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { makeMoneyString } from '@lib/utils/utils';
import usePayment from './usePayment';

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

const categoryOptions = [{ label: '산업안전기사', value: 1 }];

const PricingSelectModal: React.FC<PricingSelectModalProps> = (props) => {
  const { price, setPrice, ...modalProps } = props;
  const { handlePayment } = usePayment();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('');
  const handleEhsMasterPayment = () => {
    handlePayment({
      orderName: `모두CBT 직8딴 플랜 ${
        selectedCategoryName ? `-${selectedCategoryName}` : ''
      }`,
      price,
      roleId: 4,
      checkRoleIds: [4],
    });
    modalProps.onClose();
  };
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
            console.log(option);
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
          />
          <Button
            size="large"
            onClick={() => {
              setPrice((el) => 0.5 * el);
            }}
          >
            적용
          </Button>
        </div>
        <Button
          className="pricing-select-modal-pay-button"
          size="large"
          type="primary"
          disabled={!selectedCategoryId}
          onClick={handleEhsMasterPayment}
        >
          결제하기
        </Button>
      </div>
    </PricingSelectModalBlock>
  );
};

export default PricingSelectModal;
