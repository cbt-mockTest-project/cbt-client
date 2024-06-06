import {
  UserOutlined,
  FolderOutlined,
  GoldOutlined,
  CloudOutlined,
  HistoryOutlined,
  MobileOutlined,
  WechatOutlined,
  ClearOutlined,
  CrownOutlined,
  AlertOutlined,
  GlobalOutlined,
  YoutubeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { AdminPanelSettingsOutlined } from '@mui/icons-material';
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
    label: '유저 공유 암기장',
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
    key: '/me/history',
    icon: <HistoryOutlined />,
    label: '기록',
  },
];

export const navBottomItems = [
  {
    key: 'app-download',
    icon: <MobileOutlined />,
    label: '앱 설치',
  },
  {
    key: 'youtube',
    icon: <YoutubeOutlined />,
    label: '공식 유튜브',
  },
  {
    key: 'open-chat',
    icon: <WechatOutlined />,
    label: '오픈 채팅',
  },
  {
    key: '/pricing',
    icon: <ClearOutlined />,
    label: '광고 제거',
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
