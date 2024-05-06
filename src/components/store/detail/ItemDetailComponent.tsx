import { convertServerTimeToKST } from '@lib/utils/utils';
import { useAppSelector } from '@modules/redux/store/configureStore';
import parse from 'html-react-parser';
import React from 'react';
import StoreGallery from '../common/StoreGallery';
import { Button, Card, Tooltip } from 'antd';
import {
  HeartFilled,
  QuestionCircleFilled,
  QuestionCircleOutlined,
} from '@ant-design/icons';

interface ItemDetailComponentProps {}

const ItemDetailComponent: React.FC<ItemDetailComponentProps> = () => {
  const item = useAppSelector((state) => state.storeItem.item);

  return (
    <div className="flex flex-col w-full h-full py-5 px-5">
      <div className="pb-4 border-b-2 border-gray-100 border-solid">
        <h1 className="text-2xl font-bold text-gray-800">{item.title}</h1>
        <div className="text-sm text-gray-500">
          {convertServerTimeToKST(item.created_at, 'yy.MM.dd')}
        </div>
        {/* <div className="mt-3">
          <div className="text-gray-800 font-bold">{item.user.nickname}</div>
        </div> */}
      </div>
      <div className="mt-5 flex flex-row gap-6 pb-5 sm:flex-col">
        <Card title="미리보기" className="w-3/5 sm:w-full">
          <StoreGallery
            images={item.file.previewImages.slice(
              0,
              item.file.previewImagesCount
            )}
          />
        </Card>
        <Card className="w-full" title={item.user.nickname}>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="text-gray-500">등록일 :</div>
              <div>{convertServerTimeToKST(item.created_at, 'yy.MM.dd')}</div>
            </div>

            <div className="flex gap-2">
              <div className="text-gray-500">이용자 수 :</div>
              <div>{`${100}명`}</div>
            </div>

            <div className="flex gap-2">
              <div className="text-gray-500">암기장 제공 :</div>
              <div className="flex gap-2">
                <span>{item.category.name}</span>
                <button>
                  <Tooltip title="상품 구매시 암기장 초대링크가 제공됩니다.">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="text-gray-500">자료 정보 :</div>
              <div>{`${item.file.page}페이지 / PDF`}</div>
            </div>
            <div className="flex gap-2">
              <div className="text-gray-500">가격 :</div>
              <div>{`${
                item.price ? item.price.toLocaleString() : '무료'
              }`}</div>
            </div>

            <Button type="primary" size="large">
              구매하기
            </Button>
            <Button
              size="large"
              icon={
                <div className="text-red-500">
                  <HeartFilled />
                </div>
              }
            >
              {'444'.toLocaleString()}
            </Button>
          </div>
        </Card>
      </div>
      <div className="mt-5">
        <div className="text-xl font-bold text-gray-800 p-4 bg-gray-100 border-l-4 border-blue-500 border-solid">
          자료 소개
        </div>
        <div className="mt-3 editor-style pl-4">{parse(item.description)}</div>
      </div>
      <div className="mt-5">
        <div className="text-xl font-bold text-gray-800 p-4 bg-gray-100 border-l-4 border-blue-500 border-solid">
          목차
        </div>
        <div className="mt-3 editor-style pl-4">{parse(item.contents)}</div>
      </div>
    </div>
  );
};

export default ItemDetailComponent;
