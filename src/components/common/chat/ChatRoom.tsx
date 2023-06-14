import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import socketIOClient, { Socket } from 'socket.io-client';
import { Close } from '@mui/icons-material';
import palette from '@styles/palette';
import {
  MessageOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { ChatUserInfo, MessageType } from 'customTypes';
import Message from './Message';
import MessageInput from '../input/MessageInput';
import useInput from '@lib/hooks/useInput';
import { LocalStorage } from '@lib/utils/localStorage';
import { motion } from 'framer-motion';

type ChatTab = 'chat' | 'user' | 'setting';

interface ChatRoomProps {
  onClose: () => void;
  isOpen: boolean;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ onClose, isOpen }) => {
  const storage = new LocalStorage();
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const {
    value: message,
    onChange: onChangeMessage,
    setValue: setMessage,
  } = useInput('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [chatUser, setChatUser] = useState<ChatUserInfo | null>(null);
  const [roomUserList, setRoomUserList] = useState<string[]>([]);
  const [prevMessages, setPrevMessages] = useState<MessageType[]>([]);
  const [currentTab, setCurrentTab] = useState<ChatTab>('chat');
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const chatRoomToggleVariant = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at -400px 410px)`,
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
        duration: 0.5,
      },
    }),
    closed: {
      clipPath: 'circle(30px at -400px 410px)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        onComplete: () => {
          setIsVisible(false);
        },
      },
    },
  };

  interface TabOption {
    icon: React.ReactNode;
    value: ChatTab;
  }

  const tabOptions: TabOption[] = [
    {
      icon: <MessageOutlined />,
      value: 'chat',
    },
    {
      icon: <TeamOutlined />,
      value: 'user',
    },
    {
      icon: <SettingOutlined />,
      value: 'setting',
    },
  ];

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const ENDPOINT = 'http://localhost:8080';
    setSocket(
      socketIOClient(ENDPOINT, {
        transports: ['websocket'],
      })
    );
  }, []);
  useEffect(() => {
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
        setIsConnected(true);
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
    <ChatRoomBlock isVisible={isVisible} variants={chatRoomToggleVariant}>
      <div className="chat-room-header">
        <div>
          {isConnected
            ? `모두CBT 잡담-${roomUserList.length}명 접속중`
            : '서버 접속중..'}
        </div>
        <button className="chat-room-close-button" onClick={onClose}>
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
            onClick={() => {
              if (currentTab !== tab.value) {
                setCurrentTab(tab.value);
              }
            }}
          >
            {tab.icon}
          </button>
        ))}
      </div>

      {currentTab === 'chat' && (
        <div className="chat-tab">
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
      )}
      {currentTab === 'user' && (
        <div className="chat-tab">
          <ul className="chat-user-list-box">
            {roomUserList.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>
      )}
      {currentTab === 'setting' && (
        <div className="chat-tab">
          <div className="chat-setting-box">s</div>
        </div>
      )}
    </ChatRoomBlock>
  );
};

export default ChatRoom;

const ChatRoomBlock = styled(motion.div)<{ isVisible: boolean }>`
  position: relative;
  display: flex;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  flex-direction: column;
  border: 1px solid ${palette.gray_200};
  border-radius: 5px;
  height: 100%;
  max-height: 410px;
  width: 400px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  .chat-room-header {
    display: flex;
    background-color: white;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    font-size: 14px;
    border-bottom: 1px solid ${palette.gray_200};
    button {
      height: 20px;
      svg {
        font-size: 20px;
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
    cursor: pointer;
  }
  .chat-menu-bar-button:not(:last-child) {
    border-right: 1px solid ${palette.gray_200};
  }
  .chat-menu-bar-button.active {
    background-color: white;
  }
  .chat-tab {
    background-color: white;
  }

  .chat-message-box,
  .chat-user-list-box,
  .chat-setting-box {
    padding: 5px 10px;
    overflow-y: auto;
    height: 300px;
  }
  .chat-user-list-box,
  .chat-setting-box {
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
