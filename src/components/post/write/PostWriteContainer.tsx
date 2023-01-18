import React, { ComponentProps, useMemo, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import { CreatePostInput, PostWriteProps } from './PostWrite.interface';
import PostWriteView from './PostWriteView';
import { categoryOptions } from './PostWrite.constants';
import dynamic from 'next/dynamic';
import ReactQuill from 'react-quill';
import useInput from '@lib/hooks/useInput';
import axios from 'axios';
import { useRouter } from 'next/router';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { useCreatePost } from '@lib/graphql/user/hook/usePost';
import { message } from 'antd';

interface PostWriteContainerProps {}

const PostWriteContainer: React.FC<PostWriteContainerProps> = () => {
  const router = useRouter();
  const [createPost] = useCreatePost();
  const reactQuillRef = useRef<ReactQuill | null>(null);
  const ReactQuillWrapper = dynamic(
    async () => {
      const { default: RQ } = await import('react-quill');
      return function comp({ forwardedRef, ...props }: any) {
        return <RQ ref={forwardedRef} {...props} />;
      };
    },
    { ssr: false }
  );
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
  const tryPost = ({ title, content }: CreatePostInput) =>
    convertWithErrorHandlingFunc({
      callback: () => requestPost({ title, content }),
    });
  const postWriteProps: PostWriteProps = {
    categoryOptions,
    ReactQuillWrapper,
    reactQuillRef,
    formats,
    modules,
    onCancle,
    tryPost,
  };
  return <PostWriteView {...postWriteProps} />;
};

export default PostWriteContainer;
