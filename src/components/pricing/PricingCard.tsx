import React, { useEffect } from 'react';
import styled from 'styled-components';
import AttachMoneyIcon from '@assets/svg/won_sign.svg';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Button } from 'antd';
import palette from '@styles/palette';
import { makeMoneyString } from '@lib/utils/utils';
import Portal from '@components/common/portal/Portal';
import PaymentNoticeModal from '@components/common/modal/PaymentNoticeModal';
import useToggle from '@lib/hooks/useToggle';
import { useLazyGetRoleCount } from '@lib/graphql/user/hook/useUser';
import SkeletonBox from '@components/common/skeleton/SkeletonBox';

const PricingCardBlock = styled.div`
  .pricing-card-title {
    margin-bottom: 10px;
  }
  .pricing-card-intro {
    font-size: 14px;
    height: 44px;
  }
  .pricing-card-price-wrapper {
    display: flex;
    align-items: center;
    margin-top: 10px;
    position: relative;
    right: 6px;
  }
  .pricing-card-price-icon {
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
  .pricing-card-price-value {
    font-size: 1.5rem;
    font-weight: bold;
    position: relative;
    right: 5px;
  }
  .pricing-card-price-label {
    position: relative;
    right: 2px;
    top: 4px;
  }
  .pricing-button {
    border-radius: 5px;
    margin-top: 20px;
    width: 100%;
    height: 40px;
  }
  .pricing-card-benefit {
    margin-top: 20px;
  }
  .pricing-card-benefit-title {
    font-weight: bold;
  }
  .pricing-card-benefit-list {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .pricing-card-benefit-list-item {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .pricing-card-benefit-list-item-content {
    font-size: 15px;
  }
  .pricing-card-benefit-list-item-icon {
    color: ${palette.antd_blue_01};
    font-size: 15px;
    position: relative;
    top: 2px;
  }
  .pricing-card-temp-text {
    margin-top: 10px;
    font-size: 24px;
    font-weight: bold;
  }
  .pricing-card-before-discount-price-value {
    font-size: 1.2rem;
    color: ${palette.gray_700};
    font-weight: bold;
    text-decoration: line-through;
  }
  .pricing-card-before-discount-wrapper {
    display: flex;
    align-items: flex-end;
  }
  .pricing-card-before-discount-price-notice {
    margin-left: 10px;
    font-size: 14px;
    color: ${palette.red_500};
    font-weight: bold;
  }
  .pricing-card-price-user-count {
    color: ${palette.blue_500};
    font-size: 14px;
    vertical-align: text-bottom;
    position: relative;
  }
`;

export interface PricingCardProps {
  title: string;
  intro: string;
  price: number;
  beforeDiscountPrice?: number;
  benefits: string[];
  onConfirm: () => void;
  confirmLabel?: string;
  disabledLabel?: string;
  hasBeforePaymentModal?: boolean;
  isTempText?: string;
  confirmDisabled?: boolean;
  isFreeTrial?: boolean;
  roleId?: number;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  intro,
  price,
  benefits,
  isTempText,
  onConfirm,
  hasBeforePaymentModal,
  confirmDisabled,
  beforeDiscountPrice,
  roleId,
  confirmLabel = '결제하기',
  disabledLabel = '이용중',
}) => {
  const [getRoleCount, { data: roleCountQuery }] = useLazyGetRoleCount();
  const {
    value: paymentNoticeModalState,
    onToggle: onTogglePaymentNoticeModal,
  } = useToggle(false);
  useEffect(() => {
    if (roleId) {
      getRoleCount({ variables: { input: { roleId } } });
    }
  }, []);

  return (
    <PricingCardBlock>
      <h3 className="pricing-card-title">{title}</h3>
      <p className="pricing-card-intro">{intro}</p>
      {isTempText ? (
        <div className="pricing-card-temp-text">{isTempText}</div>
      ) : (
        <>
          {beforeDiscountPrice ? (
            <div className="pricing-card-before-discount-wrapper">
              <div className="pricing-card-before-discount-price-value">
                {makeMoneyString(beforeDiscountPrice)}
              </div>
              <div className="pricing-card-before-discount-price-notice">
                ~ 05.31까지
              </div>
            </div>
          ) : (
            <div style={{ height: '30.17px' }} />
          )}
          <p className="pricing-card-price-wrapper">
            <span className="pricing-card-price-icon">
              <AttachMoneyIcon />
            </span>

            <span className="pricing-card-price-value">
              {makeMoneyString(price)}
            </span>
            <span className="pricing-card-price-label">원</span>
          </p>
          {roleCountQuery?.getRoleCount.count ? (
            <div className="pricing-card-price-user-count">{`현재 ${roleCountQuery?.getRoleCount.count}명 이용중!! `}</div>
          ) : (
            <SkeletonBox
              className="pricing-card-price-user-count"
              width="110px"
              height="20px"
            />
          )}
          <Button
            className="pricing-button"
            type="primary"
            disabled={confirmDisabled}
            onClick={
              hasBeforePaymentModal ? onTogglePaymentNoticeModal : onConfirm
            }
          >
            {confirmDisabled ? disabledLabel : confirmLabel}
          </Button>
          <div className="pricing-card-benefit">
            <p className="pricing-card-benefit-title">혜택</p>
            <ul className="pricing-card-benefit-list">
              {benefits.map((benefit) => (
                <li key={benefit} className="pricing-card-benefit-list-item">
                  <span className="pricing-card-benefit-list-item-icon">
                    <DoneAllIcon />
                  </span>
                  <span className="pricing-card-benefit-list-item-content">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <Portal>
        {hasBeforePaymentModal && paymentNoticeModalState && (
          <PaymentNoticeModal
            handlePayment={onConfirm}
            open={paymentNoticeModalState}
            onClose={onTogglePaymentNoticeModal}
          />
        )}
      </Portal>
    </PricingCardBlock>
  );
};

export default PricingCard;
