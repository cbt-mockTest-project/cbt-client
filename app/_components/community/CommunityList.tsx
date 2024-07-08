import React, { useEffect } from 'react';
import styled from 'styled-components';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import palette from '../../_styles/palette';
import Link from 'next/link';
import { responsive } from '../../_lib/utils/responsive';
import { PostCategory } from '../../types';
import { useRouter } from 'next/router';
import { useMeQuery } from '../../_lib/graphql/hook/useUser';
import { secretBoards } from '../../_lib/constants';

export interface CommunityListProps {
  title: string;
  category: string;
  userName: string;
  userId: number;
  date: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  id: number;
  priority: number;
}

const CommunityList: React.FC<CommunityListProps> = ({
  title,
  category,
  userName,
  userId,
  date,
  viewCount,
  likeCount,
  commentCount,
  id,
  priority,
}) => {
  const router = useRouter();

  const { data: meQuery } = useMeQuery();
  const isSecret = secretBoards.includes(router.query.c as PostCategory);
  const allowView =
    meQuery?.me.user?.id === userId || meQuery?.me.user?.role === 'ADMIN';
  const secretTitle = '비밀글입니다.';
  const onSecretPostRoute = () => {
    if (!allowView) {
      alert('작성자만 볼 수 있습니다.');
      return;
    }
    router.push(`/post/${id}`);
  };
  const CommunityListComponent = () => (
    <CommunityListBlock isNotice={!!priority}>
      <div className="community-board-list-left-contents">
        <div className="community-board-list-left-contents-top">
          {isSecret ? secretTitle : title}
        </div>
        <div className="community-board-list-left-contents-bottom">
          <div className="community-board-list-left-contents-bottom-category pc-only">
            {category} |
          </div>
          <div className="community-board-list-left-contents-bottom-uesrname">
            &nbsp;{userName}
          </div>
          <div className="community-board-list-leftt-contents-bottom-date mobile-only">
            {date}
          </div>
        </div>
      </div>
      <div className="community-board-list-right-contents">
        <div className="community-board-list-right-date pc-only">{date}</div>
        <div className="community-board-list-right-icon view">
          <VisibilityIcon />
          <span>{viewCount}</span>
        </div>
        <div className="community-board-list-right-icon heart">
          <FavoriteIcon />
          <span>{likeCount}</span>
        </div>
        <div className="community-board-list-right-icon comment">
          <CommentIcon />
          <span>{commentCount}</span>
        </div>
      </div>
    </CommunityListBlock>
  );
  return (
    <>
      {isSecret ? (
        <button onClick={onSecretPostRoute} style={{ width: '100%' }}>
          <CommunityListComponent />
        </button>
      ) : (
        <Link href={`/post/${id}`}>
          <CommunityListComponent />
        </Link>
      )}
    </>
  );
};

interface CommunityListBlockProps {
  isNotice: boolean;
}

export default CommunityList;
const CommunityListBlock = styled.li<CommunityListBlockProps>`
  display: flex;
  justify-content: space-between;
  padding: 15px 5px;
  align-items: center;
  border-bottom: 1px solid ${palette.gray_100};
  cursor: pointer;

  .mobile-only {
    display: none;
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
    ${(props) =>
      props.isNotice &&
      `
      color: ${palette.antd_blue_01};
    `}
  }
  .community-board-list-left-contents-bottom-uesrname {
    color: ${({ theme }) => theme.color('colorTextTertiary')};
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
