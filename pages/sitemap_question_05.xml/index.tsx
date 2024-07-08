import { ISitemapField, getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { initializeApollo } from '@modules/apollo';
import { ReadAllQuestionsQuery } from '@lib/graphql/query/questionQuery.generated';
import { READ_ALL_QUESTIONS } from '@lib/graphql/query/questionQuery';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = initializeApollo({}, '');
  const res = await client.query<ReadAllQuestionsQuery>({
    query: READ_ALL_QUESTIONS,
    variables: {
      input: {
        page: 5,
        limit: 10000,
      },
    },
  });

  const questionIds = res.data.readAllQuestions.questions
    ?.filter((question) => question.question)
    ?.map((question) => question.id);

  const fields = questionIds?.map((id) => ({
    loc: `${process.env.NEXT_PUBLIC_CLIENT_URL}/question/${id}`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 0.7,
  }));

  return getServerSideSitemap(ctx, fields as ISitemapField[]);
};

export default function Sitemap() {}
