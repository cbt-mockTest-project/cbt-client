import { Button, Input } from 'antd';
import React from 'react';
import styled from 'styled-components';

const ChatSettingBlock = styled.div`
  padding: 5px 10px;
  overflow-y: auto;
  height: 335px;
  padding: 20px;
  .chat-setting-nickname-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .chat-setting-nickname-label {
    min-width: 50px;
  }
  .chat-setting-nickname-input {
    max-width: 300px;
  }
`;

interface ChatSettingProps {
  nickName: string;
  onEditNickName: (value: string) => void;
}

const ChatSetting: React.FC<ChatSettingProps> = ({
  nickName,
  onEditNickName,
}) => {
  const [nickNameValue, setNickNameValue] = React.useState<string>(nickName);
  return (
    <ChatSettingBlock>
      <div className="chat-setting-nickname-wrapper">
        <div className="chat-setting-nickname-label">닉네임</div>
        <Input
          className="chat-setting-nickname-input"
          value={nickNameValue}
          onChange={(e) => setNickNameValue(e.target.value)}
        />
        <Button type="primary" onClick={() => onEditNickName(nickNameValue)}>
          수정하기
        </Button>
      </div>
    </ChatSettingBlock>
  );
};

export default ChatSetting;
