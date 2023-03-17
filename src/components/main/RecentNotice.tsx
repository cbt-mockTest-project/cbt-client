import { useLazyReadPosts } from '@lib/graphql/user/hook/usePost';
import palette from '@styles/palette';
import Link from 'next/link';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { PostCategory } from 'types';
import RecentNoticeSkeleton from './RecentNoticeSkeleton';

interface RecentNoticeProps {}

const RecentNotice: React.FC<RecentNoticeProps> = () => {
  const [readPosts, { data: recentNotices }] =
    useLazyReadPosts('cache-and-network');
  useEffect(() => {
    readPosts({
      variables: {
        input: { limit: 3, page: 1, category: PostCategory.Notice },
      },
    });
  }, []);
  if (!recentNotices) return <RecentNoticeSkeleton />;
  return (
    <RecentNoticeContainer>
      <h2 className="home-recent-notice-title">최근 공지사항</h2>
      <ul className="home-recent-notice-list-wrapper">
        {recentNotices?.readPosts.posts?.map((notice) => (
          <li key={notice.id} className="home-recent-notice-list-item">
            <Link href={`/post/${notice.id}`}>{notice.title}</Link>
          </li>
        ))}
      </ul>
    </RecentNoticeContainer>
  );
};

export default RecentNotice;

const RecentNoticeContainer = styled.div`
  width: max-content;
  min-width: 285px;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  font-size: 0.8rem;
  gap: 5px;
  max-height: 300px;
  overflow-y: scroll;
  margin: 20px auto 40px auto;
  border: 1px solid ${palette.gray_200};
  position: relative;
  .home-exam-link-title,
  .home-recent-notice-title {
    text-align: center;
    position: sticky;
    top: 0px;
    background-color: white;
    font-size: 0.9rem;
    padding: 10px 20px;
    box-shadow: rgb(0 0 0 / 10%) 0px 1px 5px 1px;
  }
  .home-exam-link-item,
  .home-recent-notice-list-item {
    list-style: none;
    text-align: center;
    a {
      padding: 10px 20px;
      display: block;
    }
    :hover {
      background-color: ${palette.gray_100};
    }
  }
`;
