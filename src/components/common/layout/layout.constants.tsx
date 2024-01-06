import {
  UserOutlined,
  FolderOutlined,
  GoldOutlined,
  CloudOutlined,
  HistoryOutlined,
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
    key: '/pricing',
    icon: <GoldOutlined />,
    label: '스토어',
  },
  {
    key: '/me',
    icon: <UserOutlined />,
    label: '내 정보',
  },
  {
    key: '/me/history',
    icon: <HistoryOutlined />,
    label: '기록',
  },
];
