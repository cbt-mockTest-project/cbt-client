import palette from '@styles/palette';
import { Button, Input, message } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { PDFDocument } from 'pdf-lib';
import { responsive } from '@lib/utils/responsive';
import useInput from '@lib/hooks/useInput';
import DataRegisterEditor from './DataRegisterEditor';
import { handleError, removeHtmlTag } from '@lib/utils/utils';
import axios from 'axios';
import { useCreatePost } from '@lib/graphql/user/hook/usePost';
import { PostCategory } from 'types';
import { UploadFile } from '../Data.type';
import { useRouter } from 'next/router';
import DataRegisterFileUploadButton from './DataRegisterFileUploadButton';

const DataRegisterComponentBlock = styled.form`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  .data-register-upload-input {
    display: none;
  }
  .data-register-upload-label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 40px;
    padding: 0 15px;
    border-radius: 8px;
    border: 1px dashed ${palette.gray_300};
    font-size: 14px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    :hover {
      border-color: ${palette.antd_blue_01};
      color: ${palette.antd_blue_01};
    }
  }

  .data-register-uploaded-file-wrapper {
    display: flex;
    border-radius: 8px;
    height: 40px;
    gap: 10px;
    align-items: center;
    padding: 0 15px;
    font-size: 14px;
    border: 1px solid ${palette.gray_300};
  }
  .data-register-uploaded-file-button {
    text-align: left;
    display: inline-block;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    width: 80%;
    :hover {
      text-decoration: underline;
    }
  }
  .data-register-uploaded-file-clear-button {
    height: 24px;
    color: ${palette.gray_500};
    margin-left: auto;
    transition: all 0.2s ease-in-out;
    :hover {
      color: ${palette.antd_blue_01};
    }
  }
  .data-register-uploaded-file-page {
    font-size: 14px;
    color: ${palette.gray_700};
  }
  @media (max-width: ${responsive.medium}) {
    padding: 20px;
  }
`;

interface DataRegisterComponentProps {}

const DataRegisterComponent: React.FC<DataRegisterComponentProps> = () => {
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = useState<UploadFile | null>(null);
  const [pdfPageCount, setPdfPageCount] = useState<number>(0);
  const { value: title, onChange: onChangeTitle } = useInput('');
  const { value: content, setValue: setContent } = useInput('');
  const [createPost, { loading: createPostLoading }] = useCreatePost();

  const isSubmitDisabled = !title || !removeHtmlTag(content) || !uploadedFile;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (!file) return;
    if (file && file.size > 50 * 1024 * 1024) {
      alert('50MB 미만의 파일만 업로드 가능합니다.');
      return;
    }
    if (file && file.type !== 'application/pdf') {
      alert('PDF파일만 업로드 가능합니다.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', 'data');
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}uploads/pdf`,
      formData
    );
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pageCount = pdfDoc.getPageCount();
    setUploadedFile({
      url: result.data.url,
      name: file.name,
      page: pageCount,
    });
    setPdfPageCount(pageCount);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (isSubmitDisabled) return message.error('빈칸을 모두 채워주세요.');
      const res = await createPost({
        variables: {
          input: {
            title,
            content,
            category: PostCategory.Data,
            data: {
              price: 0,
              fileUrl: uploadedFile.url,
              fileName: uploadedFile.name,
              filePage: uploadedFile.page,
            },
          },
        },
      });
      if (res.data?.createPost) {
        message.success('성공적으로 등록되었습니다.');
        router.push('/data');
      }
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <DataRegisterComponentBlock onSubmit={onSubmit}>
      <Input
        className="data-register-title-input"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={onChangeTitle}
        size="large"
      />
      <DataRegisterEditor content={content} setContent={setContent} />
      <DataRegisterFileUploadButton
        uploadedFile={uploadedFile}
        setUploadedFile={setUploadedFile}
        handleFileChange={handleFileChange}
        pdfPageCount={pdfPageCount}
      />
      <Button
        type="primary"
        size="large"
        htmlType="submit"
        disabled={isSubmitDisabled}
        loading={createPostLoading}
      >
        등록하기
      </Button>
    </DataRegisterComponentBlock>
  );
};

export default DataRegisterComponent;
