import { MeQuery } from './../../../lib/graphql/user/query/userQuery.generated';
import { ReadPostQuery } from '@lib/graphql/user/query/postQuery.generated';
export interface PostDetailContainerProps {
  postQuery: ReadPostQuery;
}

export interface PostDetailViewProps extends PostDetailContainerProps {
  tryEditPostLike: React.MouseEventHandler<HTMLElement>;
  tryCreatePostComment: React.MouseEventHandler<HTMLElement>;
  tryDeletePost: React.MouseEventHandler<HTMLElement>;
  commentValue: string;
  onChangeCommentValue: React.ChangeEventHandler<HTMLTextAreaElement>;
  createPostCommentLoading: boolean;
  meQuery: MeQuery | undefined;
}
