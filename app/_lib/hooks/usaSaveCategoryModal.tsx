import SaveCategoryModal from '../../_components/moduStorage/SaveCategoryModal';
import { StorageType } from '../../customTypes';
import { useRouter } from 'next/router';
import { useState } from 'react';

const useSaveCategoryModal = (storageType: StorageType) => {
  const router = useRouter();
  const urlSlug = router.query.name as string;
  const [isSaveCategoryModalOpen, setIsSaveCategoryModalOpen] = useState(false);

  const openSaveCategoryModal = () => {
    setIsSaveCategoryModalOpen(true);
  };
  const closeSaveCategoryModal = () => {
    setIsSaveCategoryModalOpen(false);
  };

  const placeholder = isSaveCategoryModalOpen ? (
    <SaveCategoryModal
      urlSlug={urlSlug}
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
