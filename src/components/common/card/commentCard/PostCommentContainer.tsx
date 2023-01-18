import {
  useDeletePostComment,
  useEditPostComment,
} from '@lib/graphql/user/hook/usePostComment';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { FULL_POST_COMMENT_FRAGMENT } from '@lib/graphql/user/query/postCommentFragment';
import { READ_POST } from '@lib/graphql/user/query/postQuery';
import { ReadPostQuery } from '@lib/graphql/user/query/postQuery.generated';
import useInput from '@lib/hooks/useInput';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { useApollo } from '@modules/apollo';
import { message } from 'antd';
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
  const { data: meQuery } = useMeQuery();
  const { value: content, onChange: onChangeContent } = useInput(
    option.content
  );
  const [deleteComment] = useDeletePostComment();
  const [editComment, { loading: editLoading }] = useEditPostComment();
  const client = useApollo({}, '');
  const [editState, setEditState] = useState(false);
  const toggleEdit = () => {
    setEditState(!editState);
  };
  const requestDelete = async () => {
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
          const newComments = prevComments.filter((el) => el.id !== option.id);
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
  };
  const requestEdit = async () => {
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
  };
  const tryDelete = convertWithErrorHandlingFunc({ callback: requestDelete });
  const tryEdit = convertWithErrorHandlingFunc({ callback: requestEdit });
  const tryLike = () => {};
  const likeLoading = false;
  const commentCardProps: CommentCardProps = {
    option,
    meQuery,
    toggleEdit,
    tryDelete,
    tryEdit,
    tryLike,
    onChangeContent,
    content,
    editState,
    editLoading,
    likeLoading,
  };
  return <CommentCardView {...commentCardProps} className={className} />;
};

export default PostCommentContainer;