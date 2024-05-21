/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import React, { useState } from 'react';

interface StorePreviewImageProps {
  isActive: boolean;
  image: string;
}

const StorePreviewImage: React.FC<StorePreviewImageProps> = ({
  isActive,
  image,
}) => {
  const [onload, setOnload] = useState(false);
  return (
    <div
      className={clsx(
        'w-full aspect-[210/297] relative overflow-hidden rounded-lg cursor-pointer bg-slate-700',
        !onload && 'animate-pulse'
      )}
    >
      <img
        onLoad={() => setOnload(true)}
        src={image}
        alt="item-image"
        className={clsx(
          'w-full object-cover cursor-pointer',
          isActive && 'border-4 border-blue-500 border-solid'
        )}
      />
    </div>
  );
};

export default StorePreviewImage;
