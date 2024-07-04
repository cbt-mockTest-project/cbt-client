import {
  useDeletePostComment,
  useEditPostComment,
} from '@lib/graphql/hook/usePostComment';
import { useEditPostCommentLike } from '@lib/graphql/hook/usePostCommentLike';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { FULL_POST_COMMENT_FRAGMENT } from '@lib/graphql/query/postCommentFragment';
import { READ_POST } from '@lib/graphql/query/postQuery';
import { ReadPostQuery } from '@lib/graphql/query/postQuery.generated';
import useInput from '@lib/hooks/useInput';
import { handleError } from '@lib/utils/utils';
import { useApollo } from '@modules/apollo';
import { App } from 'antd';
import React, { useState } from 'react';
import { CommentCardOption, CommentCardProps } from './CommentCard.interface';
import CommentCardView from './CommentCardView';

interface PostCommentContainerProps {
  option: CommentCardOption;
  className?: string;
}

const PostCommentContainer: React.FC<PostCommentContainerProps> = ({
  option,
  className,
}) => {
  const { message } = App.useApp();
  const { data: meQuery } = useMeQuery();
  const { value: content, onChange: onChangeContent } = useInput(
    option.content
  );
  const [deleteComment] = useDeletePostComment();
  const [editComment, { loading: editLoading }] = useEditPostComment();
  const [editCommentLike, { loading: likeLoading }] = useEditPostCommentLike();
  const client = useApollo({}, '');
  const [editState, setEditState] = useState(false);
  const toggleEdit = () => {
    setEditState(!editState);
  };
  const requestDelete = async () => {
    try {
      const confirmed = confirm('삭제하시겠습니까?');
      if (confirmed) {
        const res = await deleteComment({
          variables: { input: { id: option.id } },
        });
        if (res.data?.deletePostComment.ok) {
          let queryResult = client.readQuery<ReadPostQuery>({
            query: READ_POST,
            variables: {
              input: { id: option.parrentId },
            },
          });
          const prevComments = queryResult?.readPost.post?.comment;
          if (queryResult && prevComments) {
            const newComments = prevComments.filter(
              (el) => el.id !== option.id
            );
            const prevCommentsCount = queryResult.readPost.post?.commentsCount;
            client.writeQuery({
              query: READ_POST,
              data: {
                readPost: {
                  ...queryResult.readPost,
                  post: {
                    ...queryResult.readPost.post,
                    comment: newComments,
                    commentsCount: Number(prevCommentsCount) - 1,
                  },
                },
              },
            });
          }
        }
      }
    } catch (e) {
      handleError(e);
    }
  };
  const requestEdit = async () => {
    try {
      const confirmed = confirm('수정하시겠습니까?');
      if (confirmed) {
        const res = await editComment({
          variables: { input: { content, id: option.id } },
        });
        if (res.data?.editPostComment.ok) {
          client.writeFragment({
            id: `PostComment:${option.id}`,
            fragment: FULL_POST_COMMENT_FRAGMENT,
            data: {
              content,
            },
          });
          setEditState(false);
          return message.success('댓글이 수정됐습니다.');
        }
        return message.error(res.data?.editPostComment.error);
      }
    } catch (e) {
      handleError(e);
    }
  };
  const requestLike = async () => {
    try {
      const res = await editCommentLike({
        variables: { input: { commentId: option.id } },
      });
      if (res.data?.editPostCommentLike.ok) {
        client.writeFragment({
          id: `PostComment:${option.id}`,
          fragment: FULL_POST_COMMENT_FRAGMENT,
          data: {
            likeState: res.data.editPostCommentLike.currentState,
            likesCount: res.data.editPostCommentLike.currentState
              ? option.likesCount + 1
              : option.likesCount - 1,
          },
        });
        return;
      }
      return message.error(res.data?.editPostCommentLike.error);
    } catch (e) {
      handleError(e);
    }
  };
  const commentCardProps: CommentCardProps = {
    option,
    meQuery,
    toggleEdit,
    requestDelete,
    requestEdit,
    requestLike,
    onChangeContent,
    content,
    editState,
    editLoading,
    likeLoading,
  };
  return <CommentCardView {...commentCardProps} className={className} />;
};

export default PostCommentContainer;
