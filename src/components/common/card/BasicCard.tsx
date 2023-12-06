import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';

const BasicCardBlock = styled.div`
  background-color: ${palette.containerBackgroundColor};
  border-radius: 10px;
  padding: 20px;
  list-style: none;
  border: 1px solid ${palette.borderColor};
  width: 100%;
  transition: border-color 0.2s ease-in-out;
  :hover {
    border-color: ${palette.borderHoverColor};
  }
`;

interface BasicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const BasicCard: React.FC<BasicCardProps> = (props) => {
  const { children, ...divProps } = props;
  return <BasicCardBlock {...divProps}>{children}</BasicCardBlock>;
};

export default BasicCard;
