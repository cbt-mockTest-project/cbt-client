import { MeQuery } from './../../../lib/graphql/user/query/userQuery.generated';
import { ReadPostQuery } from '@lib/graphql/user/query/postQuery.generated';
export interface PostDetailContainerProps {
  postQueryOnStaticProps: ReadPostQuery;
}

export interface PostDetailViewProps
  extends Omit<PostDetailContainerProps, 'postQueryOnStaticProps'> {
  requestEditPostLike: React.MouseEventHandler<HTMLElement>;
  requestCreatePostComment: React.MouseEventHandler<HTMLElement>;
  requestDeletePost: React.MouseEventHandler<HTMLElement>;
  commentValue: string;
  onChangeCommentValue: React.ChangeEventHandler<HTMLTextAreaElement>;
  createPostCommentLoading: boolean;
  meQuery: MeQuery | undefined;
  postQuery: ReadPostQuery;
}
