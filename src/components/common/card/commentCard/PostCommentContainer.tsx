import { useMeQuery } from '@lib/graphql/user/hook/useUser';
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
  const [editState, setEditState] = useState(false);
  const toggleEdit = () => {
    setEditState(!editState);
  };
  const tryDelete = () => {};
  const tryEdit = () => {};
  const tryLike = () => {};
  const onChangeContent = () => {};
  const content = '';
  const editLoading = false;
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
