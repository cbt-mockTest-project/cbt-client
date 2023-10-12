import dynamic from 'next/dynamic';
import React, { ComponentProps, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import editorStyle from '@styles/editorStyle';

import { Spin } from 'antd';

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
  }
`;

const formats: ComponentProps<typeof ReactQuill>['formats'] = [
  'header',
  'bold',
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
}

const CreateQuestionEditor: React.FC<CreateQuestionEditorProps> = ({
  content,
  setContent,
}) => {
  const reactQuillRef = useRef<ReactQuill | null>(null);

  const modules: ComponentProps<typeof ReactQuill>['modules'] = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          [{ script: 'sub' }, { script: 'super' }],
          ['link', 'formula'],
        ],
      },
    };
  }, []);

  return (
    <CreateQuestionEditorBlock>
      <ReactQuillWrapper
        theme="snow"
        forwardedRef={reactQuillRef}
        formats={formats}
        modules={modules}
        value={content}
        onChange={setContent}
        placeholder="내용을 작성해주세요."
      />
    </CreateQuestionEditorBlock>
  );
};

export default CreateQuestionEditor;
