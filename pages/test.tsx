import React, { useEffect } from 'react';
import styled from 'styled-components';

interface TestProps {}

const Test: React.FC<TestProps> = () => {
  let testbutton: any;
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', (e) => {
        testbutton = e;
      });
    }
  }, []);
  return (
    <TestContainer>
      <button onClick={testbutton}>테스트</button>
    </TestContainer>
  );
};

export default Test;

const TestContainer = styled.div``;
