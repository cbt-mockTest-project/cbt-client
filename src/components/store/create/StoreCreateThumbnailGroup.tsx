import React, { useState } from 'react';
import StoreContentThumbnail from '../common/StoreContentThumbnail';

interface StoreCreateThumbnailGroupProps {}

const StoreCreateThumbnailGroup: React.FC<
  StoreCreateThumbnailGroupProps
> = () => {
  const [thumbnailTitle, setThumbnailTitle] = useState<string>('');
  const [thumbnailDescription, setThumbnailDescription] = useState<string>('');
  return (
    <div className="flex gap-4 mt-5">
      <div className="flex-1 shrink-0">
        <div className="text-gray-500 font-bold mb-2">편집</div>
        <StoreContentThumbnail
          mode="edit"
          title={thumbnailTitle}
          setThumbnailTitle={setThumbnailTitle}
          description={thumbnailDescription}
          setThumbnailDescription={setThumbnailDescription}
        />
      </div>
      <div className="flex-1 shrink-0">
        <div className="text-gray-500 font-bold mb-2">미리보기</div>
        <StoreContentThumbnail
          mode="view"
          title={thumbnailTitle}
          description={thumbnailDescription}
        />
      </div>
    </div>
  );
};

export default StoreCreateThumbnailGroup;
