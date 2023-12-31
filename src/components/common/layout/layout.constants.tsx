import {
  CrownOutlined,
  UserOutlined,
  FolderOutlined,
  GoldOutlined,
  UsergroupAddOutlined,
  CloudOutlined,
} from '@ant-design/icons';
export const navItems = [
  {
    key: '/modu-storage',
    icon: <CloudOutlined />,
    label: '모두 암기장',
  },
  // {
  //   key: '/premium-storage',
  //   icon: <CrownOutlined />,
  //   label: '프리미엄 암기장',
  // },
  // {
  //   key: '/user-storage',
  //   icon: <UsergroupAddOutlined />,
  //   label: '유저 암기장',
  // },
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
];
