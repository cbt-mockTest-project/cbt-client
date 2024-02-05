import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import CategoryFolderListItem from '@components/moduStorage/CategoryFolderListItem';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Empty } from 'antd';
import Link from 'next/link';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MockExamCategory } from 'types';
import HomeCategorySearchModal from './HomeCategorySearchModal';
import { useRouter } from 'next/router';

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
  .home-folder-list-empty {
    margin: 15px 8px;
    height: 81px;
  }
  a.home-folder-title {
    &:hover {
      text-decoration: underline;
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
  link?: string;
  trigger?: string;
  unikeyKey: string;
  handleToggleBookmark?: (categoryId: number) => Promise<void>;
  headerButton?: React.ReactNode;
  emptyDescription?: string;
}

const HomeFolderList: React.FC<HomeFolderListProps> = ({
  categories,
  title,
  subTitle,
  link,
  trigger,
  unikeyKey,
  headerButton,
  emptyDescription = '아직 암기장이 없습니다.',
}) => {
  const router = useRouter();
  const isCategorySearchModalOpen = useMemo(
    () => router.query.tab === 'user-storage',
    [router.query.tab]
  );
  const handleMoreViewTrigger = (trigger: string) => {
    if (trigger === 'user-storage') {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, tab: 'user-storage' },
      });
    }
  };

  return (
    <HomeFolderListBlock>
      {link ? (
        <Link className="home-folder-title" href={link}>
          <span>{title}</span>
          <span>
            <RightOutlined />
          </span>
        </Link>
      ) : trigger ? (
        <button
          className="home-folder-title"
          onClick={() => handleMoreViewTrigger(trigger)}
        >
          <span>{title}</span>
          <span>
            <RightOutlined />
          </span>
        </button>
      ) : (
        <div className="home-folder-title">
          <span>{title}</span>
          {headerButton}
        </div>
      )}
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
          {categories?.map((category) => (
            <SwiperSlide
              key={category.id}
              className="home-folder-list-swiper-slide"
            >
              <CategoryFolderListItem
                className="home-folder-item"
                category={category}
              />
            </SwiperSlide>
          ))}
          {!categories &&
            [1, 2, 3, 4, 5].map((i) => (
              <SwiperSlide key={i} className="home-folder-list-swiper-slide">
                <CategoryFolderListItem isLoading />
              </SwiperSlide>
            ))}
          {categories && categories.length === 0 && (
            <Empty
              className="home-folder-list-empty"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={emptyDescription}
            />
          )}
        </ul>
      </Swiper>
      {categories && categories.length > 5 && (
        <>
          <button className={`home-folder-list-prev-button ${unikeyKey}`}>
            <LeftOutlined />
          </button>
          <button className={`home-folder-list-next-button ${unikeyKey}`}>
            <RightOutlined />
          </button>
        </>
      )}
      {isCategorySearchModalOpen && (
        <HomeCategorySearchModal
          open={isCategorySearchModalOpen}
          onCancel={() => router.back()}
        />
      )}
    </HomeFolderListBlock>
  );
};

export default HomeFolderList;
