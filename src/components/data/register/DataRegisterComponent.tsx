import palette from '@styles/palette';
import { Button, Input, message } from 'antd';
import dynamic from 'next/dynamic';
import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { Buffer } from 'buffer';
import { PDFDocument } from 'pdf-lib';
import { responsive } from '@lib/utils/responsive';
import { Clear, PlusOneOutlined } from '@mui/icons-material';
import { PlusOutlined } from '@ant-design/icons';
import useInput from '@lib/hooks/useInput';
import DataRegisterEditor from './DataRegisterEditor';
import { removeHtmlTag } from '@lib/utils/utils';

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

const mockFile = {
  name: '산업안전기사10개년 요약집.pdf',
  url: 'https://moducbt.com',
  page: 10,
};

const DataRegisterComponent: React.FC<DataRegisterComponentProps> = () => {
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [pdfPageCount, setPdfPageCount] = useState<number>(0);
  const { value: title, onChange: onChangeTitle } = useInput('');
  const { value: content, setValue: setContent } = useInput('');
  const isSubmitDisabled = !title || !removeHtmlTag(content) || !uploadedFile;
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (!file) return;
    if (file && file.size > 50 * 1024 * 1024) {
      // 50MB
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
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    setUploadedFile(mockFile);
    setPdfPageCount(pdfDoc.getPageCount());
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitDisabled) return message.error('빈칸을 모두 채워주세요.');
    console.log(title, content, uploadedFile);
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
      {!uploadedFile && (
        <>
          <label htmlFor="data-file" className="data-register-upload-label">
            <span>
              <PlusOutlined />
            </span>
            <span>파일 업로드 (최대용량 50MB)</span>
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="data-register-upload-input"
            id="data-file"
          />
        </>
      )}
      {uploadedFile && (
        <div className="data-register-uploaded-file-wrapper">
          <button
            className="data-register-uploaded-file-button"
            type="button"
            onClick={() => {}}
          >
            {uploadedFile.name}
          </button>
          <div className="data-register-uploaded-file-page">{`${pdfPageCount}페이지`}</div>
          <button
            className="data-register-uploaded-file-clear-button"
            onClick={() => {
              setUploadedFile(null);
            }}
          >
            <Clear />
          </button>
        </div>
      )}

      <Button
        type="primary"
        size="large"
        htmlType="submit"
        disabled={isSubmitDisabled}
      >
        등록하기
      </Button>
    </DataRegisterComponentBlock>
  );
};

export default DataRegisterComponent;
