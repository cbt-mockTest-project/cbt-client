import palette from '@styles/palette';
import { Button, Modal, ModalProps } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import AttachMoneyIcon from '@assets/svg/won_sign.svg';
import { DoneAll } from '@mui/icons-material';
import usePayment from '@components/pricing/usePayment';

const StudySolveLimitInfoModalBlock = styled(Modal)`
  .study-solve-limit-info-modal {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .study-solve-limit-info-modal-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .study-solve-limit-info-modal-content {
    font-size: 16px;
    margin-bottom: 15px;
  }
  .study-solve-limit-info-modal-date {
    margin-bottom: 15px;
    color: ${palette.colorSubText};
  }
  .study-solve-limit-info-modal-price {
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 20px;
    svg {
      width: 24px;
      height: 24px;
      position: relative;
      top: 5px;
    }
    .study-solve-limit-info-modal-price-tag {
      font-size: 14px;
      font-weight: normal;
    }
  }
  .study-solve-limit-info-modal-price-button {
    width: 150px;
    margin-bottom: 15px;
  }
  .study-solve-limit-info-modal-benefit-title {
    font-weight: bold;
    margin-bottom: 10px;
  }
  .study-solve-limit-info-modal-benefit-list {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    svg {
      margin-right: 10px;
      color: ${palette.antd_blue_02};
    }
  }
`;

interface StudySolveLimitInfoModalProps extends Omit<ModalProps, 'children'> {}

const StudySolveLimitInfoModal: React.FC<StudySolveLimitInfoModalProps> = (
  props
) => {
  const { ...modalProps } = props;
  const [isPricingTabOpen, setIsPricingTabOpen] = useState(false);
  const { handlePayment } = usePayment();
  const handleBasicPlanPayment = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    await handlePayment({
      orderName: '모두CBT 베이직 플랜',
      price: 12000,
      roleId: 1,
      checkRoleIds: [1, 2],
    });
    modalProps.onCancel(e);
  };
  return (
    <StudySolveLimitInfoModalBlock {...modalProps} footer={null}>
      <div className="study-solve-limit-info-modal">
        {isPricingTabOpen ? (
          <>
            <div className="study-solve-limit-info-modal-title">
              베이지 플랜
            </div>
            <div className="study-solve-limit-info-modal-date">
              이용기간: 3개월
            </div>
            <div className="study-solve-limit-info-modal-price">
              <AttachMoneyIcon /> 12,000
              <span className="study-solve-limit-info-modal-price-tag">
                {' '}
                원
              </span>
            </div>
            <Button
              className="study-solve-limit-info-modal-price-button"
              size="large"
              type="primary"
              onClick={handleBasicPlanPayment}
            >
              결제하기
            </Button>
            <div className="study-solve-limit-info-modal-benefit-title">
              혜택
            </div>
            <div className="study-solve-limit-info-modal-benefit-list">
              <DoneAll />
              <span>광고제거</span>
            </div>
            <div className="study-solve-limit-info-modal-benefit-list">
              <DoneAll />
              <span>무제한 문제풀이</span>
            </div>
          </>
        ) : (
          <>
            <div className="study-solve-limit-info-modal-title">
              오늘의 문제풀이권을 모두 사용하셨습니다 😊
            </div>
            <pre className="study-solve-limit-info-modal-content">{`제한 없는 학습을 원하신다면\n베이직 플랜에 가입해보세요!`}</pre>
            <Button type="primary" onClick={() => setIsPricingTabOpen(true)}>
              베이직 플랜 가입하기
            </Button>
          </>
        )}
      </div>
    </StudySolveLimitInfoModalBlock>
  );
};

export default StudySolveLimitInfoModal;