export const extractBlogId = (urlOrId: string) => {
  const match = urlOrId.match(/blog\.naver\.com\/([^\/\?]+)\/?/);
  return match ? match[1] : urlOrId;
};
