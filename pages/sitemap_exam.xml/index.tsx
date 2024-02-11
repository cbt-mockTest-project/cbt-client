import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { initializeApollo } from '@modules/apollo';
import {
  ReadAllMockExamQuery,
  ReadMockExamCategoryNamesQuery,
} from '@lib/graphql/query/examQuery.generated';
import {
  READ_ALL_MOCK_EXAM,
  READ_EXAM_CATEGORY_NAMES,
} from '@lib/graphql/query/examQuery';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = initializeApollo({}, '');
  const res = await client.query<ReadAllMockExamQuery>({
    query: READ_ALL_MOCK_EXAM,
    variables: {
      input: {
        category: '',
        query: '',
        all: true,
      },
    },
  });
  const examIds = res.data.readAllMockExam.mockExams.map((exam) => exam.id);
  const fields = examIds.map((id) => ({
    loc: `${process.env.NEXT_PUBLIC_CLIENT_URL}/exam/solution/${id}`,
    lastmod: new Date().toISOString(),
    Changefreq: 'daily',
    priority: 0.7,
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function Sitemap() {}
