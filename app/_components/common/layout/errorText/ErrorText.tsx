import palette from '../../../../_styles/palette';
import React from 'react';
import styled from 'styled-components';

interface ErrorTextProps {
  content: string;

  className?: string;
}

const ErrorText: React.FC<ErrorTextProps> = ({ content, className }) => {
  return <ErroTextContainer className={className}>{content}</ErroTextContainer>;
};

export default ErrorText;

const ErroTextContainer = styled.span`
  color: ${palette.red_500};
`;
