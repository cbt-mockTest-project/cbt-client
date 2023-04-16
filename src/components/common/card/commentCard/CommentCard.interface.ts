import { MeQuery } from '@lib/graphql/user/query/userQuery.generated';
import { UserRole } from 'types';

export interface CommentCardOption {
  nickname: string;
  content: string;
  time: string;
  id: number;
  likeState: boolean;
  likesCount: number;
  userId: number;
  parrentId: number;
  role?: UserRole;
}

export interface QuestionCommentContainerProps {
  option: CommentCardOption;
  className?: string;
}

export interface CommentCardProps {
  option: CommentCardOption;
  meQuery: MeQuery | undefined;
  toggleEdit: () => void;
  requestDelete: React.MouseEventHandler<HTMLButtonElement>;
  requestEdit: React.MouseEventHandler<HTMLButtonElement>;
  requestLike: React.MouseEventHandler<HTMLButtonElement>;
  onChangeContent: React.ChangeEventHandler<HTMLElement>;
  content: string;
  editState: boolean;
  editLoading: boolean;
  likeLoading: boolean;
  className?: string;
}
