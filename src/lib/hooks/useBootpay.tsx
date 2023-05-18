import { useUpdatePayment } from '@lib/graphql/user/hook/usePayment';
import { isServer, loadScript } from '@lib/utils/utils';
import { message } from 'antd';
import { useEffect } from 'react';
import shortid from 'shortid';

declare global {
  interface Window {
    Bootpay: any;
  }
}

export interface ExecuteAfterPaymentParams {
  receiptId: string;
}
export interface ExecuteAfterPaymentResponse {
  ok: boolean;
  paymentId?: number;
}

export interface BootpayProps {
  isPaymentAvailable: () => Promise<boolean>;
  executeAfterPayment: ({
    receiptId,
  }: ExecuteAfterPaymentParams) => Promise<ExecuteAfterPaymentResponse>;
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
  const [updatePayment] = useUpdatePayment();
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
    isPaymentAvailable,
    executeAfterPayment,
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
          const confirmed = await isPaymentAvailable();
          if (confirmed) {
            const executeAfterPaymentResponse = await executeAfterPayment({
              receiptId: response.receipt_id,
            });
            paymentId = executeAfterPaymentResponse.paymentId || 0;
            if (executeAfterPaymentResponse.ok) {
              await Bootpay.confirm();
              await updatePayment({
                variables: {
                  input: {
                    receiptId: response.receipt_id,
                    paymentId,
                  },
                },
              });
              message.success('결제가 완료되었습니다.');
            } else {
              Bootpay.destroy();
            }
          } else {
            Bootpay.destroy();
            message.error('결제가 취소되었습니다.');
          }

          break;
        // 결제 완료
        case 'done':
          message.success('결제가 완료되었습니다.');
          // 결제 완료
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
          message.error('결제중 에러가 발생했습니다.');
          break;
      }
    }
  };

  return { handleBootPay };
};

export default useBootpay;
