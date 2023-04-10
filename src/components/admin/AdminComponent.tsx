import React from 'react';
import styled from 'styled-components';

interface AdminComponentProps {}

const AdminComponent: React.FC<AdminComponentProps> = () => {
  return <AdminComponentContainer>hello world</AdminComponentContainer>;
};

export default AdminComponent;

const AdminComponentContainer = styled.div``;
