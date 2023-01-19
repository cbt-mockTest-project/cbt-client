import React, { ComponentProps, useEffect, useMemo, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import { CreatePostInput, PostWriteProps } from './PostWrite.interface';
import PostWriteView from './PostWriteView';
import { categoryOptions } from './PostWrite.constants';
import dynamic from 'next/dynamic';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { useRouter } from 'next/router';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import {
  useCreatePost,
  useEditPost,
  useLazyReadPost,
} from '@lib/graphql/user/hook/usePost';
import { message } from 'antd';
import { EditPostInput } from 'types';

interface PostWriteContainerProps {}

const ReactQuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    return function comp({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);

const PostWriteContainer: React.FC<PostWriteContainerProps> = () => {
  const router = useRouter();
  const [createPost] = useCreatePost();
  const reactQuillRef = useRef<ReactQuill | null>(null);
  const isEditPage = router.pathname.indexOf('edit') > -1;
  const [editPost] = useEditPost();
  const [readPost, { data: readPostQuery }] = useLazyReadPost('network-only');
  const postId = Number(router.query.Id);
  useEffect(() => {
    if (postId) {
      readPost({ variables: { input: { id: postId } } });
    }
  }, [router.query.Id]);
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    const requestImageUpload = async () => {
      if (input.files) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('file', file); // formData는 키-밸류 구조
        const result = await axios.post(
          'http://localhost:80/uploads',
          formData
        );
        const IMG_URL = result.data.url;
        if (reactQuillRef.current) {
          const range = reactQuillRef.current.getEditorSelection();
          if (range) {
            reactQuillRef.current
              .getEditor()
              .insertEmbed(range.index, 'image', IMG_URL);
            reactQuillRef.current.getEditor().setSelection(range.index + 1, 0);
            document.body.querySelector(':scope > input')?.remove();
          }
        }
      }
    };
    const tryImageUpload = convertWithErrorHandlingFunc({
      callback: requestImageUpload,
    });
    input.addEventListener('change', tryImageUpload);
  };
  const modules: ComponentProps<typeof ReactQuill>['modules'] = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: [] }],
          ['blockquote', 'code-block'],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);
  const formats: ComponentProps<typeof ReactQuill>['formats'] = [
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];
  const onCancle = () => router.back();
  const requestPost = async ({ title, content }: CreatePostInput) => {
    const res = await createPost({ variables: { input: { title, content } } });
    if (res.data?.createPost.ok) {
      message.success('게시글이 작성됐습니다.');
      return router.back();
    }
    return message.error(res.data?.createPost.error);
  };
  const requestEdit = async ({ title, content, id }: EditPostInput) => {
    const res = await editPost({
      variables: { input: { title, content, id } },
    });
    if (res.data?.editPost.ok) {
      message.success('게시글이 수정됐습니다.');
      return router.back();
    }
    return message.error(res.data?.editPost.error);
  };
  const tryPost = ({ title, content }: CreatePostInput) =>
    convertWithErrorHandlingFunc({
      callback: () => requestPost({ title, content }),
    });
  const tryEdit = ({ title, content }: CreatePostInput) =>
    convertWithErrorHandlingFunc({
      callback: () => requestEdit({ title, content, id: postId }),
    });
  const postWriteProps: PostWriteProps = {
    categoryOptions,
    ReactQuillWrapper,
    reactQuillRef,
    formats,
    modules,
    onCancle,
    onPost: isEditPage ? tryEdit : tryPost,
    readPostQuery,
  };
  return <PostWriteView {...postWriteProps} />;
};

export default PostWriteContainer;
