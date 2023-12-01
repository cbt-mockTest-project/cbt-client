import React from 'react';
import styled from 'styled-components';
import CategoryFolderList from './CategoryFolderList';
import { MockExamCategory } from 'types';
import { responsive } from '@lib/utils/responsive';

const ModuStorageComponentBlock = styled.div`
  padding: 30px;
  @media (max-width: ${responsive.medium}) {
    padding: 20px 16px;
  }
`;

interface ModuStorageComponentProps {
  categories: MockExamCategory[];
}

const ModuStorageComponent: React.FC<ModuStorageComponentProps> = ({
  categories,
}) => {
  return (
    <ModuStorageComponentBlock>
      <CategoryFolderList categories={categories} />
    </ModuStorageComponentBlock>
  );
};

export default ModuStorageComponent;
