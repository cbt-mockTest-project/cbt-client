import { useCreatePostComment } from '@lib/graphql/hook/usePostComment';
import { READ_POST } from '@lib/graphql/query/postQuery';
import { ReadPostQuery } from '@lib/graphql/query/postQuery.generated';
import useInput from '@lib/hooks/useInput';
import { handleError } from '@lib/utils/utils';
import { apolloClient } from '@modules/apollo';

interface UsePostCommentProps {
  postQuery: ReadPostQuery;
}

const usePostComment = ({ postQuery }: UsePostCommentProps) => {
  const {
    value: commentValue,
    onChange: onChangeCommentValue,
    setValue: setCommentValue,
  } = useInput('');
  const [createPostComment, { loading: createPostCommentLoading }] =
    useCreatePostComment();

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
          const queryResult = apolloClient.readQuery<ReadPostQuery>({
            query: READ_POST,
            variables: { input: { id: post.id } },
          });
          const prevComments = queryResult?.readPost.post?.comment;
          const prevCommentsCount = queryResult?.readPost.post?.commentsCount;
          if (queryResult && prevComments) {
            apolloClient.writeQuery({
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

  return {
    commentValue,
    onChangeCommentValue,
    createPostCommentLoading,
    requestCreatePostComment,
  };
};

export default usePostComment;
