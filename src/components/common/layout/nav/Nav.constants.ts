import { UserRole } from 'types';
import { NavItem, SubNavOption } from './Nav.interface';

export const NAV_ITEMS: NavItem[] = [
  {
    label: '게시판',
    path: '/community?c=SUGGENSTION',
    key: ['post', 'community'],
  },
  {
    label: '관리',
    path: '/manage/exam',
    key: ['manage'],
    permission: [UserRole.Admin, UserRole.Partner],
  },
];

export const MAIN_SUB_NAV_OPTIONS: SubNavOption[] = [
  { label: '북마크', value: 'bookmark', path: '/me/bookmark' },
  { label: '성취도', value: 'reviewnote', path: '/me/reviewnote' },
  { label: '메모장', value: 'memo', path: '/me/memo' },
  { label: '기록', value: 'examhistory', path: '/me/examhistory' },
  { label: '문제댓글', value: 'questioncomment', path: '/me/questioncomment' },
  { label: '시험지', value: 'myexam', path: '/me/myexam' },
];

export const MANAGE_SUB_NAV_OPTIONS: SubNavOption[] = [
  { label: '시험지', value: 'exam', path: '/manage/exam' },
  { label: '문제피드백', value: 'feedback', path: '/manage/feedback' },
  { label: '유저권한', value: 'permission', path: '/manage/permission' },
];
