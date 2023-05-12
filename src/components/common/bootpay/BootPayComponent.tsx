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
      price: '1000', //실제 결제되는 가격
      application_id: process.env.NEXT_PUBLIC_BOOTPAY_APPLICATION_ID,
      name: '블링블링 마스카라', //결제창에서 보여질 이름
      pg: 'toss',
      method: 'card', //결제수단, 입력하지 않으면 결제수단 선택부터 화면이 시작합니다.
      show_agree_window: 0, // 부트페이 정보 동의 창 보이기 여부
      items: [
        {
          item_name: '나는 아이템', //상품명
          qty: 1, //수량
          unique: '123', //해당 상품을 구분짓는 primary key
          price: 1000, //상품 단가
          cat1: 'TOP', // 대표 상품의 카테고리 상, 50글자 이내
          cat2: '티셔츠', // 대표 상품의 카테고리 중, 50글자 이내
          cat3: '라운드 티', // 대표상품의 카테고리 하, 50글자 이내
        },
      ],
      user_info: {
        username: '사용자 이름',
        email: '사용자 이메일',
        addr: '사용자 주소',
        phone: '010-1234-4567',
      },
      order_id: '고유order_id_1234', //고유 주문번호로, 생성하신 값을 보내주셔야 합니다.
      params: {
        callback1: '그대로 콜백받을 변수 1',
        callback2: '그대로 콜백받을 변수 2',
        customvar1234: '변수명도 마음대로',
      },
      account_expire_at: '2020-10-25', // 가상계좌 입금기간 제한 ( yyyy-mm-dd 포멧으로 입력해주세요. 가상계좌만 적용됩니다. )
      extra: {
        start_at: '2019-05-10', // 정기 결제 시작일 - 시작일을 지정하지 않으면 그 날 당일로부터 결제가 가능한 Billing key 지급
        end_at: '2022-05-10', // 정기결제 만료일 -  기간 없음 - 무제한
        vbank_result: 1, // 가상계좌 사용시 사용, 가상계좌 결과창을 볼지(1), 말지(0), 미설정시 봄(1)
        quota: '0,2,3', // 결제금액이 5만원 이상시 할부개월 허용범위를 설정할 수 있음, [0(일시불), 2개월, 3개월] 허용, 미설정시 12개월까지 허용,
        theme: 'purple', // [ red, purple(기본), custom ]
        custom_background: '#00a086', // [ theme가 custom 일 때 background 색상 지정 가능 ]
        custom_font_color: '#ffffff', // [ theme가 custom 일 때 font color 색상 지정 가능 ]
      },
    })
      .error(function (data: any) {
        //결제 진행시 에러가 발생하면 수행됩니다.
        console.log(data);
      })
      .cancel(function (data: any) {
        //결제가 취소되면 수행됩니다.
        console.log(data);
      })
      .ready(function (data: any) {
        // 가상계좌 입금 계좌번호가 발급되면 호출되는 함수입니다.
        console.log(data);
      })
      .confirm(function (data: any) {
        //결제가 실행되기 전에 수행되며, 주로 재고를 확인하는 로직이 들어갑니다.
        //주의 - 카드 수기결제일 경우 이 부분이 실행되지 않습니다.
        console.log(data);
        var enable = true; // 재고 수량 관리 로직 혹은 다른 처리
        if (enable) {
          (window as any).transactionConfirm(data); // 조건이 맞으면 승인 처리를 한다.
        } else {
          (window as any).removePaymentWindow(); // 조건이 맞지 않으면 결제 창을 닫고 결제를 승인하지 않는다.
        }
      })
      .close(function (data: any) {
        // 결제창이 닫힐때 수행됩니다. (성공,실패,취소에 상관없이 모두 수행됨)
        console.log(data);
      })
      .done(function (data: any) {
        //결제가 정상적으로 완료되면 수행됩니다
        //비즈니스 로직을 수행하기 전에 결제 유효성 검증을 하시길 추천합니다.
        console.log(data);
      });
    // (window as any).BootPay.request({
    //   price: '100', //실제 결제되는 가격
    //   application_id: process.env.NEXT_PUBLIC_BOOTPAY_APPLICATION_ID, //발급받은 application_id
    //   name: '프리미엄 회원전환', //결제창에서 보여질 이름
    //   pg: 'toss',
    //   method: 'card', //결제수단, 입력하지 않으면 결제수단 선택부터 화면이 시작합니다.
    //   show_agree_window: 0, // 부트페이 정보 동의 창 보이기 여부
    //   items: [
    //     {
    //       item_name: '프리미엄 회원전환', //상품명
    //       qty: 1, //수량
    //       unique: shortid.generate(), //해당 상품을 구분짓는 primary key
    //       price: 100, //상품 단가
    //     },
    //   ],
    //   user_info: {
    //     username: '사용자 이름',
    //     email: '사용자 이메일',
    //   },
    //   order_id: shortid.generate(), //고유 주문번호로, 생성하신 값을 보내주셔야 합니다.
    // })
    //   .error(function (data: any) {
    //     message.error('결제에 실패하였습니다.');
    //   })
    //   .cancel(function (data: any) {
    //     message.error('결제가 취소되었습니다.');
    //   })
    //   .confirm(function (data: any) {
    //     //결제가 실행되기 전에 수행되며, 주로 재고를 확인하는 로직이 들어갑니다.
    //     //주의 - 카드 수기결제일 경우 이 부분이 실행되지 않습니다.
    //     let enable = true; // 재고 수량 관리 로직 혹은 다른 처리
    //     enable = false;

    //     if (enable) {
    //       (window as any).BootPay.transactionConfirm(data); // 조건이 맞으면 승인 처리를 한다.
    //     } else {
    //       message.error('이미 프리미엄 회원입니다.');
    //       (window as any).BootPay.removePaymentWindow(); // 조건이 맞지 않으면 결제 창을 닫고 결제를 승인하지 않는다.
    //     }
    //   })
    //   .close(function (data: any) {
    //     // 결제창이 닫힐때 수행됩니다. (성공,실패,취소에 상관없이 모두 수행됨)
    //     alert('close');
    //     console.log(data);
    //   })
    //   .done(function (data: any) {
    //     const res = axios.get('http://localhost:80/');
    //     console.log(res);
    //     console.log(data);
    //   });
  };
  return (
    <BootPayComponentBlock>
      <Button onClick={handleBootPay}>결제</Button>
    </BootPayComponentBlock>
  );
};

export default BootPayComponent;
