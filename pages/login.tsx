import LoginForm from '@components/common/form/LoginForm';
import Layout from '@components/common/layout/Layout';
import palette from '@styles/palette';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface MobileLoginProps {}

const MobileLogin: React.FC<MobileLoginProps> = () => {
  return (
    <Layout>
      <MobileLoginContainer>
        <LoginForm isMobile={true} />
        <div className="mobile-login-bottom-wrapper">
          <Link href="/register/confirm">회원가입</Link>
          <span className="mobile-login-vertical-line">|</span>
          <Link href="/findpw">비밀번호 찾기</Link>
        </div>
      </MobileLoginContainer>
    </Layout>
  );
};

const MobileLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  .mobile-login-bottom-wrapper {
    margin-top: 10px;
    font-size: 0.9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${palette.gray_500};
  }
  .mobile-login-vertical-line {
    margin: 0 5px;
    font-size: 10px;
    font-weight: 600;
  }
`;

export default MobileLogin;
