import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ChatToggleButton from './ChatToggleButton';
import ChatRoom from './ChatRoom';
import { motion, sync, useCycle } from 'framer-motion';
import { useDimensions } from '@lib/hooks/useDimensions';

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
  left: 30px;
  bottom: 30px;
`;
