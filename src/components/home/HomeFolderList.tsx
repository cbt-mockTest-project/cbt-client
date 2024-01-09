import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import CategoryFolderListItem from '@components/moduStorage/CategoryFolderListItem';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Empty } from 'antd';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MockExamCategory } from 'types';

const HomeFolderListBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  .home-folder-list-swiper {
    width: 100%;
    margin-top: 15px;
  }
  .home-folder-title {
    font-size: 16px;
    font-weight: 700;
    display: flex;
    gap: 10px;
  }
  .home-folder-sub-title {
    font-size: 12px;
    color: ${palette.colorSubText};
  }
  .home-folder-list-prev-button,
  .home-folder-list-next-button {
    width: 40px;
    height: 40px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 50%;
    border: 1px solid ${palette.gray_300};
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 25px;
    background-color: white;
    z-index: 10;
    svg {
      font-size: 20px;
    }
  }
  .home-folder-list-prev-button {
    left: -20px;
  }
  .home-folder-list-next-button {
    right: -20px;
  }
  .home-folder-item {
    .category-user-name {
      max-width: 100px !important;
    }
  }
  @media (max-width: ${responsive.lsmall}) {
    .home-folder-list-swiper-slide {
      width: 200px;
    }
    .home-folder-list-prev-button,
    .home-folder-list-next-button {
      display: none;
    }
  }
`;

interface HomeFolderListProps {
  title: string;
  subTitle: string;
  categories: MockExamCategory[];
  link: string;
  unikeyKey: string;
}

const HomeFolderList: React.FC<HomeFolderListProps> = ({
  categories,
  title,
  subTitle,
  link,
  unikeyKey,
}) => {
  return (
    <HomeFolderListBlock>
      <Link className="home-folder-title" href={link}>
        <span>{title}</span>
        <span>
          <RightOutlined />
        </span>
      </Link>
      <div className="home-folder-sub-title">
        <span>{subTitle}</span>
      </div>
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        breakpoints={{
          0: {
            slidesPerView: 'auto',
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        className="home-folder-list-swiper"
        navigation={{
          prevEl: `.home-folder-list-prev-button.${unikeyKey}`,
          nextEl: `.home-folder-list-next-button.${unikeyKey}`,
        }}
        modules={[Navigation]}
      >
        <ul className="home-folder">
          {categories.map((category) => (
            <SwiperSlide
              key={category.id}
              className="home-folder-list-swiper-slide"
            >
              <CategoryFolderListItem
                className="home-folder-item"
                category={category}
                hasTag={false}
              />
            </SwiperSlide>
          ))}
          {categories.length === 0 && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="아직 폴더가 없습니다."
            />
          )}
        </ul>
      </Swiper>
      {categories.length > 5 && (
        <>
          <button className={`home-folder-list-prev-button ${unikeyKey}`}>
            <LeftOutlined />
          </button>
          <button className={`home-folder-list-next-button ${unikeyKey}`}>
            <RightOutlined />
          </button>
        </>
      )}
    </HomeFolderListBlock>
  );
};

export default HomeFolderList;
