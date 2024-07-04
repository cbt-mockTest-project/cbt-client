import palette from '@styles/palette';
import React from 'react';
import styled, { css } from 'styled-components';

type BasicCardType = 'basic' | 'primary';

const BasicCardBlock = styled.div<{
  hoverEffect: boolean;
  type: BasicCardType;
}>`
  background-color: ${({ theme }) => theme.color('colorBgContainer')};
  border-radius: 10px;
  padding: 10px 20px;
  list-style: none;
  border: 1px solid
    ${({ type, theme }) => {
      if (type === 'basic') {
        return theme.color('colorSplit');
      }
      return theme.color('colorBorder');
    }};
  width: 100%;
  transition: all 0.2s ease-in-out;
  ${(props) =>
    props.hoverEffect &&
    css`
      &:hover {
        box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
          0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
        cursor: pointer;
      }
    `}
`;

interface BasicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  children: React.ReactNode;
  type?: BasicCardType;
  className?: string;
}

const BasicCard: React.FC<BasicCardProps> = (props) => {
  const {
    type = 'basic',
    className = '',
    children,
    hoverEffect = false,
    ...divProps
  } = props;
  return (
    <BasicCardBlock
      {...divProps}
      type={type}
      hoverEffect={hoverEffect}
      className={className}
    >
      {children}
    </BasicCardBlock>
  );
};

export default BasicCard;
