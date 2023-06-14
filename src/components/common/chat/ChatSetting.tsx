import React from 'react';
import styled from 'styled-components';

const ChatSettingBlock = styled.div`
  padding: 5px 10px;
  overflow-y: auto;
  height: 335px;
`;

interface ChatSettingProps {}

const ChatSetting: React.FC<ChatSettingProps> = () => {
  return (
    <ChatSettingBlock>
      {/* 컴포넌트의 내용을 여기에 작성하세요. */}
    </ChatSettingBlock>
  );
};

export default ChatSetting;
