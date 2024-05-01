import { Card, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import StoreCreateThumbnailUploader from './StoreCreateThumbnailUploader';
import StoreContentThumbnail from '../common/StoreContentThumbnail';
import { useFormContext } from 'react-hook-form';
import { CreateItemInput } from 'types';

interface StoreCreateCoverImageProps {}

const StoreCreateCoverImage: React.FC<StoreCreateCoverImageProps> = () => {
  const { watch } = useFormContext<CreateItemInput>();
  const [coverImageMode, setCoverImageMode] = useState<'template' | 'upload'>(
    'template'
  );
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    watch((data) => {
      if (title !== data.title) {
        setTitle(data.title);
      }
      if (description !== data.description) {
        setDescription(data.description);
      }
    });
  }, [watch]);

  return (
    <Card>
      <Radio.Group
        className="mb-4"
        options={[
          { label: '기본 이미지 사용', value: 'template' },
          { label: '이미지 업로드', value: 'upload' },
        ]}
        value={coverImageMode}
        onChange={(e) => setCoverImageMode(e.target.value)}
      />
      {coverImageMode === 'template' && (
        <div className="flex gap-4 w-full mt-5">
          <div className="flex-1 shrink-0">
            <StoreContentThumbnail title={title} description={description} />
          </div>
          <div className="flex-1 shrink-0" />
        </div>
      )}
      {coverImageMode === 'upload' && (
        <StoreCreateThumbnailUploader onChangeImage={() => {}} />
      )}
    </Card>
  );
};

export default StoreCreateCoverImage;
