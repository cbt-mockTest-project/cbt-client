import React from 'react';
import styled from 'styled-components';
import CategoryFolderList from './CategoryFolderList';
import { MockExamCategory } from 'types';
import { responsive } from '@lib/utils/responsive';

const PublicStorageComponentBlock = styled.div`
  padding: 30px;
  @media (max-width: ${responsive.medium}) {
    padding: 20px 16px;
  }
`;

interface PublicStorageComponentProps {
  categories: MockExamCategory[];
}

const PublicStorageComponent: React.FC<PublicStorageComponentProps> = ({
  categories,
}) => {
  return (
    <PublicStorageComponentBlock>
      <CategoryFolderList categories={categories} />
    </PublicStorageComponentBlock>
  );
};

export default PublicStorageComponent;
