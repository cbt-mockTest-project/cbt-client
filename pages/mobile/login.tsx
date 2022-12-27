import LoginForm from '@components/common/form/LoginForm';
import React from 'react';
import styled from 'styled-components';

interface MobileLoginProps {}

const MobileLogin: React.FC<MobileLoginProps> = () => {
  return (
    <MobileLoginContainer>
      <LoginForm isMobile={true} />
    </MobileLoginContainer>
  );
};

const MobileLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export default MobileLogin;
