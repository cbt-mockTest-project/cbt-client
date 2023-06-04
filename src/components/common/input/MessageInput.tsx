import palette from '@styles/palette';
import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import PublishIcon from '@mui/icons-material/Publish';

const MessageInputBlock = styled.div`
  display: flex;
  align-items: center;
  height: 35px;

  .message-input {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-top: 1px solid ${palette.gray_200};
    font-size: 14px;
    line-height: 21px;
    padding: 0 12px;
    ::placeholder {
      color: ${palette.gray_500};
      font-size: 14px;
      line-height: 21px;
    }
  }
  .message-input-button {
    background-color: ${palette.antd_blue_01};
    width: 40px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      color: white;
    }
  }
`;

interface MessageInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSubmit: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ ...props }) => {
  const { className, onSubmit } = props;
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };
  return (
    <MessageInputBlock className={className}>
      <input {...props} className="message-input" onKeyPress={handleKeyPress} />
      <button className="message-input-button" onClick={onSubmit}>
        <PublishIcon />
      </button>
    </MessageInputBlock>
  );
};

export default MessageInput;
