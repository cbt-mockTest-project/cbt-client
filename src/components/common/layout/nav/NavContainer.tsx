import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useLogoutMutation, useMeQuery } from '@lib/graphql/user/hook/useUser';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { coreActions } from '@modules/redux/slices/core';
import { DropBoxOption } from '../../dropbox/DropBox';
import { loginModal } from '@lib/constants';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { NoticeDropBoxOption } from '../../dropbox/NoticeDropBox';
import useToggle from '@lib/hooks/useToggle';
import { addHours, format, parseISO } from 'date-fns';
import NavView from './NavView';
import { NavViewProps } from './Nav.interface';

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
    await logoutMutation();
    location.reload();
  };
  const tryRequestLogout = convertWithErrorHandlingFunc({
    callback: requestLogout,
  });
  const notices = meQuery?.me.notices;
  const noticeBoxOptions: NoticeDropBoxOption[] =
    notices?.map((notice) => ({
      value: notice.id,
      label: notice.content,
      confirmed: notice.confirm,
      time: format(
        addHours(parseISO(notice.created_at), 9),
        'yyyy-MM-dd hh:mm a'
      ),
    })) || [];
  const hasNotices = notices && notices.length >= 1;
  const dropBoxOptions: DropBoxOption[] = [
    {
      label: '활동내역',
      onClick: () => router.push('/me/examhistory'),
    },
    {
      label: '프로필수정',
      onClick: () => router.push('/me/edit'),
    },
    {
      label: '로그아웃',
      onClick: tryRequestLogout,
    },
  ];
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
  const onOuterClickForNoticeDropBox = () =>
    noticesDropBoxState && setNoticesDropBoxState(false);
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
    tryRequestLogout,
    onOuterClickForNoticeDropBox,
    onOuterClickForProfileDropBox,
    isSelectedNavItem,
  };

  return <NavView {...NavProps} />;
};

export default NavContainer;
