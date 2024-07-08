import { useMeQuery } from '../../_lib/graphql/hook/useUser';
import useRoleCheck from '../../_lib/hooks/useRoleCheck';
import { responsive } from '../../_lib/utils/responsive';
import { Clear, DoneAll } from '@mui/icons-material';
import { App, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StudyPaymentSelect from './StudyPaymentSelect';
import { LocalStorage } from '../../_lib/utils/localStorage';
import { useRouter } from 'next/router';
import { LAST_VISITED_CATEGORY } from '../../_lib/constants/localStorage';
import { LeftOutlined } from '@ant-design/icons';

const StudyPaymentGuardBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 999;

  .study-payment-guard-inner {
    position: absolute;
    border-radius: 10px;
    min-width: 435px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
    background-color: ${({ theme }) => theme.color('colorBgContainer')};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    .study-payment-guard-header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .study-payment-exit-button,
      .study-payment-back-button {
        cursor: pointer;
      }
    }
    .study-payment-guard-title {
      font-size: 20px;
      font-weight: bold;
    }
    .study-payment-guard-period {
      font-size: 14px;
      font-weight: bold;
      color: ${({ theme }) => theme.color('colorTextSecondary')};
    }
    .study-payment-guard-pay-button {
      width: 160px;
    }
    .study-payment-guard-benefit {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .study-payment-guard-benefit-list {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
    .study-payment-guard-benefit-title {
      font-size: 18px;
      font-weight: bold;
    }
  }

  @media (max-width: ${responsive.medium}) {
    .study-payment-guard-inner {
      min-width: 300px;
    }
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
  const { modal } = App.useApp();
  const router = useRouter();
  const { data: meQuery } = useMeQuery();
  const localStorage = new LocalStorage();
  const [isPaymentSelectTab, setIsPaymentSelectTab] = useState<boolean>(false);
  const { handleCheckExamAccess } = useRoleCheck();
  const [hasAccess, setHasAccess] = useState(true);

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
      } else {
        setHasAccess(true);
      }
    }
    if (examId) {
      if (!handleCheckExamAccess([Number(examId)])) {
        setHasAccess(false);
      } else {
        setHasAccess(true);
      }
    }
  }, [examIds, examId, meQuery]);

  if (hasAccess) return null;

  return (
    <StudyPaymentGuardBlock className="study-payment-guard">
      <div className="study-payment-guard-inner">
        <div className="study-payment-guard-header">
          <div
            className="study-payment-back-button"
            onClick={() => {
              if (!isPaymentSelectTab) return;
              setIsPaymentSelectTab(false);
            }}
          >
            {isPaymentSelectTab && <LeftOutlined />}
          </div>
          <div
            role="button"
            className="study-payment-exit-button"
            onClick={() => {
              modal.confirm({
                title: '페이지를 나가시겠습니까?',
                onOk() {
                  const lastVisitedCategory = localStorage.get(
                    LAST_VISITED_CATEGORY
                  );
                  if (lastVisitedCategory) {
                    router.push(lastVisitedCategory);
                  } else {
                    router.push('/');
                  }
                },
              });
            }}
          >
            <Clear />
          </div>
        </div>
        {isPaymentSelectTab ? (
          <StudyPaymentSelect />
        ) : (
          <>
            <div className="study-payment-guard-title">
              직8딴 플랜 구매 후 이용가능합니다. 😊
            </div>
            <div className="study-payment-guard-period">
              이용기간: ~ 2024-12-25
            </div>
            <Button
              className="study-payment-guard-pay-button"
              type="primary"
              size="large"
              onClick={() => setIsPaymentSelectTab(true)}
            >
              구매하기
            </Button>
            <div className="study-payment-guard-benefit">
              <div className="study-payment-guard-benefit-title">혜택</div>
              <div className="study-payment-guard-benefit-list">
                <DoneAll />
                <span>직8딴 학습시스템 제공</span>
              </div>
              <div className="study-payment-guard-benefit-list">
                <DoneAll />
                <span>구매자 전용 톡방을 통한 저자의 즉각 질문답변 대응</span>
              </div>
              <div className="study-payment-guard-benefit-list">
                <DoneAll />
                <span>광고제거</span>
              </div>
            </div>
          </>
        )}
      </div>
    </StudyPaymentGuardBlock>
  );
};

export default StudyPaymentGuard;
