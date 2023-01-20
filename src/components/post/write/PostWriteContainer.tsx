import React, {
  ComponentProps,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import 'react-quill/dist/quill.snow.css';
import { CreatePostInput, PostWriteProps } from './PostWrite.interface';
import PostWriteView from './PostWriteView';
import { categoryOptions } from './PostWrite.constants';
import dynamic from 'next/dynamic';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { useRouter } from 'next/router';
import { convertWithErrorHandlingFunc, removeHtmlTag } from '@lib/utils/utils';
import {
  useCreatePost,
  useEditPost,
  useLazyReadPost,
} from '@lib/graphql/user/hook/usePost';
import { message } from 'antd';
import { EditPostInput } from 'types';
import { useRevalidate } from '@lib/graphql/user/hook/useRevalidate';

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
  const [createPost, { loading: createPostLoading }] = useCreatePost();
  const [editPost, { loading: editPostLoading }] = useEditPost();
  const [formValidate, setFormValidate] = useState(false);
  const reactQuillRef = useRef<ReactQuill | null>(null);
  const isEditPage = router.pathname.indexOf('edit') > -1;
  const [readPost, { data: readPostQuery }] = useLazyReadPost('network-only');
  const postId = Number(router.query.Id);
  const [revalidate] = useRevalidate();
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
        formData.append('file', file);
        if (reactQuillRef.current) {
          const range = reactQuillRef.current.getEditorSelection();
          const loadingText = '이미지 로딩중 ....';
          if (range) {
            reactQuillRef.current
              .getEditor()
              .insertText(range.index, loadingText);
            const result = await axios.post(
              'http://localhost:80/uploads',
              formData
            );
            reactQuillRef.current
              .getEditor()
              .deleteText(range.index, loadingText.length);

            const IMG_URL = result.data.url;
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
    if (!formValidate) {
      setFormValidate(true);
    }
    if (!title || !removeHtmlTag(content)) return;
    const confirmed = confirm('글을 작성하시겠습니까?');
    if (!confirmed) return;
    console.log(removeHtmlTag(String(content)));
    const res = await createPost({ variables: { input: { title, content } } });
    if (res.data?.createPost.ok) {
      message.success('게시글이 작성됐습니다.');
      return router.back();
    }
    return message.error(res.data?.createPost.error);
  };
  const requestEdit = async ({ title, content, id }: EditPostInput) => {
    if (!formValidate) {
      setFormValidate(true);
    }
    if (!title || !removeHtmlTag(String(content))) return;

    const confirmed = confirm('글을 수정하시겠습니까?');
    if (!confirmed) return;
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
    formValidate,
    categoryOptions,
    ReactQuillWrapper,
    reactQuillRef,
    formats,
    modules,
    onCancle,
    onPost: isEditPage ? tryEdit : tryPost,
    postButtonLabel: isEditPage ? '수정하기' : '작성하기',
    readPostQuery,
    postLoading: isEditPage ? editPostLoading : createPostLoading,
  };
  return <PostWriteView {...postWriteProps} />;
};

export default PostWriteContainer;
