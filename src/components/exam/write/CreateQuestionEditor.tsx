import dynamic from 'next/dynamic';
import React, { ComponentProps, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import editorStyle from '@styles/editorStyle';

import { Spin } from 'antd';
import palette from '@styles/palette';

const CreateQuestionEditorBlock = styled.div`
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .quill {
    width: 100%;
    ${editorStyle}
    .ql-container.ql-snow {
      min-height: 200px;
    }
    ol,
    ul {
      padding: 0;
    }
    .ql-blank::before {
      color: #ffffff40 !important;
    }
    .ql-toolbar.ql-snow,
    .ql-container.ql-snow {
      border-color: ${palette.colorBorderLight};
    }
  }
`;

const formats: ComponentProps<typeof ReactQuill>['formats'] = [
  'header',
  'bold',
  'list',
  'italic',
  'underline',
  'link',
  'formula',
  'script',
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

interface CreateQuestionEditorProps {
  content: string;
  setContent: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const CreateQuestionEditor: React.FC<CreateQuestionEditorProps> = ({
  content,
  setContent,
  placeholder = '내용을 작성해주세요.',
  className = '',
}) => {
  const reactQuillRef = useRef<ReactQuill | null>(null);

  const modules: ComponentProps<typeof ReactQuill>['modules'] = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold'],
          [{ script: 'sub' }, { script: 'super' }],
          ['link', 'formula'],
        ],
      },
    };
  }, []);

  return (
    <CreateQuestionEditorBlock className={className}>
      <ReactQuillWrapper
        theme="snow"
        forwardedRef={reactQuillRef}
        formats={formats}
        modules={modules}
        value={content}
        onChange={setContent}
        placeholder={placeholder}
      />
    </CreateQuestionEditorBlock>
  );
};

export default CreateQuestionEditor;
