import { PostCategory } from '../../types';

export const POST_CATEGORY_MAP = {
  CHECKIN: '출석체크',
  FREE: '자유게시판',
  NOTICE: '공지사항',
  RECOVERY: '시험지복원',
  REVIEW: '시험후기',
  SUGGENSTION: '건의하기',
  DATA: '자료실',
};

export const postCategories = [
  { label: '자유게시판', path: '/community', query: { c: PostCategory.Free } },

  { label: '시험후기', path: '/community', query: { c: PostCategory.Review } },
  {
    label: '비밀게시판',
    path: '/community',
    query: { c: PostCategory.Suggenstion },
  },
  {
    label: '기출복원',
    path: '/community',
    query: { c: PostCategory.Recovery },
  },
  { label: '공지사항', path: '/community', query: { c: PostCategory.Notice } },
];
