import { useMeQuery } from '@lib/graphql/hook/useUser';
import { useApproveCategoryInviteLinkMutation } from '@lib/hooks/useCategoryInviteLink';
import { Button, Result, Spin } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface InviteComponentProps {}

const InviteComponent: React.FC<InviteComponentProps> = () => {
  const router = useRouter();
  const code = router.query.code as string;
  const [result, setResult] = useState<'pending' | 'success' | 'error'>(
    'pending'
  );
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [categoryName, setCategoryName] = useState<string>('');
  const approveCategoryInviteLink = useApproveCategoryInviteLinkMutation();
  useEffect(() => {
    if (!code) return;
    approveCategoryInviteLink.mutateAsync(code).then((res) => {
      if (res.approveCategoryInvitationLink.ok) {
        setResult('success');
        setCategoryName(res.approveCategoryInvitationLink.categoryName);
      } else {
        setErrorMessage(res.approveCategoryInvitationLink.error);
        setResult('error');
      }
    });
  }, [code]);

  return (
    <>
      {result === 'success' ? (
        <div className="flex justify-center items-center h-96 w-full flex-col gap-2">
          <Result
            status="success"
            title="암기장 초대가 완료되었습니다!"
            subTitle="초대된 암기장은 내 암기장 - 저장된에서 확인할 수 있습니다."
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  router.push(`/category/${categoryName}`);
                }}
              >
                암기장으로 이동
              </Button>,
            ]}
          />
        </div>
      ) : result === 'error' ? (
        <div className="flex justify-center items-center h-96 w-full flex-col gap-2">
          <Result
            status="error"
            title={errorMessage || '초대에 실패했습니다.'}
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  router.push('/');
                }}
              >
                홈으로 이동
              </Button>,
            ]}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center h-96 w-full flex-col gap-2">
          <Spin size="large" />
          <p className="text-lg font-bold text-center text-gray-500">
            인증 중입니다. 잠시만 기다려주세요.
          </p>
        </div>
      )}
    </>
  );
};

export default InviteComponent;
