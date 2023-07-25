import { PlusOutlined } from '@ant-design/icons';
import { Clear } from '@mui/icons-material';
import React from 'react';
import { UploadFile } from '../Data.type';
import { Spin } from 'antd';

interface DataRegisterFileUploadButtonProps {
  uploadedFile: UploadFile | null;
  uploadedFileLoading: boolean;
  setUploadedFile: React.Dispatch<React.SetStateAction<UploadFile | null>>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  pdfPageCount: number;
}

const DataRegisterFileUploadButton: React.FC<
  DataRegisterFileUploadButtonProps
> = ({
  uploadedFile,
  setUploadedFile,
  pdfPageCount,
  handleFileChange,
  uploadedFileLoading,
}) => {
  return (
    <>
      {!uploadedFile && (
        <>
          <label htmlFor="data-file" className="data-register-upload-label">
            {uploadedFileLoading ? (
              <Spin />
            ) : (
              <>
                <span>
                  <PlusOutlined />
                </span>
                <span>파일 업로드( PDF만 업로드 가능 )</span>
              </>
            )}
          </label>
          {!uploadedFileLoading && (
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="data-register-upload-input"
              id="data-file"
            />
          )}
        </>
      )}
      {uploadedFile && (
        <div className="data-register-uploaded-file-wrapper">
          <a
            className="data-register-uploaded-file-button"
            target="_blank"
            rel="noreferrer"
            href={uploadedFile.url}
          >
            {uploadedFile.name}
          </a>
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
    </>
  );
};

export default DataRegisterFileUploadButton;
