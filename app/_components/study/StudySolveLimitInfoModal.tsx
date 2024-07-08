import { Button, Modal, ModalProps, Select } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import AttachMoneyIcon from '@assets/svg/won_sign.svg';
import { DoneAll } from '@mui/icons-material';
import usePayment from '../pricing/usePayment';
import {
  useEditProfileMutation,
  useMeQuery,
} from '../../_lib/graphql/hook/useUser';
import { checkRole, makeMoneyString } from '../../_lib/utils/utils';
import { TransactionType } from '../../types';
import { LocalStorage } from '../../_lib/utils/localStorage';
import { LAST_VISITED_CATEGORY_ID } from '../../_lib/constants/localStorage';

const StudySolveLimitInfoModalBlock = styled(Modal)``;

interface StudySolveLimitInfoModalProps extends Omit<ModalProps, 'children'> {
  title?: string;
}

const StudySolveLimitInfoModal: React.FC<StudySolveLimitInfoModalProps> = (
  props
) => {
  const {
    title = '오늘의 문제풀이권을 모두 사용하셨습니다 😊',
    ...modalProps
  } = props;
  const [isPricingTabOpen, setIsPricingTabOpen] = useState(false);
  const { data: meQuery } = useMeQuery();
  const localStorage = new LocalStorage();
  const [editProfileMutation] = useEditProfileMutation();
  const { handlePayment } = usePayment();
  const [price, setPrice] = useState(9900);
  const [selectedRoleId, setSelectedRoleId] = useState<number>(1);
  const periodOptions = [
    { label: '3개월', value: 1 },
    { label: '12개월', value: 2 },
    { label: '무제한', value: 3 },
  ];
  const handleBasicPayment = async (
    e: React.MouseEvent<any, MouseEvent>,
    roleId: number
  ) => {
    const categoryId = Number(localStorage.get(LAST_VISITED_CATEGORY_ID));
    await handlePayment({
      orderName: `모두CBT 베이직 플랜 - ${
        periodOptions.find((el) => el.value === roleId)?.label
      }`,
      price,
      roleId,
      checkRoleIds: [roleId],
      ...(categoryId
        ? {
            createCategoryPointHistoryInput: {
              categoryId,
              point: 3000,
              type: TransactionType.Accumulation,
              description: '유저의 베이직 플랜 결제',
            },
          }
        : {}),
    });
    modalProps.onCancel?.(e);
  };
  const isUsingLicense = useMemo(
    () =>
      checkRole({
        roleIds: [selectedRoleId],
        meQuery,
      }),
    [selectedRoleId]
  );

  useEffect(() => {
    if (!meQuery?.me.ok) return;
    editProfileMutation({
      variables: {
        input: {
          hasReachedPaymentReminder: true,
        },
      },
    });
  }, [meQuery]);
  return (
    <StudySolveLimitInfoModalBlock {...modalProps} footer={null}>
      <div className="study-solve-limit-info-modal">
        {isPricingTabOpen ? (
          <>
            <div className="text-base font-bold">모두CBT 베이직플랜</div>
            <div className="mt-3 flex items-end">
              <AttachMoneyIcon class="w-7 h-7 mr-2" />
              <div className="text-2xl font-bold">{makeMoneyString(price)}</div>
              <div className="text-lg ml-1">원</div>
            </div>
            <Select
              className="w-full mt-3"
              size="large"
              placeholder="이용기간을 선택해주세요"
              options={periodOptions}
              defaultValue={periodOptions[0].value}
              onChange={(value) => {
                if (value === 1) {
                  setPrice(9900);
                  setSelectedRoleId(1);
                }
                if (value === 2) {
                  setPrice(19900);
                  setSelectedRoleId(2);
                }
                if (value === 3) {
                  setPrice(49900);
                  setSelectedRoleId(3);
                }
              }}
            />
            <Button
              type="primary"
              size="large"
              className="w-full mt-3"
              disabled={isUsingLicense || !selectedRoleId}
              onClick={(e) => handleBasicPayment(e, selectedRoleId)}
            >
              {isUsingLicense ? '이미 이용중입니다.' : '결제하기'}
            </Button>
            <div className="mt-4 mb-2 font-bold">혜택</div>
            <div className="flex gap-2 items-center font-bold">
              <DoneAll className="text-blue-400" />
              <span>광고제거</span>
            </div>
            <div className="flex gap-2 items-center font-bold">
              <DoneAll className="text-blue-400" />
              <span>무제한 문제풀이</span>
            </div>
            <div className="flex gap-2 items-center font-bold">
              <DoneAll className="text-blue-400" />
              <span>무제한 모의고사</span>
            </div>

            <div className="flex gap-2 items-center font-bold">
              <DoneAll className="text-blue-400" />
              <span>무제한 출력</span>
            </div>
          </>
        ) : (
          <>
            <div className="text-base font-bold mb-4">{title}</div>
            <pre className="mb-4 text-base  text-gray-600">{`제한 없는 학습을 원하신다면\n베이직 플랜에 가입해보세요!`}</pre>
            <Button
              type="primary"
              size="large"
              onClick={() => setIsPricingTabOpen(true)}
            >
              베이직 플랜 가입하기
            </Button>
          </>
        )}
      </div>
    </StudySolveLimitInfoModalBlock>
  );
};

export default StudySolveLimitInfoModal;
