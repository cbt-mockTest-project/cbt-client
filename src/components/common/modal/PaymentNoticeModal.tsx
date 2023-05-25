import React from 'react';
import styled from 'styled-components';
import Modal, { ModalProps } from './Modal';
import palette from '@styles/palette';
import { Button } from 'antd';

const PaymentNoticeModalBlock = styled(Modal)`
  h3 {
    font-size: 20px;
  }
  ul {
    padding: 20px;
    li {
      + li {
        margin-top: 10px;
      }
      list-style: disc;
      b {
        color: ${palette.antd_blue_01};
      }
    }
  }
  a {
    color: ${palette.antd_blue_01};
  }
  .payment-notice-modal-warn {
    color: ${palette.red_500};
    font-size: 14px;
  }
  button {
    margin-top: 20px;
    width: 100%;
    height: 40px;
  }
`;

interface PaymentNoticeModalProps extends Omit<ModalProps, 'children'> {
  handlePayment: () => void;
}

const PaymentNoticeModal: React.FC<PaymentNoticeModalProps> = ({
  onClose,
  open,
  handlePayment,
}) => {
  return (
    <PaymentNoticeModalBlock onClose={onClose} open={open}>
      <div>
        <h3>결제 주의사항</h3>
        <ul>
          <li>
            카드사 승인대기중에 있어, 현재는 아래 카드사만 이용가능합니다.
          </li>
          <li>
            <b>카카오페이</b>, <b>토스페이</b>, <b>국민</b>, <b>신한</b>
          </li>
          <li>
            어플 이용시, <b>최신버전</b>으로 업데이트 후 이용해주세요.
          </li>
          {/* <a
            href="https://play.google.com/store/apps/details?id=com.moducbt&pli=1"
            target="_blank"
            rel="noreferrer"
          >
            업데이트 하러가기
          </a> */}
        </ul>
        <div className="payment-notice-modal-warn">
          ※ 위 사항을 준수하지 않을경우, 결제가 실패합니다.
        </div>
        <Button
          onClick={() => {
            handlePayment();
            onClose();
          }}
          type="primary"
        >
          결제하기
        </Button>
      </div>
    </PaymentNoticeModalBlock>
  );
};

export default PaymentNoticeModal;
