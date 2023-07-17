import { useCreatePostComment } from '@lib/graphql/user/hook/usePostComment';
import { READ_POST } from '@lib/graphql/user/query/postQuery';
import { ReadPostQuery } from '@lib/graphql/user/query/postQuery.generated';
import useInput from '@lib/hooks/useInput';
import { handleError } from '@lib/utils/utils';
import { useApollo } from '@modules/apollo';

interface UsePostCommentProps {
  postQuery: ReadPostQuery;
}

const usePostComment = ({ postQuery }: UsePostCommentProps) => {
  const client = useApollo({}, '');
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

  return {
    commentValue,
    onChangeCommentValue,
    createPostCommentLoading,
    requestCreatePostComment,
  };
};

export default usePostComment;
