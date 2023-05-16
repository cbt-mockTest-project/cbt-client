import { isServer, loadScript } from '@lib/utils/utils';
import { message } from 'antd';
import { useEffect } from 'react';
import shortid from 'shortid';

declare global {
  interface Window {
    Bootpay: any;
  }
}

export interface BootpayProps {
  order_name: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
  price: number;
  items: {
    id: string;
    name: string;
    qty: number;
    price: number;
  }[];
}

const useBootpay = () => {
  useEffect(() => {
    if (!isServer()) {
      loadScript({
        url: 'https://js.bootpay.co.kr/bootpay-4.2.9.min.js',
        type: 'application/javascript',
      });
    }
  }, []);

  const handleBootPay = async ({
    order_name,
    user,
    items,
    price,
  }: BootpayProps) => {
    try {
      const Bootpay = window.Bootpay;
      const response = await Bootpay.requestPayment({
        application_id: process.env.NEXT_PUBLIC_BOOTPAY_APPLICATION_ID,
        order_name,
        order_id: shortid.generate(),
        pg: '토스',
        method: '카드',
        tax_free: 0,
        price,
        user,
        items,
        extra: {
          open_type: 'iframe',
          card_quota: '0,2,3',
          escrow: false,
          separately_confirmed: true,
        },
      });
      switch (response.event) {
        case 'issued':
          // 가상계좌 입금 완료처리
          console.log('가상계좌 입금 완료');
          break;
        case 'confirm':
          let checked = true;
          if (checked) {
            await Bootpay.confirm();
          } else {
            Bootpay.destroy();
            message.error(
              '이미 해당 서비스를 이용중입니다.\n결제가 취소되었습니다.'
            );
          }
          break;
        // 결제 완료
        case 'done':
          window.close();
          // 결제 완료
          break;
      }
    } catch (e: any) {
      console.log(e.message);
      switch (e.event) {
        case 'cancel':
          break;
        case 'error':
          message.error('결제중 에러가 발생했습니다.');
          break;
      }
    }
  };

  return { handleBootPay };
};

export default useBootpay;
