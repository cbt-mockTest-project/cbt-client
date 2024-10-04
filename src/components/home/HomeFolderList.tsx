import { LeftOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons';
import CategoryFolderListItem from '@components/common/category/CategoryFolderListItem';
import { responsive } from '@lib/utils/responsive';
import { Button, Empty, Skeleton } from 'antd';
import Link from 'next/link';
import React, { useDeferredValue, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MockExamCategory } from 'types';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';

const HomeFolderListBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  justify-content: flex-end;
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
    color: ${({ theme }) => theme.color('colorTextSecondary')};
  }
  .home-folder-list-prev-button,
  .home-folder-list-next-button {
    width: 40px;
    height: 40px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 40px;
    z-index: 10;
    svg {
      font-size: 20px;
    }
  }
  .home-folder-list-prev-button {
    left: -25px;
  }
  .home-folder-list-next-button {
    right: -25px;
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
  .home-folder-list {
    display: flex;
    overflow-x: scroll;
    opacity: 0.99;
    transform: translate3d(0, 0, 0);
    will-change: scroll-position;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    > div {
      &:not(:first-child) {
        margin-left: 10px;
      }
    }
    ::-webkit-scrollbar {
      display: none;
    }
    .home-folder-item {
      width: 220px;
      flex-shrink: 0;
      display: inline-block;
    }
  }

  @media (max-width: ${responsive.lsmall}) {
    .home-folder-list-prev-button,
    .home-folder-list-next-button {
      display: none;
    }
  }
`;

export interface HomeFolderListProps {
  title: string;
  subTitle: string;
  link?: string;
  trigger?: string;
  unikeyKey: string;
  headerButton?: React.ReactNode;
  emptyDescription?: string;
  categories: MockExamCategory[] | null;
}

const HomeFolderList: React.FC<HomeFolderListProps> = ({
  title,
  subTitle,
  link,
  trigger,
  unikeyKey,
  headerButton,
  emptyDescription = '아직 암기장이 없습니다.',
  categories,
}) => {
  const isLoading = !categories;
  const folderListRef = useRef<HTMLUListElement | null>(null);
  const [listScrollLeft, setListScrollLeft] = useState(0);
  const deferredListScrollLeft = useDeferredValue(listScrollLeft);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const handleMoreViewTrigger = (trigger: string) => {
    if (trigger === 'user-storage') {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, tab: 'user-storage' },
      });
    }
  };

  const handleListScroll = (direction: 'prev' | 'next') => {
    if (folderListRef.current) {
      const scrollLeft = folderListRef.current.scrollLeft;
      const newScrollLeft =
        direction === 'prev' ? scrollLeft - 500 : scrollLeft + 500;
      folderListRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (!folderListRef.current) return;
    const list = folderListRef.current;
    const handleScroll = () => {
      setListScrollLeft(list.scrollLeft);
    };
    list.addEventListener('scroll', handleScroll);
    return () => {
      list.removeEventListener('scroll', handleScroll);
    };
  }, [folderListRef]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <HomeFolderListBlock>
      {link ? (
        <Link className="home-folder-title" href={link} prefetch={false}>
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
            <SearchOutlined />
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

      {isLoading ? (
        <div className="home-folder-list">
          <Skeleton active paragraph={{ rows: 4 }} />
        </div>
      ) : (
        <ul
          className="home-folder-list"
          ref={folderListRef}
          key={isMobile ? String(isMounted) : 'exam-list'}
        >
          {categories &&
            categories?.length > 0 &&
            categories.map((category, index) => (
              <div className="flex items-center" key={index}>
                <CategoryFolderListItem
                  className="home-folder-item"
                  category={category}
                />
              </div>
            ))}
          {categories && categories.length === 0 && (
            <Empty
              className="home-folder-list-empty"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={emptyDescription}
            />
          )}
        </ul>
      )}
      {categories && categories.length > 4 && (
        <>
          <Button
            onClick={() => handleListScroll('prev')}
            disabled={deferredListScrollLeft === 0}
            shape="circle"
            className={`home-folder-list-prev-button ${unikeyKey} `}
          >
            <LeftOutlined />
          </Button>

          <Button
            disabled={
              deferredListScrollLeft + folderListRef.current?.clientWidth >=
              folderListRef.current?.scrollWidth
            }
            onClick={() => handleListScroll('next')}
            shape="circle"
            className={`home-folder-list-next-button ${unikeyKey}`}
          >
            <RightOutlined />
          </Button>
        </>
      )}
    </HomeFolderListBlock>
  );
};

export default HomeFolderList;
