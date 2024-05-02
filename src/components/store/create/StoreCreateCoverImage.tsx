import { Card, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import StoreCreateThumbnailUploader from './StoreCreateThumbnailUploader';
import StoreContentThumbnail from '../common/StoreContentThumbnail';
import { useFormContext } from 'react-hook-form';
import { CreateItemInput } from 'types';

interface StoreCreateCoverImageProps {
  onChangeImage: (url: string) => void;
  defaultUrl?: string;
  defaultTitle?: string;
  defaultDescription?: string;
}

const StoreCreateCoverImage: React.FC<StoreCreateCoverImageProps> = ({
  onChangeImage,
  defaultUrl,
  defaultTitle,
  defaultDescription,
}) => {
  const { watch } = useFormContext<CreateItemInput>();
  const [coverImageMode, setCoverImageMode] = useState<'template' | 'upload'>(
    defaultUrl ? 'upload' : 'template'
  );
  const [title, setTitle] = useState<string>(defaultTitle || '');
  const [description, setDescription] = useState<string>(
    defaultDescription || ''
  );

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
        defaultValue={'upload'}
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
        <StoreCreateThumbnailUploader
          onChangeImage={onChangeImage}
          defaultImgUrl={defaultUrl}
        />
      )}
    </Card>
  );
};

export default StoreCreateCoverImage;
