import { loginModal } from '@lib/constants';
import { coreActions } from '@modules/redux/slices/core';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import CommunityList from './CommunityList';
import CommunityListSkeleton from './CommunityListSkeleton';
import CommunityPagination from './CommunityPagination';
import palette from '@styles/palette';
import { responsive } from '@lib/utils/responsive';
import { POST_CATEGORY_MAP, postCategories } from './Community.constants';
import SearchInput from '@components/common/input/SearchInput';
import { convertServerTimeToKST } from '@lib/utils/utils';
import useCommunityList from './hooks/useCommunityList';

interface CommunityComponentProps {}

const CommunityComponent: React.FC<CommunityComponentProps> = () => {
  const {
    isLogged,
    allowWriteAdminOnlyCategory,
    posts,
    search,
    setSearch,
    postCount,
  } = useCommunityList();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const openLoginModal = () => dispatch(coreActions.openModal(loginModal));
  const checkCategoryMatching = (query: string) => query === router.query.c;

  return (
    <CommunityComponentBlock>
      <section className="community-header">
        <b className="community-header-title">게시판</b>
        {allowWriteAdminOnlyCategory &&
          (isLogged ? (
            <Link href={`/post/write?c=${router.query.c}`} className="ml-auto">
              <Button className="community-header-write-button">글쓰기</Button>
            </Link>
          ) : (
            <Button
              onClick={openLoginModal}
              className="community-header-write-button"
            >
              글쓰기
            </Button>
          ))}
      </section>
      <section className="community-category">
        <b className="community-category-title">카테고리</b>
        <div className="community-category-card-wrapper">
          {postCategories.map((category) => (
            <Link
              key={category.label}
              href={{ pathname: category.path, query: category.query }}
            >
              <div
                className={`community-category-card ${
                  checkCategoryMatching(category.query.c) ? 'active' : ''
                }`}
              >
                {category.label}
              </div>
            </Link>
          ))}
        </div>
      </section>
      <SearchInput
        className="community-search-input"
        placeholder="게시글 제목을 검색해 보세요."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onSearch={() => {
          router.push({
            pathname: '/community',
            query: { c: router.query.c, s: search },
          });
        }}
      />
      <section className="community-board">
        <ul className="community-board-list-wrapper">
          {posts ? (
            posts.map((post) => (
              <CommunityList
                key={post.id}
                id={post.id}
                category={POST_CATEGORY_MAP[post.category]}
                commentCount={post.commentsCount}
                date={convertServerTimeToKST(post.created_at, 'yy.MM.dd HH:mm')}
                likeCount={post.likesCount}
                title={post.title}
                priority={post.priority}
                userName={post.user.nickname}
                userId={post.user.id}
                viewCount={post.view}
              />
            ))
          ) : (
            <ul className="community-board-list-wrapper">
              {[1, 2, 3].map((el, index) => (
                <CommunityListSkeleton key={index} />
              ))}
            </ul>
          )}
        </ul>
      </section>
      {postCount && <CommunityPagination total={postCount} />}
    </CommunityComponentBlock>
  );
};

export default CommunityComponent;

const CommunityComponentBlock = styled.div`
  width: 100%;
  max-width: 800px;
  min-height: calc(100vh- 105px);
  margin-left: auto;
  margin-bottom: 50px;
  .community-header {
    display: flex;
    align-items: center;
    padding-bottom: 15px;
    border-bottom: 1px solid ${palette.gray_400};
  }
  .community-header-title {
    font-size: 1.2rem;
  }
  .community-header-write-button {
    margin-left: auto;
  }
  .community-category {
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .community-category-card-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    a {
      height: 41px;
    }
  }
  .community-category-card {
    font-size: 0.8rem;
    padding: 10px 10px;

    border: 1px solid ${palette.gray_200};
    border-radius: 5px;
    width: max-content;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease-in;
    :hover {
      border-color: ${palette.antd_blue_01};
      color: ${palette.antd_blue_01};
    }
  }
  .community-category-card.active {
    border-color: ${palette.antd_blue_01};
    color: ${palette.antd_blue_01};
  }
  .community-board {
    display: flex;
    flex-direction: column;
  }
  .community-board-title,
  .community-category-title {
    font-size: 0.95rem;
  }
  .community-board-title {
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 1px solid ${palette.gray_400};
  }
  @media (max-width: ${responsive.medium}) {
    padding: 20px;
  }
`;
