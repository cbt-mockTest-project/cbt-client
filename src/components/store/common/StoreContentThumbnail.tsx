import { Input } from 'antd';
import Image from 'next/image';
import React from 'react';
import parse from 'html-react-parser';
interface StoreContentThumbnailProps {
  title?: string;
  description?: string;
  mode?: 'view' | 'edit';
}

const StoreContentThumbnail: React.FC<StoreContentThumbnailProps> = ({
  title,
  description,
  mode = 'edit',
}) => {
  if (mode === 'edit')
    return (
      <div className="aspect-[210/297] relative bg-lime-100 p-4">
        <div className="mt-4 mb-4 text-3xl ml-4 overflow-y-hidden font-bold whitespace-pre-line text-ellipsis line-clamp-2">
          <p>{title}</p>
        </div>
        <div className="text-[1.4rem] max-h-[210px] overflow-y-hidden whitespace-pre-line py-[4px] px-[11px] editor-style text-ellipsis line-clamp-6">
          {parse(description || '')}
        </div>
        <div className="absolute w-1/4 aspect-[1/1] bottom-4 right-4">
          <Image
            src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT}/public/logo.png`}
            alt="thumbnail"
            fill
          />
        </div>
      </div>
    );
  if (mode === 'view')
    return (
      <div className="aspect-[210/297] relative bg-lime-100 p-3">
        <div className="mb-[4px] text-[12px]  overflow-y-hidden font-bold whitespace-pre-line text-ellipsis line-clamp-2">
          <p>{title}</p>
        </div>
        <p className="text-[11px] max-h-[50px] overflow-y-hidden whitespace-pre-line  text-ellipsis line-clamp-3">
          {parse(description || '')}
        </p>
        <div className="absolute w-1/4 aspect-[1/1] bottom-2 right-2">
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
