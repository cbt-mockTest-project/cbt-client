import { DefaultOptionType } from 'antd/lib/select';
import { PostCategory } from 'types';

export const categoryOptions: DefaultOptionType[] = [
  { label: '자유게시판', value: PostCategory.Free },
  { label: '시험후기', value: PostCategory.Review },
  { label: '기출복원', value: PostCategory.Recovery },
  { label: '공지사항', value: PostCategory.Notice },
];
