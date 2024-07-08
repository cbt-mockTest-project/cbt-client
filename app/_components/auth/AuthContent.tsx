import { Button, Divider, Modal } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import LoginTab from './LoginTab';
import FindPasswordTab from './FindPasswordTab';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuthModal from '../../_lib/hooks/useAuthModal';
const AuthContentBlock = styled.div`
  .auth-modal-tab-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    button {
      font-size: 12px;
      color: #999;
      cursor: pointer;
    }
  }
`;

interface AuthContentProps {}

const AuthContent: React.FC<AuthContentProps> = () => {
  const router = useRouter();
  const { closeAuthModal } = useAuthModal();
  const [currentTab, setCurrentTab] = useState<'login' | 'findPassword'>(
    'login'
  );
  const isLoginTab = currentTab === 'login';
  const handleRouteForRegister = () => {
    closeAuthModal();
    router.push('/register/confirm');
  };
  return (
    <AuthContentBlock>
      {currentTab === 'login' && <LoginTab />}
      {currentTab === 'findPassword' && <FindPasswordTab />}
      <div className="auth-modal-tab-wrapper">
        {isLoginTab && (
          <>
            <Link href="/register/confirm">
              <Button onClick={handleRouteForRegister} type="text">
                회원가입
              </Button>
            </Link>
            <Divider type="vertical" style={{ marginTop: '4px' }} />
            <Button type="text" onClick={() => setCurrentTab('findPassword')}>
              비밀번호 찾기
            </Button>
          </>
        )}
        {!isLoginTab && (
          <Button type="text" onClick={() => setCurrentTab('login')}>
            로그인
          </Button>
        )}
      </div>
    </AuthContentBlock>
  );
};

export default AuthContent;
