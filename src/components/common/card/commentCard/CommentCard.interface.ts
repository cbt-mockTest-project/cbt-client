import { MeQuery } from '@lib/graphql/user/query/userQuery.generated';

export interface CommentCardOption {
  nickname: string;
  content: string;
  time: string;
  id: number;
  likeState: boolean;
  likesCount: number;
  userId: number;
  parrentId: number;
}

export interface QuestionCommentContainerProps {
  option: CommentCardOption;
}

export interface CommentCardProps {
  option: CommentCardOption;
  meQuery: MeQuery | undefined;
  toggleEdit: () => void;
  tryDelete: React.MouseEventHandler<HTMLButtonElement>;
  tryEdit: React.MouseEventHandler<HTMLButtonElement>;
  tryLike: React.MouseEventHandler<HTMLButtonElement>;
  onChangeContent: React.ChangeEventHandler<HTMLElement>;
  content: string;
  editState: boolean;
  editLoading: boolean;
  likeLoading: boolean;
  className?: string;
}
