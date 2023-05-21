import { checkUrl } from '@lib/utils/utils';

export const recordRoutes = [
  '/me/bookmark',
  '/me/examhistory',
  '/me/reviewnote',
  '/me/myexam',
  '/me/memo',
  '/me/questioncomment',
];
export const reviewnoteRoutes = ['/me/reviewnote'];
export const communityRoutes = ['/community', '/post'];
export const storeRoutes = ['/pricing/basic'];
export const profileRoutes = ['/me/edit'];
export const loginRoutes = ['/mobile/login'];
export const checkStorePage = (path: string) =>
  checkUrl({
    url: path,
    allowUrls: storeRoutes,
  });
export const checkRecordPage = (path: string) =>
  checkUrl({
    url: path,
    allowUrls: recordRoutes,
  });
export const checkReviewNotePage = (path: string) =>
  checkUrl({
    url: path,
    allowUrls: reviewnoteRoutes,
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
    !checkRecordPage(path) &&
    !checkProfilePage(path) &&
    !checkCommunityPage(path) &&
    !checkLoginPage(path) &&
    !checkStorePage(path)
  );
};
