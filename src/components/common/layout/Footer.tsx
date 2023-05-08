import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

interface FooterProps {
  className: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const year = new Date().getFullYear();
  return (
    <FooterContainer className={className}>
      <div className="footer-wrapper">
        <div>{`© ${year} Moducbt`}</div>
        <a href="mailto:moducbt@gmail.com">Mail</a>
        <Link href={'/copyright'}>CopyRight</Link>
      </div>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  width: 100%;
  padding: 20px 0;
  height: 60px;
  border-top: 1px solid ${palette.gray_200};
  background-color: white;
  .footer-wrapper {
    display: flex;
    align-items: center;
    margin: 0 auto;
    max-width: 1024px;
    font-size: 0.8rem;
    gap: 40px;
    a,
    button {
      color: ${palette.antd_blue_01};
    }
  }
  @media (max-width: ${responsive.medium}) {
    padding: 20px 15px;
  }
`;
