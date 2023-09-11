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
        <section className="footer-section-one">
          <div>{`© ${year} Moducbt`}</div>
          <a href="mailto:moducbt@gmail.com">Mail</a>
          <Link href={'/copyright'}>CopyRight</Link>
          <Link href="https://www.buymeacoffee.com/moducbts">후원</Link>
        </section>
        <section className="footer-section-two">
          <div className="footer-section-two-description">상호명: 모두</div>
          <div className="footer-section-two-description">
            사업자등록번호: 784-19-02020 ⁞ 대표: 심은광 ⁞ 이메일:
            moducbt@gmail.com
          </div>
          <div className="footer-section-two-description">
            사업장소재지: 서울특별시 구로구 가마산로77
          </div>
          <div className="footer-section-two-description">
            통신판매업신고번호: 2023-서울구로-1204
          </div>
        </section>
      </div>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  width: 100%;
  padding: 20px 0;
  background-color: ${palette.gray_50};
  .footer-wrapper {
    margin: 0 auto;
    max-width: 1024px;
  }
  .footer-section-one {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    gap: 40px;
    a,
    button {
      color: ${palette.antd_blue_01};
    }
  }
  .footer-section-two {
    margin-top: 20px;
    .footer-section-two-description {
      font-size: 0.8rem;
      color: ${palette.gray_500};
    }
  }
  @media (max-width: ${responsive.medium}) {
    padding: 20px 15px;
  }
`;
