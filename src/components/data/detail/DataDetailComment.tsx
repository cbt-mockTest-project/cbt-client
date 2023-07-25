import { loginModal } from '@lib/constants';
import {
  useCreatePostComment,
  useDeletePostComment,
} from '@lib/graphql/user/hook/usePostComment';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { convertToKST, handleError } from '@lib/utils/utils';
import { coreActions } from '@modules/redux/slices/core';
import { dataActions } from '@modules/redux/slices/data';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { Clear } from '@mui/icons-material';
import palette from '@styles/palette';
import { Button, Card, Input, message } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { PostComment } from 'types';

const DataDetailCommentBlock = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 100%;
  .data-detail-comment-count-wrapper {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 15px;
  }
  .data-detail-comment-count-label {
    font-size: 16px;
    font-weight: bold;
  }
  .data-detail-comment-count {
    font-size: 16px;
    font-weight: bold;
    color: ${palette.blue_500};
  }
  .data-detail-comment-register-button {
    display: block;
    margin-top: 15px;
    margin-left: auto;
  }
  .data-detail-comment-info-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .data-detail-comment-username {
    font-size: 15px;
    font-weight: bold;
  }
  .data-detail-comment-date {
    font-size: 13px;
    color: ${palette.gray_700};
  }
  .data-detail-comment-content {
    margin-top: 5px;
    font-size: 15px;
  }
  .data-detail-comment-list-item {
    padding: 15px 0;
    border-bottom: 1px solid ${palette.gray_200};
  }
  .data-detail-comment-delete-button {
    font-size: 13px;
    color: ${palette.gray_700};
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 15px;
    }
  }
`;

interface DataDetailCommentProps {
  commentList: PostComment[];
  postId: number;
}

const DataDetailComment: React.FC<DataDetailCommentProps> = ({
  commentList,
  postId,
}) => {
  const { data: meQuery } = useMeQuery();
  const dispatch = useAppDispatch();
  const [commentValue, setCommentValue] = useState('');
  const [createPostComment, { loading: createPostCommentLoading }] =
    useCreatePostComment();
  const [deleteComment] = useDeletePostComment();

  const handleCreateComment = async () => {
    try {
      if (!meQuery?.me.user) {
        return dispatch(coreActions.openModal(loginModal));
      }
      const res = await createPostComment({
        variables: {
          input: { content: commentValue, postId },
        },
      });
      if (res.data?.createPostComment.ok) {
        setCommentValue('');
        dispatch(
          dataActions.setDataDetailComment({
            comment: res.data?.createPostComment.comment as PostComment,
            postId,
          })
        );
      }
    } catch (e) {
      handleError(e);
    }
  };
  const handleDeleteComment = async (id: number) => {
    try {
      const confirmed = confirm('댓글을 삭제하시겠습니까?');
      if (confirmed) {
        const res = await deleteComment({
          variables: {
            input: { id },
          },
        });
        if (res.data?.deletePostComment.ok) {
          return dispatch(dataActions.deleteDataDetailComment(id));
        }
        return message.error(res.data?.deletePostComment.error);
      }
    } catch (e) {
      handleError(e);
    }
  };
  return (
    <DataDetailCommentBlock>
      <div className="data-detail-comment-count-wrapper">
        <p className="data-detail-comment-count-label">댓글</p>
        <p className="data-detail-comment-count">{commentList.length}</p>
      </div>
      <Input.TextArea
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
        autoSize={{ minRows: 3, maxRows: 3 }}
      />
      <Button
        className="data-detail-comment-register-button"
        disabled={!commentValue}
        loading={createPostCommentLoading}
        onClick={handleCreateComment}
        type="primary"
        size="large"
      >
        등록하기
      </Button>
      <ul className="data-detail-comment-list">
        {commentList.map((comment) => (
          <li className="data-detail-comment-list-item" key={comment.id}>
            <div className="data-detail-comment-info-wrapper">
              <div className="data-detail-comment-username">
                {comment.user.nickname}
              </div>
              <div className="data-detail-comment-date">
                {convertToKST(comment.created_at, 'yy.MM.dd hh:mm')}
              </div>
              <Button
                className="data-detail-comment-delete-button"
                type="text"
                onClick={() => handleDeleteComment(comment.id)}
              >
                <Clear />
              </Button>
            </div>
            <div className="data-detail-comment-content">{comment.content}</div>
          </li>
        ))}
      </ul>
    </DataDetailCommentBlock>
  );
};

export default DataDetailComment;
