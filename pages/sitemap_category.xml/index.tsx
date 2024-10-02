import { ISitemapField, getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { initializeApollo } from '@modules/apollo';
import {
  GetCategoryNamesAndSlugsQuery,
  GetCategoryNamesAndSlugsQueryVariables,
} from '@lib/graphql/query/examQuery.generated';
import { GET_CATEGORY_NAMES_AND_SLUGS } from '@lib/graphql/query/examQuery';
import { ExamType } from 'types';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = initializeApollo({}, '');
  const res = await client.query<
    GetCategoryNamesAndSlugsQuery,
    GetCategoryNamesAndSlugsQueryVariables
  >({
    query: GET_CATEGORY_NAMES_AND_SLUGS,
    variables: {
      input: {
        examType: ExamType.Subjective,
      },
    },
  });
  const categoryUrlSlugs = res.data.getCategoryNamesAndSlugs.urlSlugs;
  const fields = categoryUrlSlugs?.map((slug) => ({
    loc: `${process.env.NEXT_PUBLIC_CLIENT_URL}/category/${slug}`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 0.7,
  }));

  return getServerSideSitemap(ctx, fields as ISitemapField[]);
};

export default function Sitemap() {}
