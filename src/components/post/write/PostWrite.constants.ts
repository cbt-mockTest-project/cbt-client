import { PostCategory } from 'types';
import { DefaultOptionType } from 'antd/lib/select';

export const categoryOptions: DefaultOptionType[] = [
  { label: '자유게시판', value: PostCategory.Free },
  { label: '공지사항', value: PostCategory.Notice },
];
