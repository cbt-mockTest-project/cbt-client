import { loginModal } from '@lib/constants';
import { useCreatePayment } from '@lib/graphql/user/hook/usePayment';
import {
  useCheckUserRole,
  useCreateUserRole,
  useDeleteUserRole,
  useMeQuery,
} from '@lib/graphql/user/hook/useUser';
import useBootpay from '@lib/hooks/useBootpay';
import { checkRole } from '@lib/utils/utils';
import { coreActions } from '@modules/redux/slices/core';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { message } from 'antd';
import { useRef } from 'react';
import shortid from 'shortid';

interface handlePaymentParams {
  price: number;
  orderName: string;
  roleId: number;
  checkRoleIds: number[];
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

  const handlePayment = ({
    orderName,
    price,
    roleId,
    checkRoleIds,
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
    handleBootPay({
      doneAction: refetchMeQuery,
      executeBeforPayment: async () => {
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
