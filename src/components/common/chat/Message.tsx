import { UserOutlined } from '@ant-design/icons';
import palette from '@styles/palette';
import { MessageType } from 'customTypes';
import { format, parseISO } from 'date-fns';
import React from 'react';
import styled, { css } from 'styled-components';

interface MessageProps extends MessageType {
  isMe?: boolean;
}

const Message: React.FC<MessageProps> = ({
  message,
  created_at,
  username,
  isMe = false,
  room,
}) => {
  return (
    <MessageBlock isMe={isMe}>
      <div className="message-user-icon-wrapper">
        <UserOutlined />
      </div>
      <div className="message-username-wrapper">
        <div className="message-username">{username}</div>
        <div className="message-content-time-wrapper">
          <div className="message-content">{message}</div>
          <div className="message-time">
            {format(parseISO(created_at), 'HH:mm')}
          </div>
        </div>
      </div>
    </MessageBlock>
  );
};

export default Message;

interface MessageBlockProps {
  isMe: boolean;
}

const MessageBlock = styled.li<MessageBlockProps>`
  align-items: center;
  display: flex;
  gap: 10px;
  word-break: break-all;
  + li {
    margin-top: 10px;
  }
  .message-user-icon-wrapper {
    min-width: 35px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: ${palette.gray_100};

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .message-username-wrapper {
    display: flex;
    flex-direction: column;
    /* gap: 5px; */
  }
  .message-username {
    font-size: 12px;
    font-weight: bold;
  }

  .message-content-time-wrapper {
    font-size: 12px;
    display: flex;
    align-items: flex-end;
    gap: 5px;
  }
  .message-time {
    min-width: 30px;
    font-size: 12px;
    color: ${palette.gray_500};
    width: max-content;
  }
  .message-content {
    background-color: ${palette.gray_100};
    padding: 5px 15px;
    border-radius: 10px;
  }
  ${(props) =>
    props.isMe &&
    css`
      flex-direction: row-reverse;
      .message-user-icon-wrapper {
        display: none;
      }
      .message-username {
        display: none;
      }
      .message-content {
        background-color: ${palette.yellow_kakao};
      }
      .message-content-time-wrapper {
        flex-direction: row-reverse;
      }
    `}
`;
