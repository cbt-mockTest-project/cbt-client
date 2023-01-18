import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import TextArea from 'antd/lib/input/TextArea';
import { Button } from 'antd';
import { comments } from './PostDetail.constants';
import PostCommentContainer from '@components/common/card/commentCard/PostCommentContainer';

interface PostDetailViewProps {}

const PostDetailView: React.FC<PostDetailViewProps> = () => {
  return (
    <PostDetailViewBlock>
      <div className="post-detail-wrapper">
        <section className="post-detail-top-section">
          <div className="post-detail-top-title">타이틀 들어갈 자리</div>
          <div className="post-detail-top-profile-wrapper">
            <div className="post-detail-top-profile">
              <div className="post-detail-top-profile-user-info">
                <UserOutlined />
                <div>부우부</div>
              </div>
              <div className="post-detail-top-date">2023.01.02</div>
            </div>
            <div className="post-detail-top-view-count">
              <VisibilityIcon />
              <span>5</span>
            </div>
          </div>
        </section>
        <section className="post-detail-center-section">
          <div className="post-detail-center-section-contents-wrapper">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, eaque
            corporis expedita pariatur dignissimos mollitia officia voluptates,
            laborum harum dolore qui dicta adipisci id doloremque blanditiis
            minus aut dolorem ducimus.
          </div>
          <div className="post-detail-center-section-like-wrapper">
            <FavoriteBorderOutlinedIcon />
            <span>5</span>
          </div>
        </section>
        <section className="post-detail-bottom-section">
          <div className="post-detail-bottom-section-comments-count-wrapper">
            <div>댓글</div>
            <div className="post-detail-bottom-section-comments-count">5</div>
          </div>
          <TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
          <Button className="post-detail-bottom-section-comments-submit-button">
            등록하기
          </Button>
          <ul className="post-detail-comment-section">
            {comments.map((comment) => (
              <li key={comment.id} className="post-detail-comment-list">
                <PostCommentContainer
                  option={comment}
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
      top: 1px;
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
  }
  .post-detail-center-section-like-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    svg {
      cursor: pointer;
      position: relative;
      top: 1px;
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
  @media (max-width: ${responsive.medium}) {
    .post-detail-wrapper {
    }
    padding: 20px;
  }
`;
