import React, { useEffect } from 'react';
import styled from 'styled-components';

interface TestProps {}

const Test: React.FC<TestProps> = () => {
  let deferredPrompt: any;
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', (e) => {
        deferredPrompt = e;
      });

      const installApp = document.getElementById('installApp');
      installApp?.addEventListener('click', async () => {
        if (deferredPrompt !== null) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === 'accepted') {
            deferredPrompt = null;
          }
        }
      });
    }
  }, []);
  return (
    <TestContainer>
      <button id="installApp">Install</button>
    </TestContainer>
  );
};

export default Test;

const TestContainer = styled.div``;
