import React from 'react';
import styled from 'styled-components';
import { skeletonStyle } from '@styles/utils';

const CommunityListViewSkeleton: React.FC = () => {
  return (
    <CommunityListBlock>
      <div className="community-board-list-left-contents">
        <div className="community-board-list-left-contents-top" />
        <div className="community-board-list-left-contents-bottom">
          <div className="community-board-list-left-contents-bottom-uesrname" />
        </div>
      </div>
      <div className="community-board-list-right-contents" />
    </CommunityListBlock>
  );
};

export default CommunityListViewSkeleton;
const CommunityListBlock = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 15px 5px;
  align-items: center;

  .community-board-list-wrapper {
    display: flex;
    flex-direction: column;
  }

  .community-board-list-left-contents {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .community-board-list-left-contents-bottom {
    display: flex;
  }
  .community-board-list-left-contents-top,
  .community-board-list-left-contents-bottom-uesrname,
  .community-board-list-right-contents {
    ${skeletonStyle}
  }
  .community-board-list-left-contents-top {
    max-width: 500px;
    width: 50vw;
    height: 23px;
  }
  .community-board-list-left-contents-bottom-uesrname {
    width: 150px;
    height: 18px;
  }
  .community-board-list-right-contents {
    width: 130px;
    height: 18px;
  }
`;
