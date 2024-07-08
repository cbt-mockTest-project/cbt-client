import React, { useEffect } from 'react';
import styled from 'styled-components';

const DimmedBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  p {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
  }
`;

interface DimmedProps {
  content?: string;
  children?: React.ReactNode;
}

const Dimmed: React.FC<DimmedProps> = ({ content, children }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <DimmedBlock>
      <p>{content}</p>
      {children}
    </DimmedBlock>
  );
};

export default Dimmed;
