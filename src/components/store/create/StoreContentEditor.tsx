import dynamic from 'next/dynamic';
import React, { ComponentProps, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import editorStyle from '@styles/editorStyle';
import axios from 'axios';
import { handleError } from '@lib/utils/utils';
import { Spin } from 'antd';

const StoreContentEditorBlock = styled.div`
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .quill {
    width: 100%;
    ${editorStyle}
    .ql-container.ql-snow {
      min-height: 100px;
    }
  }
`;

const formats: ComponentProps<typeof ReactQuill>['formats'] = [
  'header',
  'bold',
  'italic',
  'underline',
  'list',
  'indent',
  'link',
  'image',
];

const ReactQuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    return function comp({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false, loading: () => <Spin /> }
);

interface StoreContentEditorProps {
  setContent: (content: string) => void;
  className?: string;
}

const StoreContentEditor: React.FC<StoreContentEditorProps> = ({
  setContent,
  className = '',
}) => {
  const reactQuillRef = useRef<ReactQuill | null>(null);
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    const requestImageUpload = async () => {
      try {
        if (input.files) {
          const file = input.files[0];
          const formData = new FormData();
          formData.append('file', file);
          formData.append('path', 'post');
          if (reactQuillRef.current) {
            const range = reactQuillRef.current.getEditorSelection();
            const loadingText = '이미지 로딩중 ....';
            if (range) {
              reactQuillRef.current
                .getEditor()
                .insertText(range.index, loadingText);
              const result = await axios.post(
                `${process.env.NEXT_PUBLIC_RESTAPI_URL}uploads`,
                formData
              );
              reactQuillRef.current
                .getEditor()
                .deleteText(range.index, loadingText.length);

              const IMG_URL = result.data.url;
              reactQuillRef.current
                .getEditor()
                .insertEmbed(range.index, 'image', IMG_URL);
              reactQuillRef.current
                .getEditor()
                .setSelection(range.index + 1, 0);
              document.body.querySelector(':scope > input')?.remove();
            }
          }
        }
      } catch (e) {
        handleError(e);
      }
    };
    input.addEventListener('change', requestImageUpload);
  };
  const modules: ComponentProps<typeof ReactQuill>['modules'] = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  return (
    <StoreContentEditorBlock className={className}>
      <ReactQuillWrapper
        theme="snow"
        forwardedRef={reactQuillRef}
        formats={formats}
        modules={modules}
        onChange={setContent}
        placeholder="자료소개 및 목차를 작성해주세요."
      />
    </StoreContentEditorBlock>
  );
};

export default StoreContentEditor;
