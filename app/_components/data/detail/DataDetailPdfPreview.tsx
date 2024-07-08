import React, { useState } from 'react';
import styled from 'styled-components';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const DataDetailPdfPreviewBlock = styled.div``;

interface DataDetailPdfPreviewProps {}

const DataDetailPdfPreview: React.FC<DataDetailPdfPreviewProps> = () => {
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  return (
    <DataDetailPdfPreviewBlock>
      <Document
        file="/이력서-심은광.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(e) => {
          console.log(e);
        }}
      >
        <Page pageNumber={1} height={600} />
      </Document>
    </DataDetailPdfPreviewBlock>
  );
};

export default DataDetailPdfPreview;
