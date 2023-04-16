import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Mode';
import ArrowUpIcon from '@mui/icons-material/KeyboardControlKey';
import BasicBox from '../../box/BasicBox';
import TextArea from 'antd/lib/input/TextArea';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Button } from 'antd';
import { CommentCardProps } from './CommentCard.interface';
import { responsive } from '@lib/utils/responsive';
import { UserRole } from 'types';

const CommentCardView: React.FC<CommentCardProps> = (props) => {
  return (
    <CommentCardContainer
      className={props.className || 'comment-card-container'}
    >
      <div className="comment-card-left-section">
        <div className="comment-card-top-section">
          {props.option.role === UserRole.Admin && (
            <div className="comment-card-owner-icon">
              <WorkspacePremiumIcon />
            </div>
          )}
          <div className="comment-card-user-name">{props.option.nickname}</div>
          <div className="comment-card-time pc-only">{props.option.time}</div>
          {props.meQuery?.me.user?.id === props.option.userId && (
            <>
              <button onClick={props.toggleEdit}>
                <EditIcon />
              </button>
              <button onClick={props.requestDelete}>
                <DeleteIcon />
              </button>
            </>
          )}
        </div>

        {props.editState && (
          <>
            <TextArea
              autoSize={{ minRows: 2, maxRows: 10 }}
              className="comment-card-edit-section"
              value={props.content}
              onChange={props.onChangeContent}
            />
            <Button
              className="comment-card-edit-button"
              type="primary"
              loading={props.editLoading}
              onClick={props.requestEdit}
            >
              댓글수정
            </Button>
          </>
        )}
        {!props.editState && (
          <pre className="comment-card-content-section">
            {props.option.content}
          </pre>
        )}
        <div className="comment-card-time mobile-only">{props.option.time}</div>
      </div>
      <div className="comment-card-right-section">
        <button disabled={props.likeLoading} onClick={props.requestLike}>
          <BasicBox
            className={`comment-card-like-box ${
              props.option.likeState && 'active'
            }`}
          >
            <ArrowUpIcon />
            <span className="comment-card-like-count">
              {props.option.likesCount}
            </span>
          </BasicBox>
        </button>
      </div>
    </CommentCardContainer>
  );
};

export default CommentCardView;

const CommentCardContainer = styled.div`
  display: flex;
  border-radius: 5px;
  background-color: white;
  padding: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  .mobile-only {
    display: none;
  }
  .comment-card-top-section {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    word-break: break-all;
    .comment-card-time {
      font-size: 0.8rem;
      font-weight: bold;
      color: ${palette.gray_700};
      margin: 0 10px;
    }
    button {
      + button {
        margin-left: 5px;
      }
    }
    svg {
      transition: color 0.2s ease-in;
      cursor: pointer;
      font-size: 0.8rem;
      :hover {
        color: ${palette.antd_blue_01};
      }
    }
  }
  .comment-card-content-section {
    white-space: pre-wrap;
    word-break: break-all;
    margin-top: 10px;
    font-size: 0.9rem;
  }
  .comment-card-edit-section {
    margin-top: 10px;
  }
  .comment-card-edit-button {
    margin-top: 10px;
    width: 80px;
    border-radius: 5px;
    display: block;
    margin-left: auto;
  }
  .comment-card-left-section {
    flex: 8;
  }
  .comment-card-right-section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1.2;
    .comment-card-like-box {
      font-weight: bold;
      font-size: 1.1rem;
      height: 60px;
      width: 50px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: all 0.2s ease-in;
      svg {
        position: relative;
        top: 5px;
        font-weight: bold;
      }
    }
    .comment-card-like-box.active {
      border-color: ${palette.antd_blue_01};
      color: ${palette.antd_blue_01};
    }
  }
  .comment-card-like-count {
    position: relative;
    bottom: 5px;
  }
  .comment-card-owner-icon {
    margin: 2px 2px 0 0;
    svg {
      color: ${palette.yellow_500};
      font-size: 1rem;
      :hover {
        color: unset;
        cursor: unset;
      }
    }
  }

  @media (max-width: ${responsive.medium}) {
    .comment-card-content-section {
      padding-right: 10px;
    }
    .pc-only {
      display: none;
    }
    .mobile-only {
      display: block;
    }
    .comment-card-time {
      margin-top: 10px;
      font-size: 0.8rem;
      font-weight: bold;
      color: ${palette.gray_700};
    }
  }
`;
