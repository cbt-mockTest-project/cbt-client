import {
  UserOutlined,
  FolderOutlined,
  GoldOutlined,
  CloudOutlined,
  HistoryOutlined,
  MobileOutlined,
  WechatOutlined,
} from '@ant-design/icons';
export const navItems = [
  {
    key: '/modu-storage',
    icon: <CloudOutlined />,
    label: '모두 암기장',
  },

  {
    key: '/me/storage',
    icon: <FolderOutlined />,
    label: '내 암기장',
  },
  {
    key: '/me/history',
    icon: <HistoryOutlined />,
    label: '기록',
  },
  {
    key: '/pricing',
    icon: <GoldOutlined />,
    label: '스토어',
  },
  {
    key: '/me',
    icon: <UserOutlined />,
    label: '내 정보',
  },
];

export const navBottomItems = [
  {
    key: 'app-download',
    icon: <MobileOutlined />,
    label: '앱 설치',
  },
  {
    key: 'open-chat',
    icon: <WechatOutlined />,
    label: '오픈 채팅',
  },
];
