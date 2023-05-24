import React, { useEffect } from 'react';
import styled from 'styled-components';

const AdminTestPageBlock = styled.div``;

interface AdminTestPageProps {}

const AdminTestPage: React.FC<AdminTestPageProps> = () => {
  useEffect(() => {
    const links = document.querySelectorAll('a[target="_blank"]');
    links.forEach((link) => {
      //   link.removeAttribute('target');
    });
  }, []);
  return (
    <AdminTestPageBlock>
      <a href="https://naver.com" target="_blank" rel="noreferrer">
        <h1>AdminTestPage</h1>
      </a>
    </AdminTestPageBlock>
  );
};

export default AdminTestPage;
