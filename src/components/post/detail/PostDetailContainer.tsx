import { useDeletePost } from '@lib/graphql/user/hook/usePost';
import { useCreatePostComment } from '@lib/graphql/user/hook/usePostComment';
import { useEditPostLike } from '@lib/graphql/user/hook/usePostLike';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { FULL_POST_FRAGMENT } from '@lib/graphql/user/query/postFragment';
import { READ_POST } from '@lib/graphql/user/query/postQuery';
import { ReadPostQuery } from '@lib/graphql/user/query/postQuery.generated';
import useInput from '@lib/hooks/useInput';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { useApollo } from '@modules/apollo';
import { message } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import {
  PostDetailContainerProps,
  PostDetailViewProps,
} from './PostDetail.interface';
import PostDetailView from './PostDetailView';

const PostDetailContainer: React.FC<PostDetailContainerProps> = ({
  postQuery,
}) => {
  const client = useApollo({}, '');
  const {
    value: commentValue,
    onChange: onChangeCommentValue,
    setValue: setCommentValue,
  } = useInput('');
  const [createPostComment, { loading: createPostCommentLoading }] =
    useCreatePostComment();
  const router = useRouter();
  const { data: meQuery } = useMeQuery();
  const [editPostLike] = useEditPostLike();
  const [deletePost] = useDeletePost();
  const requestDeletePost = async () => {
    const post = postQuery.readPost.post;
    if (post) {
      const confirmed = confirm('삭제하시겠습니까?');
      if (confirmed) {
        const res = await deletePost({ variables: { input: { id: post.id } } });
        if (res.data?.deletePost.ok) {
          message.success('게시글이 삭제됐습니다.');
          return router.back();
        }
        return message.error(res.data?.deletePost.error);
      }
    }
  };

  const requestCreatePostCommnet = async () => {
    if (postQuery.readPost.post) {
      const { post } = postQuery.readPost;
      const res = await createPostComment({
        variables: {
          input: { content: commentValue, postId: post.id },
        },
      });
      if (res.data?.createPostComment.ok) {
        setCommentValue('');
        const newComment = res.data.createPostComment.comment;
        const queryResult = client.readQuery<ReadPostQuery>({
          query: READ_POST,
          variables: { input: { id: post.id } },
        });
        const prevComments = queryResult?.readPost.post?.comment;
        const prevCommentsCount = queryResult?.readPost.post?.commentsCount;
        if (queryResult && prevComments) {
          client.writeQuery({
            query: READ_POST,
            data: {
              readPost: {
                ...queryResult.readPost,
                post: {
                  ...queryResult.readPost.post,
                  comment: [newComment, ...prevComments],
                  commentsCount: Number(prevCommentsCount) + 1,
                },
              },
            },
          });
        }
      }
    }
  };
  const requestEditPostLike = async () => {
    if (postQuery.readPost.post) {
      const { post } = postQuery.readPost;
      const res = await editPostLike({
        variables: { input: { postId: post.id } },
      });
      if (res.data?.editPostLike.ok) {
        client.writeFragment({
          id: `Post:${post.id}`,
          fragment: FULL_POST_FRAGMENT,
          data: {
            likesCount: res.data.editPostLike.currentState
              ? post.likesCount + 1
              : post.likesCount - 1,
            likeState: res.data.editPostLike.currentState,
          },
        });
        return;
      }
      return message.error(res.data?.editPostLike.error);
    }
  };
  const tryEditPostLike = convertWithErrorHandlingFunc({
    callback: requestEditPostLike,
  });
  const tryCreatePostComment = convertWithErrorHandlingFunc({
    callback: requestCreatePostCommnet,
  });
  const tryDeletePost = convertWithErrorHandlingFunc({
    callback: requestDeletePost,
  });
  const postDetailViewProps: PostDetailViewProps = {
    postQuery,
    tryEditPostLike,
    commentValue,
    onChangeCommentValue,
    tryCreatePostComment,
    tryDeletePost,
    createPostCommentLoading,
    meQuery,
  };
  return <PostDetailView {...postDetailViewProps} />;
};

export default PostDetailContainer;
