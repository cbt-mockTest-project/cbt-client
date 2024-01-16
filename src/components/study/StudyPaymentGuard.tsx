import { useMeQuery } from '@lib/graphql/hook/useUser';
import useRoleCheck from '@lib/hooks/useRoleCheck';
import { Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StudyPaymentGuardBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  .study-payment-guard-button-wrapper {
    display: flex;
    gap: 10px;
    width: 100%;
    justify-content: center;
    margin-top: 20px;
  }
`;

interface StudyPaymentGuardProps {
  examIds?: string | number[];
  examId?: string | number;
}

const StudyPaymentGuard: React.FC<StudyPaymentGuardProps> = ({
  examId,
  examIds,
}) => {
  const { data: meQuery } = useMeQuery();
  const { handleCheckExamAccess } = useRoleCheck();
  const [hasAccess, setHasAccess] = useState(true);
  const [time, setTime] = useState(60);
  const router = useRouter();
  useEffect(() => {
    if (hasAccess) return;
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev === 0) {
          router.push('/');
          return;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [hasAccess]);

  useEffect(() => {
    if (!examIds && !examId) return;
    if (!meQuery) return;
    if (examIds) {
      const ids = Array.isArray(examIds)
        ? examIds
        : String(examIds)
            .split(',')
            .map((id) => Number(id));
      if (!handleCheckExamAccess(ids)) {
        setHasAccess(false);
      }
    }
    if (examId) {
      if (!handleCheckExamAccess([Number(examId)])) {
        setHasAccess(false);
      }
    }
  }, [examIds, examId, meQuery]);

  useEffect(() => {
    if (hasAccess) return;
    const interval = setInterval(() => {
      const element = document.querySelector('.study-payment-guard');
      if (!element && !hasAccess) {
        alert('비정상적인 접근입니다.');
        router.reload();
      }
    }, 3000); // 3초마다 체크

    return () => clearInterval(interval);
  }, [hasAccess]);

  if (hasAccess) return null;

  return (
    <StudyPaymentGuardBlock className="study-payment-guard">
      <div>직8딴 플랜 구매 후 이용가능합니다. </div>
      <div>{time}초 후 홈화면으로 이동합니다.</div>
      <div className="study-payment-guard-button-wrapper">
        <Link href="/">
          <Button>홈으로</Button>
        </Link>
        <Link href="/pricing">
          <Button type="primary">구매하기</Button>
        </Link>
      </div>
    </StudyPaymentGuardBlock>
  );
};

export default StudyPaymentGuard;
