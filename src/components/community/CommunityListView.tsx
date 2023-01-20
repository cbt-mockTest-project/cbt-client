import React from 'react';
import styled from 'styled-components';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import palette from '@styles/palette';
import Link from 'next/link';
import { CommunityListProps } from './Community.interface';
import { responsive } from '@lib/utils/responsive';

const CommunityListView: React.FC<CommunityListProps> = (props) => {
  return (
    <Link href={`/post/${props.id}`}>
      <CommunityListBlock>
        <div className="community-board-list-left-contents">
          <div className="community-board-list-left-contents-top">
            {props.title}
          </div>
          <div className="community-board-list-left-contents-bottom">
            <div className="community-board-list-left-contents-bottom-category pc-only">
              {props.category} |
            </div>
            <div className="community-board-list-left-contents-bottom-uesrname">
              &nbsp;{props.userName}
            </div>
            <div className="community-board-list-leftt-contents-bottom-date mobile-only">
              {props.date}
            </div>
          </div>
        </div>
        <div className="community-board-list-right-contents">
          <div className="community-board-list-right-date pc-only">
            {props.date}
          </div>
          <div className="community-board-list-right-icon view">
            <VisibilityIcon />
            <span>{props.viewCount}</span>
          </div>
          <div className="community-board-list-right-icon heart">
            <FavoriteIcon />
            <span>{props.likeCount}</span>
          </div>
          <div className="community-board-list-right-icon comment">
            <CommentIcon />
            <span>{props.commentCount}</span>
          </div>
        </div>
      </CommunityListBlock>
    </Link>
  );
};

export default CommunityListView;
const CommunityListBlock = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 15px 5px;
  align-items: center;
  border-bottom: 1px solid ${palette.gray_100};
  cursor: pointer;
  .mobile-only {
    display: none;
  }
  :first-child {
    border-top: 1px solid ${palette.gray_300};
  }
  :last-child {
    border-bottom: 1px solid ${palette.gray_300};
  }
  :hover {
    background-color: ${palette.gray_50};
  }
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
  .community-board-list-left-contents-top {
    font-size: 0.9rem;
  }
  .community-board-list-left-contents-bottom-uesrname {
    color: ${palette.gray_700};
  }
  .community-board-list-left-contents-bottom-category {
    color: ${palette.antd_blue_01};
  }
  .community-board-list-left-contents-bottom {
    font-size: 0.7rem;
  }
  .community-board-list-right-contents {
    display: flex;
    gap: 15px;
    font-size: 0.75rem;
    color: ${palette.gray_500};
  }
  .community-board-list-right-icon {
    display: flex;
    align-items: center;
    gap: 5px;
    svg {
      font-size: 0.8rem;
    }
  }
  @media (max-width: ${responsive.medium}) {
    .mobile-only {
      display: block;
    }
    .pc-only {
      display: none;
    }
    .community-board-list-leftt-contents-bottom-date {
      color: ${palette.gray_500};
      margin-left: 5px;
    }
  }
`;
