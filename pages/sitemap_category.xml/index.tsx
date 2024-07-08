import { ISitemapField, getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { initializeApollo } from '../../app/_modules/apollo';
import { ReadMockExamCategoryNamesQuery } from '../../app/_lib/graphql/query/examQuery.generated';
import { READ_EXAM_CATEGORY_NAMES } from '../../app/_lib/graphql/query/examQuery';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = initializeApollo({}, '');
  const res = await client.query<ReadMockExamCategoryNamesQuery>({
    query: READ_EXAM_CATEGORY_NAMES,
  });
  const categoryUrlSlugs = res.data.readMockExamCategoryNames.urlSlugs;
  const fields = categoryUrlSlugs.map((slug) => ({
    loc: `${process.env.NEXT_PUBLIC_CLIENT_URL}/category/${slug}`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 0.7,
  }));

  return getServerSideSitemap(ctx, fields as ISitemapField[]);
};

export default function Sitemap() {}
