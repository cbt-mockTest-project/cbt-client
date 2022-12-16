import React from 'react';
import styled from 'styled-components';

interface LabelProps {
  content: string | JSX.Element;
  className?: string;
  htmlFor?: string;
}

const Label: React.FC<LabelProps> = ({ content, className, htmlFor }) => {
  return (
    <LabelContainer className={`select-none ${className}`} htmlFor={htmlFor}>
      {content}
    </LabelContainer>
  );
};

export default Label;

const LabelContainer = styled.label`
  margin: 15px 0 2px 0;
  font-size: 0.9rem;
  font-weight: 600;
`;
