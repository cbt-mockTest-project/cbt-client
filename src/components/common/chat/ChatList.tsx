import { ChatUserInfo, MessageType } from 'customTypes';
import React from 'react';
import styled from 'styled-components';
import Message from './Message';
import palette from '@styles/palette';

const ChatListBlock = styled.div`
  .chat-room-prev-message-line-wrapper {
    position: relative;
    margin: 20px 0;
    border-bottom: 1px solid ${palette.gray_200};
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .chat-room-prev-message-line-label {
    position: absolute;
    background-color: white;
    padding: 0 10px;
    color: ${palette.gray_500};
    font-size: 12px;
  }
`;

interface ChatListProps {
  prevMessages: MessageType[];
  chatUser: ChatUserInfo | null;
  currentMessages: MessageType[];
}

const ChatList: React.FC<ChatListProps> = ({
  prevMessages,
  chatUser,
  currentMessages,
}) => {
  return (
    <ChatListBlock>
      <ul>
        {prevMessages.map((message, index) => (
          <Message
            key={message.created_at}
            {...message}
            isMe={message.clientId === chatUser?.clientId}
          />
        ))}
        <li className="chat-room-prev-message-line-wrapper">
          <div className="chat-room-prev-message-line" />
          <div className="chat-room-prev-message-line-label">
            여기까지 이전 대화입니다.
          </div>
        </li>
      </ul>
      <ul>
        {currentMessages.map((message, index) => (
          <Message
            key={message.created_at}
            {...message}
            isMe={message.clientId === chatUser?.clientId}
          />
        ))}
      </ul>
    </ChatListBlock>
  );
};

export default ChatList;
