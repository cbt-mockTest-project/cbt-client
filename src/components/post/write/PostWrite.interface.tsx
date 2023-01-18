import ReactQuill from 'react-quill';
import { DefaultOptionType } from 'antd/lib/select';
import { SetStateAction, ComponentProps, Dispatch } from 'react';

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
  tryPost: ({
    title,
    content,
  }: CreatePostInput) => () => Promise<void | undefined>;
}
