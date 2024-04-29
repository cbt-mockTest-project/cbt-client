import { Card, Radio } from 'antd';
import React, { useState } from 'react';
import StoreCreateThumbnailGroup from './StoreCreateThumbnailGroup';
import StoreCreateThumbnailUploader from './StoreCreateThumbnailUploader';

interface StoreCreateCoverImageProps {}

const StoreCreateCoverImage: React.FC<StoreCreateCoverImageProps> = () => {
  const [coverImageMode, setCoverImageMode] = useState<'template' | 'upload'>(
    'template'
  );
  return (
    <Card>
      <Radio.Group
        className="mb-4"
        options={[
          { label: '템플릿 사용', value: 'template' },
          { label: '이미지 업로드', value: 'upload' },
        ]}
        value={coverImageMode}
        onChange={(e) => setCoverImageMode(e.target.value)}
      />
      {coverImageMode === 'template' && <StoreCreateThumbnailGroup />}
      {coverImageMode === 'upload' && (
        <StoreCreateThumbnailUploader onChangeImage={() => {}} />
      )}
    </Card>
  );
};

export default StoreCreateCoverImage;
