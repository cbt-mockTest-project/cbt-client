import ReactQuill from 'react-quill';
import { DefaultOptionType } from 'antd/lib/select';
import { SetStateAction, ComponentProps, Dispatch } from 'react';
import { ReadPostQuery } from '@lib/graphql/user/query/postQuery.generated';
import { EditPostInput } from 'types';

export interface CreatePostInput {
  title: string;
  content: string;
}

export interface PostWriteProps {
  categoryOptions: DefaultOptionType[];
  ReactQuillWrapper: any;
  reactQuillRef: any;
  formats: ComponentProps<typeof ReactQuill>['formats'];
  modules: ComponentProps<typeof ReactQuill>['modules'];
  onCancle: React.MouseEventHandler<HTMLElement>;
  readPostQuery?: ReadPostQuery | undefined;
  onPost: ({
    title,
    content,
  }: CreatePostInput) => () => Promise<Promise<any> | undefined>;
}
