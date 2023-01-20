import { MeQuery } from '@lib/graphql/user/query/userQuery.generated';
import { ReadPostsQuery } from './../../lib/graphql/user/query/postQuery.generated';
export interface CommunityListProps {
  title: string;
  category: string;
  userName: string;
  date: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  id: number;
}

export interface CommunityViewProps {
  checkCategoryMatching: (query: string) => boolean;
  postsQuery: ReadPostsQuery | undefined;
  meQuery: MeQuery | undefined;
  openLoginModal: React.MouseEventHandler<Element>;
}
