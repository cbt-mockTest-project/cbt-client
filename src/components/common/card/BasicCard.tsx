import palette from '@styles/palette';
import React from 'react';
import styled, { css } from 'styled-components';

const BasicCardBlock = styled.div<{ hoverEffect: boolean }>`
  background-color: ${palette.colorContainerBgLight};
  border-radius: 10px;
  padding: 10px 20px;
  list-style: none;
  border: 1px solid ${palette.colorBorderLight};
  width: 100%;
  transition: all 0.2s ease-in-out;
  ${(props) =>
    props.hoverEffect &&
    css`
      &:hover {
        /* border-color: ${palette.colorBorderHover}; */
        box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
          0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
        cursor: pointer;
      }
    `}
`;

interface BasicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  children: React.ReactNode;
  className?: string;
}

const BasicCard: React.FC<BasicCardProps> = (props) => {
  const { className = '', children, hoverEffect = false, ...divProps } = props;
  return (
    <BasicCardBlock
      {...divProps}
      hoverEffect={hoverEffect}
      className={className}
    >
      {children}
    </BasicCardBlock>
  );
};

export default BasicCard;
