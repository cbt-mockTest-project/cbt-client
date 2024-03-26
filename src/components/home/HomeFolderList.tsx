import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import CategoryFolderListItem from '@components/moduStorage/CategoryFolderListItem';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Button, Empty } from 'antd';
import Link from 'next/link';
import React, {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
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
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 35px;
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
    gap: 10px;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
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
  categories: MockExamCategory[];
  link?: string;
  trigger?: string;
  unikeyKey: string;
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
  const folderListRef = useRef<HTMLUListElement | null>(null);
  const [listScrollLeft, setListScrollLeft] = useState(0);
  const deferredListScrollLeft = useDeferredValue(listScrollLeft);
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

      <ul className="home-folder-list" ref={folderListRef}>
        {categories?.map((category) => (
          <CategoryFolderListItem
            key={category.id}
            className="home-folder-item"
            category={category}
          />
        ))}
        {!categories &&
          [1, 2, 3, 4, 5].map((i) => (
            <CategoryFolderListItem
              className="home-folder-item"
              key={i}
              isLoading
            />
          ))}
        {categories && categories.length === 0 && (
          <Empty
            className="home-folder-list-empty"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={emptyDescription}
          />
        )}
      </ul>
      {categories && categories.length > 5 && (
        <>
          {deferredListScrollLeft ? (
            <Button
              onClick={() => handleListScroll('prev')}
              shape="circle"
              className={`home-folder-list-prev-button ${unikeyKey}`}
            >
              <LeftOutlined />
            </Button>
          ) : null}
          {deferredListScrollLeft + folderListRef.current?.clientWidth <
          folderListRef.current?.scrollWidth ? (
            <Button
              onClick={() => handleListScroll('next')}
              shape="circle"
              className={`home-folder-list-next-button ${unikeyKey}`}
            >
              <RightOutlined />
            </Button>
          ) : null}
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
