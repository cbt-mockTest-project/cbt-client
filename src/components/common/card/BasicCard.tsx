import palette from '@styles/palette';
import React from 'react';
import styled, { css } from 'styled-components';

const BasicCardBlock = styled.div<{ hoverEffect: boolean }>`
  background-color: ${palette.containerBackgroundColor};
  border-radius: 10px;
  padding: 20px;
  list-style: none;
  border: 1px solid ${palette.borderColor};
  width: 100%;
  transition: border-color 0.2s ease-in-out;
  ${(props) =>
    props.hoverEffect &&
    css`
      &:hover {
        border-color: ${palette.borderHoverColor};
      }
    `}
`;

interface BasicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  children: React.ReactNode;
}

const BasicCard: React.FC<BasicCardProps> = (props) => {
  const { children, hoverEffect = false, ...divProps } = props;
  return (
    <BasicCardBlock {...divProps} hoverEffect={hoverEffect}>
      {children}
    </BasicCardBlock>
  );
};

export default BasicCard;
