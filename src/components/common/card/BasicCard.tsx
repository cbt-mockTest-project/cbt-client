import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';

const BasicCardBlock = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  list-style: none;
  border: 1px solid ${palette.gray_200};
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  width: 100%;
`;

interface BasicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const BasicCard: React.FC<BasicCardProps> = (props) => {
  const { children, ...divProps } = props;
  return <BasicCardBlock {...divProps}>{children}</BasicCardBlock>;
};

export default BasicCard;
