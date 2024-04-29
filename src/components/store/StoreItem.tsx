import { faker } from '@faker-js/faker/locale/af_ZA';
import { Card, Divider, Tag } from 'antd';
import Image from 'next/image';
import React from 'react';

interface StoreItemProps {}

const StoreItem: React.FC<StoreItemProps> = () => {
  return (
    <div className="h-48 border-b border-gray-200 border-solid last:border-b-0">
      <div className="flex gap-4 min-w-[800px]">
        <Image
          className="object-cover"
          src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT}/banner/ad-banner-pc01.png`}
          width={105}
          height={150}
          alt="store-item-image"
        />
        <div className="w-[calc(100%-140px)]">
          <div className="text-lg font-bold break-all whitespace-nowrap overflow-hidden overflow-ellipsis w-full  mb-4">
            {
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea velit officiis dolorem magni ratione sed impedit laboriosam iure non sint, minus repellendus accusantium obcaecati nobis sapiente soluta dicta corporis ipsam.'
            }
          </div>
          <div className="text-sm text-gray-700 line-clamp-3">
            {'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea velit officiis dolorem magni ratione sed impedit laboriosam iure non sint, minus repellendus accusantium obcaecati nobis sapiente soluta dicta corporis ipsam.'.repeat(
              10
            )}
          </div>
          <div className="mt-4 flex text-sm text-gray-500 items-center">
            <Tag>{`${38}페이지`}</Tag>
            <Tag>{`${10000}원`}</Tag>
            <Tag>{`암기장 공유`}</Tag>
            <Tag>{`22.05.13`}</Tag>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreItem;
