import { PlusOutlined } from '@ant-design/icons';
import { Clear } from '@mui/icons-material';
import React from 'react';
import { UploadFile } from '../Data.type';

interface DataRegisterFileUploadButtonProps {
  uploadedFile: UploadFile | null;
  setUploadedFile: React.Dispatch<React.SetStateAction<UploadFile | null>>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  pdfPageCount: number;
}

const DataRegisterFileUploadButton: React.FC<
  DataRegisterFileUploadButtonProps
> = ({ uploadedFile, setUploadedFile, pdfPageCount, handleFileChange }) => {
  return (
    <>
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
    </>
  );
};

export default DataRegisterFileUploadButton;
