import {
  UserOutlined,
  FolderOutlined,
  GoldOutlined,
  MobileOutlined,
  WechatOutlined,
  AlertOutlined,
  GiftOutlined,
} from '@ant-design/icons';
import {
  AdminPanelSettingsOutlined,
  BookmarkOutlined,
} from '@mui/icons-material';
export const navItems = [
  {
    key: '/me/storage',
    icon: <FolderOutlined />,
    label: '내 암기장',
  },
  {
    key: '/pricing',
    icon: <GoldOutlined />,
    label: '이용권',
  },
  {
    key: '/me',
    icon: <UserOutlined />,
    label: '내 정보',
  },
  {
    key: '/me/bookmark',
    icon: <BookmarkOutlined />,
    label: '북마크',
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
  // {
  //   key: 'mall',
  //   icon: <GiftOutlined />,
  //   label: '모두 상점',
  // },
  {
    key: 'report',
    icon: <AlertOutlined />,
    label: '버그 신고',
  },
];

export const navSellerItems = [
  {
    key: '/me/admin',
    icon: <AdminPanelSettingsOutlined />,
    label: '관리자',
  },
];
