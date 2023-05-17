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
  isPaymentAvailable: () => Promise<boolean>;
  executeAfterPayment: () => Promise<boolean>;
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
        url: 'https://js.bootpay.co.kr/bootpay-4.3.1.min.js',
        type: 'application/javascript',
      });
    }
  }, []);

  const handleBootPay = async ({
    order_name,
    user,
    items,
    price,
    isPaymentAvailable,
    executeAfterPayment,
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
          try {
            const confirmed = await isPaymentAvailable();
            if (confirmed) {
              // const done = await executeAfterPayment();
              // if (done) {
              await Bootpay.confirm();
              message.success('결제가 완료되었습니다.');
              // } else {
              //   Bootpay.destroy();
              //   message.error('결제가 취소되었습니다.');
              // }
            } else {
              Bootpay.destroy();
              message.error('결제가 취소되었습니다.');
            }
          } catch (e) {
            console.log(e);
          }

          break;
        // 결제 완료
        case 'done':
          message.success('결제가 완료되었습니다.');
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
