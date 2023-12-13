import { postViewCookie } from '@lib/constants/cookie';
import {
  useDeletePost,
  useLazyReadPost,
  useViewPost,
} from '@lib/graphql/hook/usePost';
import { useEditPostLike } from '@lib/graphql/hook/usePostLike';
import { FULL_POST_FRAGMENT } from '@lib/graphql/query/postFragment';
import { READ_POST } from '@lib/graphql/query/postQuery';
import { ReadPostQuery } from '@lib/graphql/query/postQuery.generated';
import { handleError } from '@lib/utils/utils';
import { useApollo } from '@modules/apollo';
import { message } from 'antd';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const usePostDetail = () => {
  const router = useRouter();
  const [readPost, { data: postQueryOnClientSide }] = useLazyReadPost();
  const [viewPost] = useViewPost();
  const [editPostLike] = useEditPostLike();
  const [deletePost] = useDeletePost();
  const client = useApollo({}, '');

  const requestDeletePost = async (data: ReadPostQuery) => {
    try {
      const post = data.readPost.post;
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

  const requestEditPostLike = async (data: ReadPostQuery) => {
    try {
      if (data.readPost.post) {
        const { post } = data.readPost;
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

  return {
    postQueryOnClientSide,
    requestDeletePost,
    requestEditPostLike,
  };
};

export default usePostDetail;
