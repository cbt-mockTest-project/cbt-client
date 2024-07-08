import { useOuterClick } from '../../../_lib/hooks/useOuterClick';
import React from 'react';
import styled from 'styled-components';

interface OuterClickProps {
  callback: Function;
  children: React.ReactNode;
}

const OuterClick: React.FC<OuterClickProps> = ({ callback, children }) => {
  const innerRef = useOuterClick(callback);
  return (
    <OuterClickContainer ref={innerRef as React.RefObject<HTMLDivElement>}>
      {children}
    </OuterClickContainer>
  );
};

export default OuterClick;

const OuterClickContainer = styled.div``;
