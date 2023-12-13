import React from 'react';
import styled from 'styled-components';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { ReadPostQuery } from '@lib/graphql/query/postQuery.generated';
import PostDetailSkeleton from './PostDetailSkeleton';
import { convertToKST } from '@lib/utils/utils';
import { UserOutlined } from '@ant-design/icons';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextArea from 'antd/lib/input/TextArea';
import { Button } from 'antd';
import parse from 'html-react-parser';
import PostCommentContainer from '@components/common/card/commentCard/PostCommentContainer';
import Link from 'next/link';
import { secretBoards } from '@lib/constants';
import { PostCategory } from 'types';
import usePostDetail from './hooks/usePostDetail';
import usePostComment from './hooks/usePostComment';

interface PostDetailComponentProps {
  postQueryOnStaticProps: ReadPostQuery;
}

const PostDetailComponent: React.FC<PostDetailComponentProps> = ({
  postQueryOnStaticProps,
}) => {
  const { postQueryOnClientSide, requestDeletePost, requestEditPostLike } =
    usePostDetail();
  const postQuery = postQueryOnClientSide || postQueryOnStaticProps;

  const {
    commentValue,
    onChangeCommentValue,
    requestCreatePostComment,
    createPostCommentLoading,
  } = usePostComment({ postQuery });

  const { data: meQuery } = useMeQuery();

  const isSecret = secretBoards.includes(
    postQuery.readPost.post?.category as PostCategory
  );
  const allowView =
    meQuery?.me.user?.id === postQuery.readPost.post?.user.id ||
    meQuery?.me.user?.role === 'ADMIN';

  if (!postQuery) {
    return <PostDetailSkeleton />;
  }
  if (!postQuery.readPost.ok || !postQuery.readPost.post) return null;

  if (isSecret && !allowView) {
    return <PostDetailSkeleton />;
  }

  const { post } = postQuery.readPost;
  return (
    <PostDetailComponentBlock>
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
                {convertToKST(post.created_at, 'yy.MM.dd HH:mm')}
              </div>
            </div>
            <div className="post-detail-top-view-count">
              <VisibilityIcon />
              <span>{post.view}</span>
            </div>
            {meQuery?.me.user?.id === post.user.id && (
              <div className="post-detail-top-button-wrapper">
                <Link href={`/post/edit/${post.id}?c=${post.category}`}>
                  수정
                </Link>
                <button onClick={() => requestDeletePost(postQuery)}>
                  삭제
                </button>
              </div>
            )}
          </div>
        </section>
        <section className="post-detail-center-section">
          <div className="post-detail-center-section-contents-wrapper">
            {parse(post.content)}
          </div>
          <div className="post-detail-center-section-like-wrapper">
            <button onClick={() => requestEditPostLike(postQuery)}>
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
            onClick={requestCreatePostComment}
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
                    time: convertToKST(comment.created_at, 'yy.MM.dd HH:mm'),
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
    </PostDetailComponentBlock>
  );
};

export default PostDetailComponent;

const PostDetailComponentBlock = styled.div`
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
    word-break: break-all;
    h1 {
      font-size: 2rem;
      font-weight: bold;
      margin: 1.5rem 0;
    }
    h2 {
      font-size: 1.5rem;
      font-weight: bold;
      margin: 1.25rem 0;
    }
    h3,
    .ql-size-large {
      font-size: 1.17rem;
      font-weight: bold;
      margin: 1rem 0;
    }
    h4 {
      font-size: 1rem;
      font-weight: bold;
      margin: 0.75rem 0;
    }
    ul {
      list-style-type: disc;
      margin: 1rem 0;
      padding-left: 2rem;
    }
    ol {
      list-style-type: decimal;
      margin: 1rem 0;
      padding-left: 2rem;
    }
    li {
      margin: 0.5rem 0;
    }
    a {
      color: ${palette.blue_500};
    }
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
