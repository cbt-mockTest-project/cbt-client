import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import socketIOClient, { Socket } from 'socket.io-client';
import { Close } from '@mui/icons-material';
import palette from '@styles/palette';
import { ChatUserInfo, MessageType } from 'customTypes';
import MessageInput from '../input/MessageInput';
import useInput from '@lib/hooks/useInput';
import { motion } from 'framer-motion';
import ChangeNameModal from './ChangeNameModal';
import { ChatTab, tabOptions } from './Chat.util';
import ChatList from './ChatList';
import ChatSetting from './ChatSetting';
import { responsive } from '@lib/utils/responsive';
import { message as antdMeesage } from 'antd';

interface ChatRoomProps {
  onClose: () => void;
  isOpen: boolean;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ onClose, isOpen }) => {
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
  const [isChangeNameModalOpen, setIsChangeNameModalOpen] = useState(false);

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

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const ENDPOINT = String(process.env.NEXT_PUBLIC_SOCKET_END_POINT);

    if (!socket) {
      // 이미 소켓이 생성되어 있다면 새로 생성하지 않음
      const newSocket = socketIOClient(ENDPOINT, {
        transports: ['websocket'],
        autoConnect: false, // 자동으로 연결하지 않도록 설정
      });
      setSocket(newSocket);
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.connect();
      socket.on('joinedRoom', () => {});
      socket.on('connected', (data: ChatUserInfo) => {
        setChatUser(data);
        setIsConnected(true);
      });
      socket.on('disconnect', () => {
        socket.connect();
      });
      socket.on('roomUserList', (data: string[]) => {
        setRoomUserList(data);
      });
      socket.on('chatHistory', (data: MessageType[]) => {
        if (prevMessages.length === 0) {
          setPrevMessages(data);
        }
      });
      socket.on('setUsername', (data: ChatUserInfo) => {
        setChatUser(data);
      });
      socket.on('chat', (msg) => {
        setMessages((prev) => [...prev, msg]);
      });
      socket?.emit('joinRoom', { room: '1' });
    }
    return () => {
      if (socket) {
        socket.off();
        socket.disconnect();
      }
    };
  }, [socket]);

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messageBoxRef, messages, prevMessages, isVisible, currentTab]);

  const sendMessage = () => {
    if (message !== '') {
      socket?.emit('chat', { room: '1', message });
      setMessage('');
    }
  };

  const updateMyChatName = (name: string) => {
    socket?.emit('setUsername', name);
  };

  return (
    <ChatRoomBlock isVisible={isVisible} variants={chatRoomToggleVariant}>
      <div className="chat-room-header">
        <div>
          {isConnected
            ? `수다방(BETA) - ${roomUserList.length}명 접속중`
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
          <div className="chat-room" ref={messageBoxRef}>
            <ChatList
              prevMessages={prevMessages}
              chatUser={chatUser}
              currentMessages={messages}
            />
          </div>
          <div className="chat-room-message-input-wrapper">
            <MessageInput
              value={message}
              onChange={onChangeMessage}
              onSubmit={sendMessage}
            />
            {!chatUser?.username && (
              <button
                className="chat-room-chat-start-button"
                onClick={() => setIsChangeNameModalOpen(true)}
              >
                대화를 시작해보세요.
              </button>
            )}
          </div>
        </div>
      )}
      {currentTab === 'setting' && (
        <div className="chat-tab">
          <ChatSetting
            nickName={chatUser?.username || ''}
            onEditNickName={(value) => {
              if (value.length > 10 || value.length < 2) {
                antdMeesage.error({
                  content: '닉네임은 2글자 이상 10글자 이하로 설정해주세요.',
                });
                return;
              }
              updateMyChatName(value);
              antdMeesage.success({ content: '닉네임이 변경되었습니다.' });
            }}
          />
          <div className="chat-setting-box">s</div>
        </div>
      )}
      <ChangeNameModal
        isOpen={isChangeNameModalOpen}
        onConfirm={(value) => {
          if (value.length > 10 || value.length < 2) {
            antdMeesage.error({
              content: '닉네임은 2글자 이상 10글자 이하로 설정해주세요.',
            });
            return;
          }
          updateMyChatName(value);
          setIsChangeNameModalOpen(false);
        }}
      />
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
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
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
  .chat-room {
    padding: 5px 10px;
    overflow-y: auto;
    height: 300px;
  }

  .chat-room-message-input-wrapper {
    position: relative;
  }
  .chat-room-chat-start-button {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: ${palette.gray_700};
    font-size: 14px;
    background-color: ${palette.gray_100};
    opacity: 0.7;
  }

  @media (max-width: ${responsive.lsmall}) {
    width: 100vw;
  }
`;
