import React from 'react';
import styled from 'styled-components';

interface LabelProps {
  content: string | JSX.Element;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ content, className }) => {
  return (
    <LabelContainer className={`select-none ${className}`}>
      {content}
    </LabelContainer>
  );
};

export default Label;

const LabelContainer = styled.div`
  margin: 15px 0 2px 0;
  font-size: 0.9rem;
  font-weight: 600;
`;
