import React from 'react';
import styled from 'styled-components';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Button } from 'antd';
import palette from '@styles/palette';
import { makeMoneyString } from '@lib/utils/utils';

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
    top: 3px;
    svg {
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
`;

export interface PricingCardProps {
  title: string;
  intro: string;
  price: number;
  benefits: string[];
  handlePayment: React.MouseEventHandler<HTMLElement>;
  isTempText?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  intro,
  price,
  benefits,
  isTempText,
  handlePayment,
}) => {
  return (
    <PricingCardBlock>
      <h3 className="pricing-card-title">{title}</h3>
      <p className="pricing-card-intro">{intro}</p>
      {isTempText ? (
        <div className="pricing-card-temp-text">{isTempText}</div>
      ) : (
        <>
          <p className="pricing-card-price-wrapper">
            <span className="pricing-card-price-icon">
              <AttachMoneyIcon />
            </span>
            <span className="pricing-card-price-value">
              {makeMoneyString(price)}
            </span>
            <span className="pricing-card-price-label">원</span>
          </p>
          <Button
            className="pricing-button"
            type="primary"
            onClick={handlePayment}
          >
            결제하기
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
    </PricingCardBlock>
  );
};

export default PricingCard;
