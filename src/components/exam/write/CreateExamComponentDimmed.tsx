import React, { useEffect } from 'react';
import styled from 'styled-components';

const CreateExamComponentDimmedBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
  }
`;

interface CreateExamComponentDimmedProps {
  content?: string;
}

const CreateExamComponentDimmed: React.FC<CreateExamComponentDimmedProps> = ({
  content,
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <CreateExamComponentDimmedBlock>
      <p>{content}</p>
    </CreateExamComponentDimmedBlock>
  );
};

export default CreateExamComponentDimmed;
