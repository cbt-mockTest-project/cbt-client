import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useLogoutMutation, useMeQuery } from '@lib/graphql/hook/useUser';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { coreActions } from '@modules/redux/slices/core';
import { DropBoxOption } from '../../dropbox/DropBox';
import { loginModal } from '@lib/constants';
import { NoticeDropBoxOption } from '../../dropbox/NoticeDropBox';
import useToggle from '@lib/hooks/useToggle';
import NavView from './NavView';
import { NavViewProps } from './Nav.interface';
import { convertToKST, handleError } from '@lib/utils/utils';
import { UserRole } from 'types';

const NavContainer = () => {
  const router = useRouter();
  const [sticky, setSticky] = useState(false);
  const [menuState, setMenuState] = useState(false);
  const {
    value: profileDropBoxState,
    setValue: setProfileDropBoxState,
    onToggle: onToggleProfileDropBox,
  } = useToggle();
  const {
    value: noticesDropBoxState,
    setValue: setNoticesDropBoxState,
    onToggle: onToggleNoticesDropBox,
  } = useToggle();
  const { data: meQuery } = useMeQuery();
  const { pathname } = useRouter();
  const [logoutMutation] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const isRegister = pathname.includes('/register');
  const requestLogout = async () => {
    try {
      await logoutMutation();
      location.reload();
    } catch (e) {
      handleError(e);
    }
  };

  const notices = meQuery?.me.notices;
  const noticeBoxOptions: NoticeDropBoxOption[] =
    notices?.map((notice) => ({
      value: notice.id,
      label: notice.content,
      confirmed: notice.confirm,
      link: notice.link,
      time: convertToKST(notice.created_at, 'yy.MM.dd HH:mm'),
    })) || [];
  const hasNotices = notices && notices.length >= 1;
  const dropBoxOptions: DropBoxOption[] = [
    {
      label: '활동내역',
      onClick: () => router.push('/me/bookmark'),
    },
    {
      label: '프로필',
      onClick: () => router.push('/me/edit'),
    },
    {
      label: '로그아웃',
      onClick: requestLogout,
    },
  ];
  if (
    meQuery?.me.user &&
    [UserRole.Admin, UserRole.Partner].includes(meQuery.me.user.role)
  ) {
    dropBoxOptions.push({
      label: '관리자페이지',
      onClick: () => router.push('/manage/permission'),
    });
  }
  const onScroll = () => {
    if (window.scrollY > 60 && !sticky) {
      return setSticky(true);
    }
    if (window.scrollY <= 60 && sticky) {
      return setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [sticky]);
  const openLoginModal = () => dispatch(coreActions.openModal(loginModal));
  const onToggleMenu = () => setMenuState(!menuState);
  const onOuterClickForNoticeDropBox = () => {
    noticesDropBoxState && setNoticesDropBoxState(false);
  };
  const onOuterClickForProfileDropBox = () =>
    profileDropBoxState && setProfileDropBoxState(false);
  const isSelectedNavItem = (key: string[]) =>
    key.findIndex((value) => router.pathname.includes(value)) > -1;

  const NavProps: NavViewProps = {
    sticky,
    profileDropBoxState,
    hasNotices,
    noticesDropBoxState,
    isRegister,
    menuState,
    meQuery,
    onToggleNoticesDropBox,
    onToggleProfileDropBox,
    onToggleMenu,
    noticeBoxOptions,
    dropBoxOptions,
    openLoginModal,
    requestLogout,
    onOuterClickForNoticeDropBox,
    onOuterClickForProfileDropBox,
    isSelectedNavItem,
  };

  return <NavView {...NavProps} />;
};

export default NavContainer;
