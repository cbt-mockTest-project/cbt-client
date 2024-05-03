import { convertServerTimeToKST } from '@lib/utils/utils';
import { Tag } from 'antd';
import Image from 'next/image';
import React from 'react';
import { Item } from 'types';
import parse from 'html-react-parser';
import StoreContentThumbnail from './common/StoreContentThumbnail';
import Link from 'next/link';

interface StoreItemProps {
  item: Item;
}

const StoreItem: React.FC<StoreItemProps> = ({ item }) => {
  return (
    <Link href={`/store/${item.urlSlug}`}>
      <div className="h-48 border-b border-gray-200 border-solid last:border-b-0 cursor-pointer py-5 transition-colors duration-200 ease-in-out group">
        <div className="flex gap-4 min-w-[800px]">
          {item.thumbnail ? (
            <Image
              className="object-cover"
              src={item.thumbnail}
              width={105}
              height={150}
              alt="store-item-image"
            />
          ) : (
            <div className="w-[105px] h-[150px] bg-gray-200 overflow-hidden">
              <StoreContentThumbnail
                title={item.title}
                description={item.description}
                mode="view"
              />
            </div>
          )}
          <div className="w-[calc(100%-140px)]">
            <div className="text-lg font-bold break-all whitespace-nowrap overflow-hidden overflow-ellipsis w-full mb-4 group-hover:underline ">
              {item.title}
            </div>
            <div className="text-sm text-gray-700 line-clamp-3">
              {parse(item.description)}
            </div>
            <div className="mt-4 flex text-sm text-gray-500 items-center">
              <Tag>{item.price ? `${item.price}원` : '무료'}</Tag>
              {item.category && <Tag>{`암기장 공유`}</Tag>}
              <Tag>{convertServerTimeToKST(item.created_at, 'yy.MM.dd')}</Tag>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StoreItem;
