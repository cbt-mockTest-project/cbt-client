import NaverBlogBotComponent from '@components/bot/blog/NaverBlogBotComponent';
import WithHead from '@components/common/head/WithHead';
import { NAVER_BLOG_BOT_PAGE } from '@lib/constants/displayName';
import { NextPage } from 'next';

const BlogBotPage: NextPage = () => {
  return (
    <>
      <WithHead
        title="네이버블로그분석 | 모두CBT"
        pageHeadingTitle="모두CBT 네이버블로그분석 페이지"
      />
      <NaverBlogBotComponent />
    </>
  );
};

export default BlogBotPage;

BlogBotPage.displayName = NAVER_BLOG_BOT_PAGE;
