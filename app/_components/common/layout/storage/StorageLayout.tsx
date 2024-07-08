import PlusCircleButton from '../../button/PlusCircleButton';
import useSaveCategoryModal from '../../../../_lib/hooks/usaSaveCategoryModal';
import { responsive } from '../../../../_lib/utils/responsive';
import { StorageType } from '../../../../customTypes';
import React from 'react';
import styled from 'styled-components';

const StorageLayoutBlock = styled.div`
  padding: 20px 30px 30px 30px;
  .storage-layout-header {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .storage-layout-title {
    font-size: 16px;
    font-weight: 700;
  }
  @media (max-width: ${responsive.medium}) {
    padding: 20px 16px;
  }
`;

interface StorageLayoutProps {
  children: React.ReactNode;
  title: string;
  storageType: StorageType;
  hasOpenSaveCategoryModalButton?: boolean;
}

const StorageLayout: React.FC<StorageLayoutProps> = ({
  children,
  storageType,
  title,
  hasOpenSaveCategoryModalButton,
}) => {
  const { openSaveCategoryModal, placeholder } =
    useSaveCategoryModal(storageType);
  return (
    <StorageLayoutBlock>
      <div className="storage-layout-header">
        <div className="storage-layout-title">{title}</div>
        {hasOpenSaveCategoryModalButton && (
          <PlusCircleButton onClick={openSaveCategoryModal} />
        )}
      </div>
      {children}
      {placeholder}
    </StorageLayoutBlock>
  );
};

export default StorageLayout;
