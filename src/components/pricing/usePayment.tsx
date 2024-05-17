import { loginModal } from '@lib/constants';
import {
  useCheckDiscountCode,
  useUpdateDiscountCode,
} from '@lib/graphql/hook/useDiscount';
import { useCreatePayment } from '@lib/graphql/hook/usePayment';
import {
  useCheckUserRole,
  useCreateUserRole,
  useDeleteUserRole,
  useMeQuery,
} from '@lib/graphql/hook/useUser';
import useBootpay from '@lib/hooks/useBootpay';
import { checkRole } from '@lib/utils/utils';
import { coreActions } from '@modules/redux/slices/core';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { message } from 'antd';
import { useRef } from 'react';
import shortid from 'shortid';
import { CreateCategoryPointHistoryInput, DiscountCodeStatus } from 'types';

interface handlePaymentParams {
  price: number;
  orderName: string;
  roleId: number;
  checkRoleIds: number[];
  discountCode?: string;
  createCategoryPointHistoryInput?: CreateCategoryPointHistoryInput;
}

const usePayment = () => {
  const dispatch = useAppDispatch();
  const openLoginModal = () => dispatch(coreActions.openModal(loginModal));
  const createdRoleId = useRef(0);
  const { handleBootPay } = useBootpay();
  const { data: meQuery, refetch: refetchMeQuery } = useMeQuery();
  const [checkUserRoleRequest] = useCheckUserRole();
  const [createPayment] = useCreatePayment();
  const [createUserRole] = useCreateUserRole();
  const [deleteUserRole] = useDeleteUserRole();
  const [checkDiscountCode] = useCheckDiscountCode();
  const [updateDiscountCode] = useUpdateDiscountCode();

  const handlePayment = async ({
    orderName,
    price,
    roleId,
    checkRoleIds,
    discountCode,
    createCategoryPointHistoryInput,
  }: handlePaymentParams) => {
    const orderId = `${meQuery?.me.user?.id}_${shortid.generate()}`;
    if (!meQuery?.me.user) {
      openLoginModal();
      return;
    }
    if (checkRole({ roleIds: checkRoleIds, meQuery })) {
      message.error('이미 해당 서비스를 이용중입니다.');
      return;
    }
    const user = meQuery?.me.user;
    await handleBootPay({
      doneAction: refetchMeQuery,
      executeBeforPayment: async () => {
        if (discountCode) {
          const res = await checkDiscountCode({
            variables: {
              input: {
                code: discountCode,
              },
            },
          });
          if (!res.data?.checkDiscountCode.ok) {
            // 할인코드가 이미 이용중이다.
            message.error(res.data?.checkDiscountCode.error);
            return false;
          }
          await updateDiscountCode({
            variables: {
              input: {
                code: discountCode,
                status: DiscountCodeStatus.Used,
              },
            },
          });
        }
        const res = await checkUserRoleRequest({
          variables: {
            input: {
              roleIds: checkRoleIds,
            },
          },
        });
        // 1. 해당서비스를 이용중이 아니다.
        if (res.data?.checkUserRole.confirmed === false) {
          // 2. 유저의 role을 변경한다.
          if (!meQuery.me.user) return false;
          const res = await createUserRole({
            variables: {
              input: {
                roleId,
                userId: meQuery.me.user.id,
              },
            },
          });
          if (res.data?.createUserRole.ok) {
            createdRoleId.current = res.data.createUserRole.roleId as number;
            return true;
          }
          return false;
        }
        if (res.data?.checkUserRole.confirmed === true) {
          message.error(
            '이미 해당 서비스를 이용중입니다.\n결제가 취소되었습니다.'
          );
          return false;
        }
        message.error(res.data?.checkUserRole.error);
        return false;
      },
      executeAfterPayment: async ({ receiptId }) => {
        const res = await createPayment({
          variables: {
            input: {
              orderId,
              productName: orderName,
              price,
              receiptId,
              ...(createCategoryPointHistoryInput
                ? {
                    createCategoryPointHistoryInput,
                  }
                : {}),
            },
          },
        });
        if (res.data?.createPayment.ok) {
          return true;
        }
        return false;
      },
      executeRollback: async () => {
        if (!createdRoleId.current) return;
        await deleteUserRole({
          variables: {
            input: {
              id: createdRoleId.current,
            },
          },
        });
        if (discountCode)
          await updateDiscountCode({
            variables: {
              input: {
                code: discountCode,
                status: DiscountCodeStatus.Unused,
              },
            },
          }); // 할인코드를 원래대로 되돌린다.
      },
      order_id: orderId,
      order_name: orderName,
      user: {
        id: String(user.id),
        username: user.nickname,
        email: user.email,
      },
      price,
      items: [
        {
          id: orderName,
          name: orderName,
          qty: 1,
          price,
        },
      ],
    });
  };

  return { handlePayment };
};

export default usePayment;
