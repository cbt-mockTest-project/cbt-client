import {
  UserOutlined,
  FolderOutlined,
  GoldOutlined,
  CloudOutlined,
  MobileOutlined,
  WechatOutlined,
  CrownOutlined,
  AlertOutlined,
  GlobalOutlined,
  SearchOutlined,
  GiftOutlined,
} from '@ant-design/icons';
import {
  AdminPanelSettingsOutlined,
  BookmarkOutlined,
  SailingOutlined,
} from '@mui/icons-material';
export const navItems = [
  {
    key: '/modu-storage',
    icon: <CloudOutlined />,
    label: '모두CBT 암기장',
  },
  {
    key: '/ehs-storage',
    icon: <CrownOutlined />,
    label: '직8딴 암기장',
  },
  {
    key: '/user-storage',
    icon: <GlobalOutlined />,
    label: '공개 암기장',
  },
  {
    key: '/me/storage',
    icon: <FolderOutlined />,
    label: '내 암기장',
  },
  {
    key: '/search-categories',
    icon: <SearchOutlined />,
    label: '암기장 통합검색',
  },
  {
    key: '/pricing',
    icon: <GoldOutlined />,
    label: '이용권',
  },
  // {
  //   key: '/store',
  //   icon: <StarOutlined />,
  //   label: '자료 스토어',
  // },
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
  {
    key: 'mall',
    icon: <GiftOutlined />,
    label: '모두 상점',
  },
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
