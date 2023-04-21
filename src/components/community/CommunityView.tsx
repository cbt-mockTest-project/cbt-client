import React from 'react';
import styled from 'styled-components';
import palette from '@styles/palette';
import { Button } from 'antd';
import CommunityListView from './CommunityListView';
import { categorys } from './Community.constants';
import Link from 'next/link';
import { responsive } from '@lib/utils/responsive';
import { CommunityViewProps } from './Community.interface';
import { format, parseISO } from 'date-fns';
import CommunityPagination from './CommunityPagination';
import CommunityViewSkeleton from './CommunityViewSkeleton';
import { useRouter } from 'next/router';

const CommunityView: React.FC<CommunityViewProps> = (props) => {
  const router = useRouter();
  const posts = props.postsQuery?.readPosts.posts;

  return (
    <CommunityViewBlock>
      <section className="community-header">
        <b className="community-header-title">커뮤니티</b>
        {props.meQuery?.me.ok ? (
          <Link href={`/post/write?c=${router.query.c}`} className="ml-auto">
            <Button className="community-header-write-button">글쓰기</Button>
          </Link>
        ) : (
          <Button
            onClick={props.openLoginModal}
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
                  props.checkCategoryMatching(category.query.c) && 'active'
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
              <CommunityListView
                key={post.id}
                id={post.id}
                category={'자유게시판'}
                commentCount={post.commentsCount}
                date={format(parseISO(post.created_at), 'yy.MM.dd HH:mm')}
                likeCount={post.likesCount}
                title={post.title}
                priority={post.priority}
                userName={post.user.nickname}
                viewCount={post.view}
              />
            ))
          ) : (
            <CommunityViewSkeleton type="list" />
          )}
        </ul>
      </section>
      {props.postsQuery && (
        <CommunityPagination total={props.postsQuery.readPosts.count} />
      )}
    </CommunityViewBlock>
  );
};

export default CommunityView;
const CommunityViewBlock = styled.div`
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
