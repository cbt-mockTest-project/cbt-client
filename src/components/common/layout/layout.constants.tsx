import {
  CrownOutlined,
  UserOutlined,
  FolderOutlined,
  GlobalOutlined,
  AppstoreOutlined,
  GoldOutlined,
} from '@ant-design/icons';

export const navList = [
  {
    path: '/public-storage',
    icon: <GlobalOutlined />,
    name: '공개 암기장',
  },
  {
    path: '/my-storage',
    icon: <FolderOutlined />,
    name: '내 암기장',
  },
  {
    path: '/premium-storage',
    icon: <CrownOutlined />,
    name: '프리미엄 암기장',
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
