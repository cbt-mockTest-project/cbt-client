import { handleError, isServer, loadScript } from '@lib/utils/utils';
import { Button, message } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import shortid from 'shortid';
import styled from 'styled-components';

const BootPayComponentBlock = styled.div``;

interface BootPayComponentProps {}

const BootPayComponent: React.FC<BootPayComponentProps> = () => {
  useEffect(() => {
    if (!isServer()) {
      loadScript({
        url: 'https://js.bootpay.co.kr/bootpay-4.2.9.min.js',
        type: 'application/javascript',
      });
    }
  }, []);
  const handleBootPay = async () => {
    try {
      if (typeof window === 'undefined' || !(window as any).Bootpay) {
        // 기다려야 할 경우 최대 시간을 설정합니다.
        const maxWaitTime = 5000; // 5 seconds
        const startTime = Date.now();

        while (typeof window === 'undefined' || !(window as any).Bootpay) {
          await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms마다 확인

          if (Date.now() - startTime > maxWaitTime) {
            console.error('BootPay not found within the maximum wait time.');
            return;
          }
        }
      }
      const Bootpay = (window as any).Bootpay;
      const response = await Bootpay.requestPayment({
        application_id: process.env.NEXT_PUBLIC_BOOTPAY_APPLICATION_ID,
        price: 1000,
        order_name: '프리미엄회원 전환',
        order_id: 'TEST_ORDER_ID',
        pg: '토스',
        method: '카드',
        tax_free: 0,
        user: {
          id: '회원아이디',
          username: '회원이름',
          phone: '01000000000',
          email: 'test@test.com',
        },
        items: [
          {
            id: 'item_id',
            name: '테스트아이템',
            qty: 1,
            price: 1000,
          },
        ],
        extra: {
          open_type: 'iframe',
          card_quota: '0,2,3',
          escrow: false,
        },
      });
      switch (response.event) {
        case 'issued':
        case 'done':
        // 결제 완료
        case 'confirm':
        // 결제 취소
      }
    } catch (e: any) {
      handleError(e.message);
      console.log(e.message);
      switch (e.event) {
        case 'cancel':
          break;
        case 'error':
          message.error('에러가 발생했습니다.');
          break;
      }
    }
  };
  return (
    <BootPayComponentBlock>
      <Button onClick={handleBootPay}>결제</Button>
    </BootPayComponentBlock>
  );
};

export default BootPayComponent;
