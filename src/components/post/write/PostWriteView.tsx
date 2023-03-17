import useInput from '@lib/hooks/useInput';
import { removeHtmlTag } from '@lib/utils/utils';
import palette from '@styles/palette';
import { Button, Input, Select } from 'antd';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { PostWriteProps } from './PostWrite.interface';

const PostWriteView: React.FC<PostWriteProps> = (props) => {
  const {
    ReactQuillWrapper,
    reactQuillRef,
    formats,
    modules,
    onCancle,
    onPost,
    readPostQuery,
    postButtonLabel,
    formValidate,
    postLoading,
  } = props;

  const { value: content, setValue: setContent } = useInput('');
  const {
    value: title,
    onChange: onChangeTitle,
    setValue: setTitle,
  } = useInput('');

  useEffect(() => {
    if (readPostQuery?.readPost.post) {
      const prevContent = readPostQuery.readPost.post?.content;
      const prevTitle = readPostQuery.readPost.post?.title;
      setContent(prevContent);
      setTitle(prevTitle);
    }
  }, [readPostQuery?.readPost.post]);

  return (
    <PostWriteViewBlock>
      <Select
        options={props.categoryOptions}
        defaultValue={props.categoryOptions[0]}
        onSelect={props.onSelectCategory}
      />
      <Input placeholder="제목" value={title} onChange={onChangeTitle} />
      {formValidate && title.length <= 1 && (
        <p className="post-write-error-text">제목을 입력해주세요</p>
      )}
      <ReactQuillWrapper
        theme="snow"
        forwardedRef={reactQuillRef}
        value={content}
        onChange={setContent}
        formats={formats}
        modules={modules}
      />
      {formValidate && removeHtmlTag(content).length <= 1 && (
        <p className="post-write-error-text">내용을 입력해주세요</p>
      )}
      <div className="post-write-button-wrapper">
        <Button onClick={onCancle}>취소하기</Button>
        <Button
          type="primary"
          htmlType="button"
          loading={postLoading}
          onClick={() => onPost({ title, content })()}
        >
          {postButtonLabel}
        </Button>
      </div>
    </PostWriteViewBlock>
  );
};

export default PostWriteView;
const PostWriteViewBlock = styled.div`
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-bottom: 50px;
  padding: 20px;
  border: 1px solid ${palette.gray_200};
  border-radius: 5px;
  display: flex;
  gap: 15px;
  flex-direction: column;
  .ql-container {
    min-height: 300px;
  }
  .post-write-button-wrapper {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
  }
  .post-write-error-text {
    font-size: 0.8rem;
    color: ${palette.red_500};
    line-height: 1;
    position: relative;
    padding: 0 5px;
    bottom: 5px;
  }
`;
