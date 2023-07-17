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
  requestDelete: React.MouseEventHandler;
  requestEdit: React.MouseEventHandler;
  requestLike: React.MouseEventHandler;
  onChangeContent: React.ChangeEventHandler;
  content: string;
  editState: boolean;
  editLoading: boolean;
  likeLoading: boolean;
  className?: string;
}
