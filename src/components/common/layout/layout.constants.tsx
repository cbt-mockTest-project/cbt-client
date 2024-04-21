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
  MoneyCollectOutlined,
  AlertOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
export const navItems = [
  {
    key: '/modu-storage',
    icon: <CloudOutlined />,
    label: '국가고시 암기장',
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
    key: '/me/history',
    icon: <HistoryOutlined />,
    label: '기록',
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
    key: '/me/seller',
    icon: <MoneyCollectOutlined />,
    label: '판매 정보',
  },
];
