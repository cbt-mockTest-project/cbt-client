import React from 'react';
import styled from 'styled-components';
import DataDetailPdfPreview from './DataDetailPdfPreview';

const DataDetailComponentBlock = styled.div``;

interface DataDetailComponentProps {}

const DataDetailComponent: React.FC<DataDetailComponentProps> = () => {
  return (
    <DataDetailComponentBlock>
      <DataDetailPdfPreview />
    </DataDetailComponentBlock>
  );
};

export default DataDetailComponent;
