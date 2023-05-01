import { PostCategory } from './../../types';
export const categorys = [
  // { label: '자유게시판', path: '/community', query: { c: PostCategory.Free } },
  {
    label: '건의하기',
    path: '/community',
    query: { c: PostCategory.Suggenstion },
  },
  // { label: '시험후기', path: '/community', query: { c: PostCategory.Review } },
  // {
  //   label: '기출복원',
  //   path: '/community',
  //   query: { c: PostCategory.Recovery },
  // },
  { label: '공지사항', path: '/community', query: { c: PostCategory.Notice } },
];
