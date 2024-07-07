import { useUpdatePayment } from '@lib/graphql/hook/usePayment';
import { isServer, loadScript } from '@lib/utils/utils';
import { App } from 'antd';
import { useEffect } from 'react';

export interface ExecuteAfterPaymentParams {
  receiptId: string;
}

export interface BootpayProps {
  executeBeforPayment: () => Promise<boolean>;
  executeAfterPayment: ({
    receiptId,
  }: ExecuteAfterPaymentParams) => Promise<boolean>;
  executeRollback: () => Promise<void>;
  doneAction?: () => void;
  order_name: string;
  order_id: string;
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
  const { message } = App.useApp();
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
    order_id,
    user,
    items,
    price,
    executeAfterPayment,
    executeBeforPayment,
    executeRollback,
    doneAction,
  }: BootpayProps) => {
    try {
      let paymentId: number = 0;
      const Bootpay = window.Bootpay;
      const response = await Bootpay.requestPayment({
        application_id: process.env.NEXT_PUBLIC_BOOTPAY_APPLICATION_ID,
        order_name,
        order_id,
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
        case 'confirm':
          const confirmed = await executeBeforPayment();
          if (confirmed) {
            await Bootpay.confirm();
            await executeAfterPayment({ receiptId: response.receipt_id });
            message.success('결제가 완료되었습니다.');
          } else {
            Bootpay.destroy();
            message.error('결제에 실패했습니다.');
          }
          break;
        case 'done':
          message.success('결제가 완료되었습니다.');
          break;
      }
      doneAction && doneAction();
    } catch (e: any) {
      switch (e.event) {
        case 'cancel':
          message.error('결제가 취소되었습니다.');
          break;
        case 'error':
          executeRollback();
          if (e.payload.code === 'INVALID_UNREGISTERED_SUBMALL') {
            message.error(
              '결제에 실패했습니다.\n현재는 카카오페이, 토스페이, 신한, 국민 이용가능합니다.'
            );
            break;
          }
          message.error(e.message);
          break;
      }
    }
  };

  return { handleBootPay };
};

export default useBootpay;
