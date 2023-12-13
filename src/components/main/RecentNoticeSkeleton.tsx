import SkeletonBox from '@components/common/skeleton/SkeletonBox';
import { useLazyReadPosts } from '@lib/graphql/hook/usePost';
import palette from '@styles/palette';
import Link from 'next/link';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { PostCategory } from 'types';

interface RecentNoticeSkeletonProps {}

const RecentNoticeSkeleton: React.FC<RecentNoticeSkeletonProps> = () => {
  return (
    <RecentNoticeSkeletonContainer>
      <h2 className="home-recent-notice-title">
        <SkeletonBox width="200px" height="25px" />
      </h2>
      <ul className="home-recent-notice-list-wrapper">
        {[1, 2, 3].map((el) => (
          <SkeletonBox
            key={el}
            width="200px"
            height="30px"
            className="home-recent-notice-list-item"
          />
        ))}
      </ul>
    </RecentNoticeSkeletonContainer>
  );
};

export default RecentNoticeSkeleton;

const RecentNoticeSkeletonContainer = styled.div`
  width: max-content;
  min-width: 285px;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 5px;
  margin: 20px auto 40px auto;
  border: 1px solid ${palette.gray_200};
  .home-recent-notice-title {
    text-align: center;
    position: sticky;
    top: 0px;
    background-color: white;
    font-size: 0.9rem;
    padding: 10px 20px;
    box-shadow: rgb(0 0 0 / 10%) 0px 1px 5px 1px;
  }
  .home-recent-notice-list-item {
    margin: 10px 20px;
  }
`;
