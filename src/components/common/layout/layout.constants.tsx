import {
  CrownOutlined,
  UserOutlined,
  FolderOutlined,
  GoldOutlined,
  UsergroupAddOutlined,
  CloudOutlined,
} from '@ant-design/icons';

export const navList = [
  {
    path: '/modu-storage',
    icon: <CloudOutlined />,
    name: '모두 암기장',
  },
  {
    path: '/premium-storage',
    icon: <CrownOutlined />,
    name: '프리미엄 암기장',
  },
  {
    path: '/user-storage',
    icon: <UsergroupAddOutlined />,
    name: '유저 암기장',
  },
  {
    path: '/my-storage',
    icon: <FolderOutlined />,
    name: '내 암기장',
  },
  {
    path: '/store',
    icon: <GoldOutlined />,
    name: '스토어',
  },
  {
    path: '/me',
    icon: <UserOutlined />,
    name: '내 정보',
  },
];
