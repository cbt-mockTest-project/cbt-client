import { useMeQuery } from '../../../_lib/graphql/hook/useUser';
import { CREATE_SETTLEMENT_REQUEST } from '../../../_lib/graphql/query/settlementRequestQuery';
import {
  CreateSettlementRequestMutation,
  CreateSettlementRequestMutationVariables,
} from '../../../_lib/graphql/query/settlementRequestQuery.generated';
import useMyPointTransactions from '../../../_lib/hooks/useMyPointTransactions.query';
import { mySettlementRequestQueryOptions } from '../../../_lib/queryOptions/mySettlementRequest';
import { apolloClient } from '../../../_modules/apollo';
import { useQuery } from '@tanstack/react-query';
import { App, Button, Form, Input, InputNumber } from 'antd';
import React from 'react';
import { CreateSettlementRequestInput, TransactionType } from '../../../types';

interface SettlementComponentProps {}

const SettlementComponent: React.FC<SettlementComponentProps> = () => {
  const { modal, message } = App.useApp();
  const { data: myPendingSettlementRequestResponse } = useQuery(
    mySettlementRequestQueryOptions
  );
  const isExistedSettlementRequest =
    myPendingSettlementRequestResponse?.getMySettlementRequest.ok;
  const { data: meQuery } = useMeQuery();
  const [form] = Form.useForm<CreateSettlementRequestInput>();
  const { pointHistories } = useMyPointTransactions();
  const totalPoint = pointHistories.reduce((acc, cur) => acc + cur.point, 0);
  const user = meQuery?.me.user;
  const onFinish = async (input: CreateSettlementRequestInput) => {
    try {
      if (!user) return message.error('로그인이 필요합니다.');
      if (totalPoint < 5000)
        return message.error('5000 포인트 이상부터 출금이 가능합니다.');
      if (totalPoint < input.amount) {
        return message.error('보유 포인트보다 큰 금액은 출금이 불가능합니다.');
      }
      const res = await apolloClient.mutate<
        CreateSettlementRequestMutation,
        CreateSettlementRequestMutationVariables
      >({
        mutation: CREATE_SETTLEMENT_REQUEST,
        variables: {
          input,
        },
      });
      if (res.data?.createSettlementRequest.ok) {
        return message.success('출금 요청이 완료되었습니다.');
      }
      return message.error('출금 요청에 실패했습니다.');
    } catch (e) {
      message.error('출금 요청에 실패했습니다.');
    }
  };
  const onCickSubmitButton = () => {
    if (!user) return message.error('로그인이 필요합니다.');
    const isFieldEmpty = Object.values(form.getFieldsValue()).some(
      (value) => !value
    );
    const isInValid = form
      .getFieldsError()
      .some((field) => field.errors.length > 0);
    if (isInValid || isFieldEmpty) {
      form.validateFields();
      return;
    }
    if (isExistedSettlementRequest) {
      modal.confirm({
        title: '출금 재요청',
        content: (
          <pre>{`이미 출금 요청이 진행중입니다.\n출금을 재요청하시겠습니까?`}</pre>
        ),
        onOk: () => {
          form.submit();
        },
      });
    } else {
      modal.confirm({
        title: '출금 요청',
        content: '출금 요청을 하시겠습니까?',
        onOk: () => {
          form.submit();
        },
      });
    }
  };
  if (!user) return null;
  return (
    <div className="py-[20px] px-[30px]">
      <div className="text-[20px] font-bold">출금 페이지</div>
      <div className="text-[16px] mt-[20px] mb-[10px]">
        <span className="text-[18px] font-bold">{`"${user.nickname}"`}</span>
        님의 현재 보유 포인트는{' '}
        <span className="text-[18px] font-bold">{`${totalPoint.toLocaleString()} 포인트`}</span>{' '}
        입니다.
      </div>

      <div className="flex flex-col max-w-[400px] mt-4">
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="amount"
            label="출금 금액"
            rules={[
              {
                validator: (_, value) => {
                  if (!value)
                    return Promise.reject('출금 금액을 입력해주세요.');
                  if (value < 5000) {
                    return Promise.reject(
                      '5000 포인트 이상부터 출금이 가능합니다.'
                    );
                  }
                  if (value > totalPoint) {
                    return Promise.reject(
                      '보유 포인트보다 큰 금액은 출금이 불가능합니다.'
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber
              className="w-full"
              size="large"
              placeholder="출금 금액을 입력해주세요."
              type="number"
            />
          </Form.Item>
          <Form.Item
            name="bankName"
            label="은행명"
            rules={[{ required: true, message: '은행명을 입력해주세요.' }]}
          >
            <Input size="large" placeholder="은행명을 입력해주세요." />
          </Form.Item>
          <Form.Item
            name="accountNumber"
            label="계좌번호"
            rules={[{ required: true, message: '계좌번호를 입력해주세요.' }]}
          >
            <Input size="large" placeholder="계좌번호를 입력해주세요." />
          </Form.Item>
          <Form.Item
            name="accountHolder"
            label="예금주"
            rules={[{ required: true, message: '예금주를 입력해주세요.' }]}
          >
            <Input size="large" placeholder="예금주를 입력해주세요." />
          </Form.Item>
          <div className="max-w-[400px] w-full">
            <Button
              className="w-full"
              size="large"
              type="primary"
              onClick={onCickSubmitButton}
            >
              출금 요청하기
            </Button>
          </div>
        </Form>
      </div>

      <div className="text-sm mt-4 font-bold text-gray-500">
        *출금 요청은 최소 5000 포인트 이상부터 가능합니다.
      </div>
      <a
        className="text-sm mt-4 font-bold text-gray-500 block"
        href="https://open.kakao.com/o/sZy6kxbf"
        target="_blank"
        rel="noreferrer"
      >
        <pre>{`[문의] https://open.kakao.com/o/sZy6kxbf`}</pre>
      </a>
    </div>
  );
};

export default SettlementComponent;
