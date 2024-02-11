import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { initializeApollo } from '@modules/apollo';
import { ReadPostsQuery } from '@lib/graphql/query/postQuery.generated';
import { READ_POSTS } from '@lib/graphql/query/postQuery';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = initializeApollo({}, '');
  const res = await client.query<ReadPostsQuery>({
    query: READ_POSTS,
    variables: {
      input: {
        page: 1,
        all: true,
      },
    },
  });
  const postIds = res.data.readPosts.posts.map((exam) => exam.id);
  const fields = postIds.map((id) => ({
    loc: `${process.env.NEXT_PUBLIC_CLIENT_URL}/post/${id}`,
    lastmod: new Date().toISOString(),
    Changefreq: 'daily',
    priority: 0.7,
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function Sitemap() {}
