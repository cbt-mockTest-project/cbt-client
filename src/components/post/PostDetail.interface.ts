import { ReadPostQuery } from '@lib/graphql/user/query/postQuery.generated';
export interface PostDetailContainerProps {
  postQuery: ReadPostQuery;
}

export interface PostDetailViewProps extends PostDetailContainerProps {
  tryEditPostLike: React.MouseEventHandler<HTMLElement>;
  tryCreatePostComment: React.MouseEventHandler<HTMLElement>;
  commentValue: string;
  onChangeCommentValue: React.ChangeEventHandler<HTMLTextAreaElement>;
  createPostCommentLoading: boolean;
}
