import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { initializeApollo } from '@modules/apollo';
import { ReadMockExamCategoryNamesQuery } from '@lib/graphql/query/examQuery.generated';
import { READ_EXAM_CATEGORY_NAMES } from '@lib/graphql/query/examQuery';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = initializeApollo({}, '');
  const res = await client.query<ReadMockExamCategoryNamesQuery>({
    query: READ_EXAM_CATEGORY_NAMES,
  });
  const categoryNames = res.data.readMockExamCategoryNames.names;
  const fields = categoryNames.map((name) => ({
    loc: `${process.env.NEXT_PUBLIC_CLIENT_URL}/category/${name}`,
    lastmod: new Date().toISOString(),
    Changefreq: 'daily',
    priority: 0.7,
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function Sitemap() {}
