import React from 'react';
import styled from 'styled-components';
import { responsive } from '@lib/utils/responsive';
import CommunityListViewSkeleton from './CommunityListViewSkeleton';
import SkeletonBox from '@components/common/skeleton/SkeletonBox';

interface CommunityViewSkeletonProps {
  type?: 'list' | 'view';
}

const CommunityViewSkeleton: React.FC<CommunityViewSkeletonProps> = ({
  type = 'view',
}) => {
  return (
    <CommunityViewSkeletonBlock>
      {type === 'view' && (
        <>
          <section className="community-header">
            <SkeletonBox
              className="community-header-title"
              height="30px"
              width="100px"
            />
            <SkeletonBox
              className="community-header-write-button"
              height="30px"
              width="100px"
            />
          </section>
          <section className="community-category">
            <SkeletonBox
              className="community-category-title"
              height="24px"
              width="100px"
            />
            <div className="community-category-card-wrapper">
              <SkeletonBox className="community-category-card" height="41px" />
            </div>
          </section>
        </>
      )}
      <section className="community-board">
        {type === 'view' && (
          <SkeletonBox className="community-board-title" height="32px" />
        )}
        <ul className="community-board-list-wrapper">
          {[1, 2, 3].map((el, index) => (
            <CommunityListViewSkeleton key={index} />
          ))}
        </ul>
      </section>
    </CommunityViewSkeletonBlock>
  );
};

export default CommunityViewSkeleton;
const CommunityViewSkeletonBlock = styled.div`
  width: 100%;
  max-width: 800px;
  min-height: calc(100vh- 105px);
  margin-left: auto;
  margin-bottom: 50px;
  .community-header {
    display: flex;
    align-items: center;
    padding-bottom: 15px;
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
  }
  .community-category-card {
    font-size: 0.8rem;
    padding: 10px 10px;
    border-radius: 5px;
    width: 150px;
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
    width: 100px;
  }
  @media (max-width: ${responsive.medium}) {
    padding: 20px;
  }
`;
