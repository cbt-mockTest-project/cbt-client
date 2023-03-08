import { checkUrl } from '@lib/utils/utils';

export const bookmarkRoutes = ['/me/bookmark', '/me/examhistory'];
export const communityRoutes = ['/community', '/post'];
export const profileRoutes = ['/me/edit'];

export const checkBookmarkPage = (path: string) =>
  checkUrl({
    url: path,
    allowUrls: bookmarkRoutes,
  });
export const checkCommunityPage = (path: string) =>
  checkUrl({
    url: path,
    allowUrls: communityRoutes,
  });
export const checkProfilePage = (path: string) =>
  checkUrl({
    url: path,
    allowUrls: profileRoutes,
  });

export const checkHomePage = (path: string) => {
  return (
    !checkBookmarkPage(path) &&
    !checkProfilePage(path) &&
    !checkCommunityPage(path)
  );
};