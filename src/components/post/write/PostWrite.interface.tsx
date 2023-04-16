import ReactQuill from 'react-quill';
import Select, { DefaultOptionType } from 'antd/lib/select';
import { SetStateAction, ComponentProps, Dispatch } from 'react';
import { ReadPostQuery } from '@lib/graphql/user/query/postQuery.generated';
import { EditPostInput } from 'types';

export interface CreatePostInput {
  title: string;
  content: string;
  id?: number;
}

export interface PostWriteProps {
  formValidate: boolean;
  categoryOptions: DefaultOptionType[];
  ReactQuillWrapper: any;
  reactQuillRef: any;
  formats: ComponentProps<typeof ReactQuill>['formats'];
  modules: ComponentProps<typeof ReactQuill>['modules'];
  onCancle: React.MouseEventHandler<HTMLElement>;
  onSelectCategory: ComponentProps<typeof Select>['onSelect'];
  readPostQuery?: ReadPostQuery | undefined;
  postButtonLabel: string;
  postLoading: boolean;
  onPost: ({ title, content }: CreatePostInput) => Promise<any>;
}
