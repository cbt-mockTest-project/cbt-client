import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextArea from 'antd/lib/input/TextArea';
import { Button } from 'antd';
import parse from 'html-react-parser';
import PostCommentContainer from '@components/common/card/commentCard/PostCommentContainer';
import { addHours, format, parseISO } from 'date-fns';
import { PostDetailViewProps } from './PostDetail.interface';
import Link from 'next/link';

const PostDetailView: React.FC<PostDetailViewProps> = (props) => {
  const {
    postQuery,
    tryEditPostLike,
    commentValue,
    onChangeCommentValue,
    tryCreatePostComment,
    createPostCommentLoading,
    tryDeletePost,
    meQuery,
  } = props;
  if (!postQuery.readPost.ok || !postQuery.readPost.post) return null;
  const { post } = postQuery.readPost;
  return (
    <PostDetailViewBlock>
      <div className="post-detail-wrapper">
        <section className="post-detail-top-section">
          <div className="post-detail-top-section-title-and-button-wrapper">
            <div className="post-detail-top-title">{post.title}</div>
          </div>
          <div className="post-detail-top-profile-wrapper">
            <div className="post-detail-top-profile">
              <div className="post-detail-top-profile-user-info">
                <UserOutlined />
                <div>{post.user.nickname}</div>
              </div>
              <div className="post-detail-top-date">
                {format(
                  addHours(parseISO(post.created_at), 9),
                  'yy.MM.dd HH:mm'
                )}
              </div>
            </div>
            <div className="post-detail-top-view-count">
              <VisibilityIcon />
              <span>{post.view}</span>
            </div>
            {meQuery?.me.user?.id === post.user.id && (
              <div className="post-detail-top-button-wrapper">
                <Link href={`/post/edit/${post.id}`}>수정</Link>
                <button onClick={tryDeletePost}>삭제</button>
              </div>
            )}
          </div>
        </section>
        <section className="post-detail-center-section">
          <div className="post-detail-center-section-contents-wrapper">
            {parse(post.content)}
          </div>

          <div className="post-detail-center-section-like-wrapper">
            <button onClick={tryEditPostLike}>
              {post.likeState ? (
                <FavoriteOutlinedIcon />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
            </button>
            <span>{post.likesCount}</span>
          </div>
        </section>
        <section className="post-detail-bottom-section">
          <div className="post-detail-bottom-section-comments-count-wrapper">
            <div>댓글</div>
            <div className="post-detail-bottom-section-comments-count">
              {post.commentsCount}
            </div>
          </div>
          <TextArea
            autoSize={{ minRows: 3, maxRows: 3 }}
            value={commentValue}
            onChange={onChangeCommentValue}
            placeholder="댓글을 입력해주세요."
          />
          <Button
            className="post-detail-bottom-section-comments-submit-button"
            onClick={tryCreatePostComment}
            disabled={createPostCommentLoading || !commentValue}
            type="primary"
          >
            등록하기
          </Button>
          <ul className="post-detail-comment-section">
            {post.comment.map((comment) => (
              <li key={comment.id} className="post-detail-comment-list">
                <PostCommentContainer
                  option={{
                    content: comment.content,
                    id: comment.id,
                    likesCount: comment.likesCount,
                    likeState: comment.likeState,
                    nickname: comment.user.nickname,
                    time: format(
                      addHours(parseISO(comment.created_at), 9),
                      'yy.MM.dd HH:mm'
                    ),
                    userId: comment.user.id,
                    parrentId: post.id,
                  }}
                  className="post-detail-comment-container"
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PostDetailViewBlock>
  );
};

export default PostDetailView;
const PostDetailViewBlock = styled.div`
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
  .post-detail-top-profile-user-info {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .post-detail-top-date {
    font-size: 0.8rem;
    color: ${palette.gray_500};
  }
  .post-detail-top-view-count {
    display: flex;
    margin-top: auto;
    font-size: 0.76rem;
    align-items: center;
    gap: 4px;
    color: ${palette.gray_500};
    svg {
      position: relative;
      font-size: 0.8rem;
    }
  }
  .post-detail-center-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .post-detail-center-section-contents-wrapper {
    padding: 20px 15px;
    font-size: 0.9rem;
    img {
      max-width: 100%;
    }
  }
  .post-detail-center-section-like-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    button {
      position: relative;
      top: 3px;
    }
    svg {
      cursor: pointer;
      position: relative;
      font-size: 1.2rem;
      color: ${palette.red_500};
    }
  }
  .post-detail-bottom-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px;
  }
  .post-detail-bottom-section-comments-count-wrapper {
    display: flex;
    gap: 5px;
    font-size: 0.9rem;
    font-weight: bold;
  }
  .post-detail-bottom-section-comments-count {
    color: ${palette.antd_blue_01};
  }
  .post-detail-bottom-section-comments-submit-button {
    margin-left: auto;
  }
  .post-detail-comment-list {
    + li {
      margin-top: 20px;
    }
  }
  .post-detail-comment-container {
    box-shadow: none;
    border-bottom: 1px solid ${palette.gray_200};
  }
  .post-detail-top-section-title-and-button-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .post-detail-top-button-wrapper {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-left: 10px;
    margin-top: auto;

    button,
    a {
      color: ${palette.gray_500};
      font-size: 0.7rem;
      transition: color 0.2s ease-in-out;
      :hover {
        color: ${palette.antd_blue_01};
      }
    }
  }
  @media (max-width: ${responsive.medium}) {
    .post-detail-wrapper {
    }
    padding: 20px;
  }
`;
