import SaveCategoryModal from '@components/moduStorage/SaveCategoryModal';
import { StorageType } from 'customTypes';
import { useState } from 'react';

const useSaveCategoryModal = (storageType: StorageType) => {
  const [isSaveCategoryModalOpen, setIsSaveCategoryModalOpen] = useState(false);

  const openSaveCategoryModal = () => {
    setIsSaveCategoryModalOpen(true);
  };
  const closeSaveCategoryModal = () => {
    setIsSaveCategoryModalOpen(false);
  };

  const placeholder = isSaveCategoryModalOpen ? (
    <SaveCategoryModal
      open={isSaveCategoryModalOpen}
      onCancel={closeSaveCategoryModal}
      onClose={closeSaveCategoryModal}
      storageType={storageType}
    />
  ) : null;

  return {
    isSaveCategoryModalOpen,
    openSaveCategoryModal,
    closeSaveCategoryModal,
    placeholder,
  };
};

export default useSaveCategoryModal;
