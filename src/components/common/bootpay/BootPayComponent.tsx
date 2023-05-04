import { isServer, loadScript } from '@lib/utils/utils';
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
        url: 'https://cdn.bootpay.co.kr/js/bootpay-3.3.0.min.js',
        type: 'application/javascript',
      }).then(() => {
        alert('loaded');
      });
    }
  }, []);
  const handleBootPay = async () => {
    if (typeof window === 'undefined' || !(window as any).BootPay) {
      // 기다려야 할 경우 최대 시간을 설정합니다.
      const maxWaitTime = 5000; // 5 seconds
      const startTime = Date.now();

      while (typeof window === 'undefined' || !(window as any).BootPay) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms마다 확인

        if (Date.now() - startTime > maxWaitTime) {
          console.error('BootPay not found within the maximum wait time.');
          return;
        }
      }
    }
    (window as any).BootPay.request({
      price: '100', //실제 결제되는 가격
      application_id: process.env.NEXT_PUBLIC_BOOTPAY_APPLICATION_ID, //발급받은 application_id
      name: '프리미엄 회원전환', //결제창에서 보여질 이름
      pg: 'danal',
      method: 'card', //결제수단, 입력하지 않으면 결제수단 선택부터 화면이 시작합니다.
      show_agree_window: 0, // 부트페이 정보 동의 창 보이기 여부
      items: [
        {
          item_name: '프리미엄 회원전환', //상품명
          qty: 1, //수량
          unique: shortid.generate(), //해당 상품을 구분짓는 primary key
          price: 100, //상품 단가
        },
      ],
      user_info: {
        username: '사용자 이름',
        email: '사용자 이메일',
      },
      order_id: shortid.generate(), //고유 주문번호로, 생성하신 값을 보내주셔야 합니다.
    })
      .error(function (data: any) {
        //결제 진행시 에러가 발생하면 수행됩니다.
        message.error('결제에 실패하였습니다.');
      })
      .cancel(function (data: any) {
        //결제가 취소되면 수행됩니다.
        message.error('결제가 취소되었습니다.');
        console.log(data);
      })
      .confirm(function (data: any) {
        //결제가 실행되기 전에 수행되며, 주로 재고를 확인하는 로직이 들어갑니다.
        //주의 - 카드 수기결제일 경우 이 부분이 실행되지 않습니다.
        console.log(data);
        let enable = true; // 재고 수량 관리 로직 혹은 다른 처리
        enable = false;

        if (enable) {
          (window as any).BootPay.transactionConfirm(data); // 조건이 맞으면 승인 처리를 한다.
        } else {
          message.error('이미 프리미엄 회원입니다.');
          (window as any).BootPay.removePaymentWindow(); // 조건이 맞지 않으면 결제 창을 닫고 결제를 승인하지 않는다.
        }
      })
      .close(function (data: any) {
        // 결제창이 닫힐때 수행됩니다. (성공,실패,취소에 상관없이 모두 수행됨)
        alert('close');
        console.log(data);
      })
      .done(function (data: any) {
        const res = axios.get('http://localhost:80/');
        console.log(res);
        console.log(data);
      });
  };
  return (
    <BootPayComponentBlock>
      <Button onClick={handleBootPay}>결제</Button>
    </BootPayComponentBlock>
  );
};

export default BootPayComponent;
