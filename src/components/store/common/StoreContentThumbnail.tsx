import { Input } from 'antd';
import Image from 'next/image';
import React from 'react';

interface StoreContentThumbnailProps {
  mode: 'edit' | 'view';
  title?: string;
  description?: string;
  setThumbnailTitle?: (title: string) => void;
  setThumbnailDescription?: (description: string) => void;
}

const StoreContentThumbnail: React.FC<StoreContentThumbnailProps> = ({
  mode,
  title,
  description,
  setThumbnailTitle,
  setThumbnailDescription,
}) => {
  return (
    <div className="aspect-[210/297] relative bg-slate-100 p-4">
      <Input
        className="mt-4 ml-4 font-bold"
        style={{
          fontSize: '1.6rem',
        }}
        size="large"
        placeholder={mode === 'edit' && '제목을 입력해주세요.'}
        variant="borderless"
        value={title}
        readOnly={mode === 'view'}
        onChange={(e) => setThumbnailTitle && setThumbnailTitle(e.target.value)}
      />
      {mode === 'edit' ? (
        <Input.TextArea
          className="mt-4 ml-4"
          style={{
            fontSize: '1.4rem',
          }}
          placeholder={mode === 'edit' && '자료 소개를 입력해주세요.'}
          autoSize={{ minRows: 4, maxRows: 6 }}
          variant="borderless"
          value={description}
          onChange={(e) =>
            setThumbnailDescription && setThumbnailDescription(e.target.value)
          }
        />
      ) : (
        <div className="text-[1.4rem] max-h-[210px] overflow-y-hidden whitespace-pre-line py-[4px] px-[11px]">
          {description}
        </div>
      )}
      <div className="absolute w-1/4 aspect-[1/1] bottom-4 right-4">
        <Image
          src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT}/public/logo.png`}
          alt="thumbnail"
          fill
        />
      </div>
    </div>
  );
};

export default StoreContentThumbnail;
