import { DropBoxOption } from '@components/common/dropbox/DropBox';
import { NoticeDropBoxOption } from '@components/common/dropbox/NoticeDropBox';
import { MeQuery } from '@lib/graphql/user/query/userQuery.generated';

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
