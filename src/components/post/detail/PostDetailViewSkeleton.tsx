import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';
import SkeletonBox from '@components/common/skeleton/SkeletonBox';

const PostDetailViewSkeleton: React.FC = () => {
  return (
    <PostDetailViewSkeletonBlock>
      <div className="post-detail-wrapper">
        <section className="post-detail-top-section">
          <div className="post-detail-top-section-title-and-button-wrapper">
            <SkeletonBox className="post-detail-top-title" height="28px" />
          </div>
          <div className="post-detail-top-profile-wrapper">
            <div className="post-detail-top-profile">
              <SkeletonBox height="23px" width="150px" />
            </div>
          </div>
        </section>
        <section className="post-detail-center-section">
          <div className="post-detail-center-section-contents-wrapper">
            <SkeletonBox height="23px" />
            <SkeletonBox height="23px" width="90%" />
            <SkeletonBox height="23px" width="80%" />
            <SkeletonBox height="23px" width="70%" />
            <SkeletonBox height="23px" width="60%" />
            <SkeletonBox height="23px" width="50%" />
          </div>
        </section>
      </div>
    </PostDetailViewSkeletonBlock>
  );
};

export default PostDetailViewSkeleton;
const PostDetailViewSkeletonBlock = styled.div`
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-bottom: 50px;
  .post-detail-top-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 15px 20px 15px;
    border-bottom: 1px solid ${palette.gray_200};
  }
  .post-detail-wrapper {
    margin-top: 30px;
    border: 1px solid ${palette.gray_200};
    padding: 20px 10px;
  }

  .post-detail-top-title {
    font-size: 1.1rem;
    font-weight: bold;
  }
  .post-detail-top-profile-wrapper {
    display: flex;
    gap: 10px;
  }
  .post-detail-top-profile {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
  }

  .post-detail-center-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .post-detail-center-section-contents-wrapper {
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .post-detail-bottom-section-comments-submit-button {
    margin-left: auto;
  }
  .post-detail-comment-list {
    + li {
      margin-top: 20px;
    }
  }

  .post-detail-top-section-title-and-button-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: ${responsive.medium}) {
    padding: 20px;
  }
`;
