import palette from '../../../_styles/palette';
import React from 'react';
import styled from 'styled-components';

interface TextButtonProps {
  content: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const TextButton: React.FC<TextButtonProps> = ({
  content,
  className,
  onClick,
}) => {
  return (
    <TextButtonContainer
      className={`select-none ${className}`}
      onClick={onClick}
    >
      {content}
    </TextButtonContainer>
  );
};

export default TextButton;

const TextButtonContainer = styled.button`
  margin: 15px 0 2px 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${palette.gray_500};
  cursor: pointer;
  transition: color 0.2s ease-in;
  :hover {
    color: ${palette.antd_blue_01};
  }
`;
