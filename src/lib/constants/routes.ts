import { checkUrl } from '@lib/utils/utils';

export const bookmarkRoutes = ['/me/bookmark', '/me/examhistory'];
export const reviewnoteRoutes = ['/me/reviewnote'];
export const communityRoutes = ['/community', '/post'];
export const profileRoutes = ['/me/edit'];
export const loginRoutes = ['/mobile/login'];

export const checkReviewNotePage = (path: string) =>
  checkUrl({
    url: path,
    allowUrls: reviewnoteRoutes,
  });
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
export const checkLoginPage = (path: string) =>
  checkUrl({ url: path, allowUrls: loginRoutes });

export const checkHomePage = (path: string) => {
  return (
    !checkBookmarkPage(path) &&
    !checkProfilePage(path) &&
    !checkCommunityPage(path) &&
    !checkReviewNotePage(path) &&
    !checkLoginPage(path)
  );
};
