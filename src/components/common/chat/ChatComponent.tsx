import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ChatToggleButton from './ChatToggleButton';
import ChatRoom from './ChatRoom';
import { motion, sync, useCycle } from 'framer-motion';
import { useDimensions } from '@lib/hooks/useDimensions';
import { responsive } from '@lib/utils/responsive';

interface ChatComponentProps {}
const ChatComponent: React.FC<ChatComponentProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const chatComponentRef = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(chatComponentRef);

  return (
    <ChatComponentBlock
      ref={chatComponentRef}
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
    >
      <ChatToggleButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      <ChatRoom onClose={() => setIsOpen(false)} isOpen={isOpen} />
    </ChatComponentBlock>
  );
};

export default ChatComponent;

const ChatComponentBlock = styled(motion.div)`
  position: fixed;
  z-index: 1000;
  left: 30px;
  bottom: 30px;
  @media (max-width: ${responsive.medium}) {
    bottom: 75px;
  }
  @media (max-width: ${responsive.lsmall}) {
    left: 0;
    bottom: 0;
  }
`;
