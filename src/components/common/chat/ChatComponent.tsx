import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import socketIOClient, { Socket } from 'socket.io-client';
import { Chat, Close } from '@mui/icons-material';
import palette from '@styles/palette';
import {
  MessageFilled,
  MessageOutlined,
  SettingFilled,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { ChatUserInfo, MessageType } from 'customTypes';
import Message from './Message';
import MessageInput from '../input/MessageInput';
import useInput from '@lib/hooks/useInput';
import { set } from 'cypress/types/lodash';
import { LocalStorage } from '@lib/utils/localStorage';

interface ChatComponentProps {}
const ChatComponent: React.FC<ChatComponentProps> = () => {
  const storage = new LocalStorage();
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const {
    value: message,
    onChange: onChangeMessage,
    setValue: setMessage,
  } = useInput('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [chatUser, setChatUser] = useState<ChatUserInfo | null>(null);
  const [roomUserList, setRoomUserList] = useState<string[]>([]);
  const [prevMessages, setPrevMessages] = useState<MessageType[]>([]);
  const [currentTab, setCurrentTab] = useState<'chat' | 'user' | 'setting'>(
    'chat'
  );
  const tabOptions = [
    {
      icon: <MessageOutlined />,
      value: 'chat',
      onClick: () => currentTab !== 'chat' && setCurrentTab('chat'),
    },
    {
      icon: <TeamOutlined />,
      value: 'user',
      onClick: () => currentTab !== 'user' && setCurrentTab('user'),
    },
    {
      icon: <SettingOutlined />,
      value: 'setting',
      onClick: () => currentTab !== 'setting' && setCurrentTab('setting'),
    },
  ];
  useEffect(() => {
    const ENDPOINT = 'http://localhost:8080';
    setSocket(
      socketIOClient(ENDPOINT, {
        transports: ['websocket'],
      })
    );
  }, []);
  useEffect(() => {
    console.log('socket', socket);
    if (socket) {
      const savedUserName = storage.get('chatHelper')?.username;
      if (savedUserName) {
        console.log('savedUserName', savedUserName);
        socket?.emit('setUsername', savedUserName);
      }

      socket?.on('joinedRoom', () => {
        console.log('Successfully joined room');
      });
      socket?.on('connected', (data: ChatUserInfo) => {
        setChatUser(data);
        if (!savedUserName) {
          storage.set('chatHelper', data);
        }
      });
      socket?.on('roomUserList', (data: string[]) => {
        setRoomUserList(data);
      });
      socket?.on('roomUserCount', (msg) => {
        console.log('roomUserCount', msg);
      });
      socket?.on('leftRoom', () => {
        console.log('Successfully left room');
      });
      socket?.on('chatHistory', (data: MessageType[]) => {
        if (prevMessages.length === 0) {
          setPrevMessages(data);
        }
      });
      socket?.on('chat', (msg) => {
        setMessages((prev) => [...prev, msg]);
      });
      socket?.emit('joinRoom', { room: '1' });
    }
    return () => {
      socket?.off();
    };
  }, [socket]);

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messageBoxRef, messages, prevMessages]);

  const joinRoom = () => {
    socket?.emit('joinRoom', { room: '1' });
  };

  const leaveRoom = () => {
    socket?.emit('leaveRoom', { room: '1' });
  };

  const sendMessage = () => {
    console.log('sendMessage', message);
    if (message !== '') {
      socket?.emit('chat', { room: '1', message });
      setMessage('');
    }
  };

  return (
    <ChatComponentBlock>
      <div className="chat-component-header">
        <div>{`모두CBT 잡담-${roomUserList.length}명 접속중`}</div>
        <button>
          <Close />
        </button>
      </div>
      <div className="chat-menu-bar">
        {tabOptions.map((tab) => (
          <button
            key={tab.value}
            className={`chat-menu-bar-button ${
              currentTab === tab.value ? 'active' : ''
            }`}
            onClick={tab.onClick}
          >
            {tab.icon}
          </button>
        ))}
      </div>

      <div className={`chat-tab ${currentTab !== 'chat' ? 'hidden' : ''}`}>
        <div className="chat-message-box" ref={messageBoxRef}>
          <ul>
            {prevMessages.map((message, index) => (
              <Message
                key={message.created_at}
                {...message}
                isMe={message.clientId === chatUser?.clientId}
              />
            ))}
            <li className="chat-message-box-prev-message-line-wrapper">
              <div className="chat-message-box-prev-message-line" />
              <div className="chat-message-box-prev-message-line-label">
                여기까지 이전 대화입니다.
              </div>
            </li>
          </ul>
          <ul>
            {messages.map((message, index) => (
              <Message
                key={message.created_at}
                {...message}
                isMe={message.clientId === chatUser?.clientId}
              />
            ))}
          </ul>
        </div>
        <div>
          <MessageInput
            value={message}
            onChange={onChangeMessage}
            onSubmit={sendMessage}
          />
        </div>
      </div>
      <div className={`chat-tab  ${currentTab !== 'user' ? 'hidden' : ''}`}>
        <ul className="chat-user-list-box">
          {roomUserList.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
      <div
        className={`chat-tab ${currentTab !== 'setting' ? 'hidden' : ''}`}
      ></div>
    </ChatComponentBlock>
  );
};

export default ChatComponent;

const ChatComponentBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid ${palette.gray_200};
  border-radius: 5px;
  height: 410px;
  overflow: hidden;
  .chat-component-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    font-size: 14px;
    border-bottom: 1px solid ${palette.gray_200};
    button {
      height: 14px;
      svg {
        font-size: 14px;
      }
    }
  }
  .chat-menu-bar {
    display: flex;
    align-items: center;
  }
  .chat-menu-bar-button {
    flex: 1;
    background-color: ${palette.gray_100};
    height: 35px;
  }
  .chat-menu-bar-button:not(:last-child) {
    border-right: 1px solid ${palette.gray_200};
  }
  .chat-menu-bar-button.active {
    background-color: white;
  }
  .chat-tab {
    position: absolute;
    width: 100%;
    top: 74px;
  }
  .chat-tab.hidden {
    opacity: 0;
    transform: translateY(-100%);
  }
  .chat-message-box,
  .chat-user-list-box,
  .chat-setting-box {
    padding: 5px 10px;
    height: 300px;
    overflow-y: auto;
  }
  .chat-user-list-box {
    height: 335px;
  }
  .chat-message-box-prev-message-line-wrapper {
    position: relative;
    margin: 20px 0;
    border-bottom: 1px solid ${palette.gray_200};
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .chat-message-box-prev-message-line-label {
    position: absolute;
    background-color: white;
    padding: 0 10px;
    color: ${palette.gray_500};
    font-size: 12px;
  }
`;
