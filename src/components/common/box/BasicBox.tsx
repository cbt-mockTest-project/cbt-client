import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';
import Label from '../label/Label';

interface BasicBoxProps {
  children?: React.ReactNode;
  className?: string;
  maxHeight?: number;
  minHeight?: number;
  label?: string | JSX.Element;
}

const BasicBox: React.FC<BasicBoxProps> = ({
  children,
  className,
  maxHeight = 240,
  minHeight = 24,
  label,
}) => {
  return (
    <>
      {label && <Label content={label} />}
      <BasicBoxContainer
        className={className}
        maxHeight={maxHeight}
        minHeight={minHeight}
      >
        {children}
      </BasicBoxContainer>
    </>
  );
};

export default BasicBox;

const BasicBoxContainer = styled.pre<BasicBoxProps>`
  white-space: pre-wrap;
  border: 1px solid ${palette.gray_300};
  border-radius: 2px;
  position: relative;
  display: inline-block;
  width: 100%;
  padding: 4px 11px;
  max-height: ${(props) => props.maxHeight}px;
  min-height: ${(props) => props.minHeight}px;
  word-break: break-all;
  overflow-y: auto;
`;
