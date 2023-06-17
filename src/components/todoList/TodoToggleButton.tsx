import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { motion } from 'framer-motion';

const TodoToggleButtonBlock = styled(motion.button)`
  position: fixed;
  left: 20px;
  bottom: 20px;
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

  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
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

interface TodoToggleButtonProps {
  onClick: () => void;
}

const TodoToggleButton: React.FC<TodoToggleButtonProps> = ({ onClick }) => {
  return (
    <TodoToggleButtonBlock
      onClick={onClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
        loop: Infinity,
        repeatDelay: 1,
      }}
    >
      <ListAltIcon />
    </TodoToggleButtonBlock>
  );
};

export default TodoToggleButton;
