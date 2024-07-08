import { DropBoxOption } from '../../dropbox/DropBox';
import { NoticeDropBoxOption } from '../../dropbox/NoticeDropBox';
import { MeQuery } from '../../../../_lib/graphql/query/userQuery.generated';
import { UserRole } from '../../../../types';

export interface NavViewProps {
  sticky: boolean;
  profileDropBoxState: boolean;
  hasNotices: boolean | null | undefined;
  noticesDropBoxState: boolean;
  isRegister: boolean;
  menuState: boolean;
  meQuery: MeQuery | undefined;
  onToggleNoticesDropBox: React.MouseEventHandler<Element>;
  onToggleProfileDropBox: React.MouseEventHandler<Element>;
  onToggleMenu: () => void;
  noticeBoxOptions: NoticeDropBoxOption[];
  dropBoxOptions: DropBoxOption[];
  openLoginModal: React.MouseEventHandler<Element>;
  requestLogout: React.MouseEventHandler<Element>;
  onOuterClickForNoticeDropBox: React.MouseEventHandler<Element>;
  onOuterClickForProfileDropBox: React.MouseEventHandler<Element>;
  isSelectedNavItem: (key: string[]) => boolean;
}

export interface NavItem {
  label: string;
  path: string;
  key: string[];
  permission?: UserRole[];
  isNewTab?: boolean;
}

export interface SubNavOption {
  label: string;
  value: string;
  path: string;
}
