import React, { useState } from 'react';
import styled from 'styled-components';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import palette from '@styles/palette';
import { motion } from 'framer-motion';
import { responsive } from '@lib/utils/responsive';

const ChatToggleButtonBlock = styled(motion.button)`
  position: fixed;
  cursor: pointer;
  outline: none;
  height: 56px;
  width: 56px;
  border-radius: 56px;
  border: none;
  padding: 0px;
  transition: box-shadow 0.2s ease 0s, background-color 0.3s ease 0s,
    opacity 0.2s ease 0s, transform 0.2s ease 0s;
  animation: 0.3s ease 0s 1 normal none running animation-1nrbrg8;
  left: 20px;
  bottom: 20px;
  box-shadow: rgba(88, 101, 242, 0.3) 0px 3px 5px -1px,
    rgba(88, 101, 242, 0.14) 0px 6px 10px 0px,
    rgba(88, 101, 242, 0.12) 0px 1px 18px 0px;
  background-color: ${palette.antd_blue_02};
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    color: white;
  }

  @media (max-width: ${responsive.medium}) {
    bottom: 65px;
    width: 45px;
    height: 45px;
  }
`;

interface ChatToggleButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({
  onClick,
  isOpen,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const toggleButtonVariant = {
    open: {
      rotate: 45,
      display: 'none',
    },
    closed: {
      rotate: 0,
    },
  };
  if (!isVisible) return null;
  return (
    <ChatToggleButtonBlock
      onClick={onClick}
      variants={toggleButtonVariant}
      animate={isOpen ? 'open' : 'closed'}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <QuestionAnswerIcon />
    </ChatToggleButtonBlock>
  );
};

export default ChatToggleButton;
