import { responsive } from '../app/_lib/utils/responsive';
import palette from '../app/_styles/palette';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const OffLinePageBlock = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px;
  .offline-page-logo-wrapper {
    position: relative;
    width: 100%;
    max-width: 250px;
    aspect-ratio: 320 / 200;
  }
  p {
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${({ theme }) => theme.color('colorTextTertiary')};
  }
  @media (max-width: ${responsive.small}) {
    p {
      white-space: pre-line;
    }
  }
`;

interface OffLinePageProps {}

const OffLinePage: React.FC<OffLinePageProps> = () => {
  return (
    <OffLinePageBlock>
      <div className="offline-page-logo-wrapper">
        <Image src="/png/logo01.png" alt="logo" fill />
      </div>
      <p>{`인터넷 환경을\n확인해주세요!`}</p>
    </OffLinePageBlock>
  );
};

export default OffLinePage;
