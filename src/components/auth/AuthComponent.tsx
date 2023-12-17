import React from 'react';
import styled from 'styled-components';
import AuthContent from './AuthContent';

const AuthComponentBlock = styled.div`
  max-width: 330px;
  margin: 0 auto;
  margin-top: 100px;
`;

interface AuthComponentProps {}

const AuthComponent: React.FC<AuthComponentProps> = () => {
  return (
    <AuthComponentBlock>
      <AuthContent />
    </AuthComponentBlock>
  );
};

export default AuthComponent;
