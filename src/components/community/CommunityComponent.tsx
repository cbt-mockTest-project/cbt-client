import { loginModal } from '@lib/constants';
import { useLazyReadPosts } from '@lib/graphql/user/hook/usePost';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { coreActions } from '@modules/redux/slices/core';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { PostCategory } from 'types';
import CommunityList from './CommunityList';
import { format, parseISO } from 'date-fns';
import CommunityListSkeleton from './CommunityListSkeleton';
import CommunityPagination from './CommunityPagination';
import palette from '@styles/palette';
import { responsive } from '@lib/utils/responsive';
import { POST_CATEGORY_MAP } from './Community.constants';

export const categorys = [
  {
    label: '건의하기',
    path: '/community',
    query: { c: PostCategory.Suggenstion },
  },
  { label: '공지사항', path: '/community', query: { c: PostCategory.Notice } },
  // { label: '자유게시판', path: '/community', query: { c: PostCategory.Free } },
  // { label: '시험후기', path: '/community', query: { c: PostCategory.Review } },
  // {
  //   label: '기출복원',
  //   path: '/community',
  //   query: { c: PostCategory.Recovery },
  // },
];

interface CommunityComponentProps {}

const CommunityComponent: React.FC<CommunityComponentProps> = () => {
  const router = useRouter();
  const { data: meQuery } = useMeQuery();
  const dispatch = useAppDispatch();
  const openLoginModal = () => dispatch(coreActions.openModal(loginModal));
  const [readPosts, { data: postsQuery, loading: readPostsLoading }] =
    useLazyReadPosts('network-only');
  useEffect(() => {
    if (router.query.c) {
      readPosts({
        variables: {
          input: {
            limit: 8,
            page: Number(router.query.p) || 1,
            category: router.query.c as PostCategory,
          },
        },
      });
    }
  }, [router.query.c, router.query.p]);
  const checkCategoryMatching = (query: string) => query === router.query.c;
  const posts = postsQuery?.readPosts.posts;
  return (
    <CommunityComponentBlock>
      <section className="community-header">
        <b className="community-header-title">게시판</b>
        {meQuery?.me.ok ? (
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
        )}
      </section>
      <section className="community-category">
        <b className="community-category-title">카테고리</b>
        <div className="community-category-card-wrapper">
          {categorys.map((category) => (
            <Link
              key={category.label}
              href={{ pathname: category.path, query: category.query }}
            >
              <span
                className={`community-category-card ${
                  checkCategoryMatching(category.query.c) && 'active'
                }`}
              >
                {category.label}
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="community-board">
        <b className="community-board-title">전체 글</b>
        <ul className="community-board-list-wrapper">
          {posts ? (
            posts.map((post) => (
              <CommunityList
                key={post.id}
                id={post.id}
                category={POST_CATEGORY_MAP[post.category]}
                commentCount={post.commentsCount}
                date={format(parseISO(post.created_at), 'yy.MM.dd HH:mm')}
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
      {postsQuery && <CommunityPagination total={postsQuery.readPosts.count} />}
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
    border-bottom: 1px solid ${palette.gray_300};
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
  }
  .community-category-card {
    font-size: 0.8rem;
    padding: 10px 10px;
    border: 1px solid ${palette.gray_200};
    border-radius: 5px;
    width: 150px;
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
    border-bottom: 1px solid ${palette.gray_300};
  }
  @media (max-width: ${responsive.medium}) {
    padding: 20px;
  }
`;
