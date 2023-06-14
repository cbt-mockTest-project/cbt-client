import { MessageOutlined, SettingOutlined } from '@ant-design/icons';

export type ChatTab = 'chat' | 'user' | 'setting';

export interface TabOption {
  icon: React.ReactNode;
  value: ChatTab;
}

export const tabOptions: TabOption[] = [
  {
    icon: <MessageOutlined />,
    value: 'chat',
  },
  {
    icon: <SettingOutlined />,
    value: 'setting',
  },
];
