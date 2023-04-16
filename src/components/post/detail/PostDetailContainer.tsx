import { postViewCookie } from '@lib/constants/cookie';
import {
  useDeletePost,
  useLazyReadPost,
  useViewPost,
} from '@lib/graphql/user/hook/usePost';
import { useCreatePostComment } from '@lib/graphql/user/hook/usePostComment';
import { useEditPostLike } from '@lib/graphql/user/hook/usePostLike';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { FULL_POST_FRAGMENT } from '@lib/graphql/user/query/postFragment';
import { READ_POST } from '@lib/graphql/user/query/postQuery';
import { ReadPostQuery } from '@lib/graphql/user/query/postQuery.generated';
import useInput from '@lib/hooks/useInput';
import { useApollo } from '@modules/apollo';
import { message } from 'antd';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import {
  PostDetailContainerProps,
  PostDetailViewProps,
} from './PostDetail.interface';
import PostDetailView from './PostDetailView';
import PostDetailViewSkeleton from './PostDetailViewSkeleton';
import { handleError } from '@lib/utils/utils';

const PostDetailContainer: React.FC<PostDetailContainerProps> = ({
  postQueryOnStaticProps,
}) => {
  const [readPost, { data: postQueryOnClientSide }] =
    useLazyReadPost('network-only');
  const [viewPost] = useViewPost();
  const postQuery = postQueryOnClientSide || postQueryOnStaticProps;
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

  useEffect(() => {
    (async () => {
      if (router.query.Id) {
        const id = Number(router.query.Id);
        const postViewCookieValue = getCookie(postViewCookie);
        const parsedPostViewCookie: number[] = postViewCookieValue
          ? JSON.parse(String(postViewCookieValue))
          : [];
        const hasPostViewCookie = parsedPostViewCookie.includes(id);
        if (!hasPostViewCookie) {
          // 조회수 30분에 한번씩 카운트
          viewPost({ variables: { input: { postId: id } } });
          setCookie(postViewCookie, [...parsedPostViewCookie, id], {
            maxAge: 60 * 30,
          });
        }

        const res = await readPost({
          variables: { input: { id } },
        });
        if (res.data?.readPost.ok) {
          client.writeQuery<ReadPostQuery>({
            query: READ_POST,
            data: {
              readPost: res.data.readPost,
            },
          });
        }
      }
    })();
  }, [router.query.Id]);

  const requestDeletePost = async () => {
    try {
      const post = postQuery.readPost.post;
      if (post) {
        const confirmed = confirm('삭제하시겠습니까?');
        if (confirmed) {
          const res = await deletePost({
            variables: { input: { id: post.id } },
          });
          if (res.data?.deletePost.ok) {
            message.success('게시글이 삭제됐습니다.');
            return router.back();
          }
          return message.error(res.data?.deletePost.error);
        }
      }
    } catch (e) {
      handleError(e);
    }
  };

  const requestCreatePostComment = async () => {
    try {
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
    } catch (e) {
      handleError(e);
    }
  };
  const requestEditPostLike = async () => {
    try {
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
    } catch (e) {
      handleError(e);
    }
  };

  const postDetailViewProps: PostDetailViewProps = {
    postQuery,
    requestEditPostLike,
    commentValue,
    onChangeCommentValue,
    requestCreatePostComment,
    requestDeletePost,
    createPostCommentLoading,
    meQuery,
  };
  if (!postQuery) {
    return <PostDetailViewSkeleton />;
  }

  return <PostDetailView {...postDetailViewProps} />;
};

export default PostDetailContainer;
