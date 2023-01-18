import React from 'react';
import styled from 'styled-components';
import palette from '@styles/palette';
import { Button } from 'antd';
import CommunityListView from './CommunityListView';
import { categorys, mockPosts } from './Community.constants';
import Link from 'next/link';
import { responsive } from '@lib/utils/responsive';
import { CommunityViewProps } from './Community.interface';
import { addHours, format, parseISO } from 'date-fns';

const CommunityView: React.FC<CommunityViewProps> = (props) => {
  return (
    <CommunityViewBlock>
      <section className="community-header">
        <b className="community-header-title">커뮤니티</b>
        <Button className="community-header-write-button">글쓰기</Button>
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
          {props.postsQuery?.readPosts.posts?.map((post) => (
            <CommunityListView
              key={post.id}
              id={post.id}
              category={'자유게시판'}
              commentCount={post.commentsCount}
              date={format(
                addHours(parseISO(post.created_at), 9),
                'yyyy-MM-dd hh:mm a'
              )}
              likeCount={post.likesCount}
              title={post.title}
              userName={post.user.nickname}
              viewCount={post.view}
            />
          ))}
        </ul>
      </section>
    </CommunityViewBlock>
  );
};

export default CommunityView;
const CommunityViewBlock = styled.div`
  width: 100%;
  max-width: 800px;
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
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .community-category-card-wrapper {
    display: flex;
    flex-wrap: wrap;
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
  }
  @media (max-width: ${responsive.medium}) {
    padding: 20px;
  }
`;