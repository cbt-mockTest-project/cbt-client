import WithHead from '@components/common/head/WithHead';
import ExamPrintComponent from '@components/exam/pdf/ExamPrint';
import StudyHeader from '@components/study/StudyHeader';
import { EXAM_PDF_PAGE } from '@lib/constants/displayName';
import { READ_QUESTIONS_BY_EXAM_IDS } from '@lib/graphql/query/questionQuery';
import { ReadQuestionsByExamIdsQuery } from '@lib/graphql/query/questionQuery.generated';
import { removeHtmlTag } from '@lib/utils/utils';
import { apolloClient } from '@modules/apollo';
import { mockExamActions } from '@modules/redux/slices/mockExam';
import wrapper from '@modules/redux/store/configureStore';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MockExamQuestion, ReadQuestionsByExamIdsInput } from 'types';

interface ExamPdfPageProps {
  questions: MockExamQuestion[];
  title: string;
  description: string;
  approved: boolean;
}

const ExamPdfPage: React.FC<ExamPdfPageProps> = ({ questions, approved }) => {
  return (
    <>
      <WithHead
        title={'암기장 공유서비스 | 모두CBT'}
        pageHeadingTitle={'암기장 공유서비스 | 모두CBT'}
        noIndex={approved ? false : true}
      />
      <StudyHeader questions={questions} />
      <ExamPrintComponent />
    </>
  );
};

ExamPdfPage.displayName = EXAM_PDF_PAGE;

export default ExamPdfPage;

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: { params: { Id: string } }[] = [];
  try {
    return { paths, fallback: 'blocking' };
  } catch (err) {
    return {
      paths,
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    if (!context.params?.Id) {
      return {
        notFound: true,
      };
    }
    const examId = context.params?.Id;
    const questionsQueryInput: ReadQuestionsByExamIdsInput = {
      ids: [Number(String(examId))],
    };

    const res = await apolloClient.query<ReadQuestionsByExamIdsQuery>({
      query: READ_QUESTIONS_BY_EXAM_IDS,
      variables: {
        input: questionsQueryInput,
      },
    });
    if (!res.data?.readQuestionsByExamIds) {
      throw new Error('No data returned from the query');
    }
    const questions = (res?.data.readQuestionsByExamIds.questions ||
      []) as MockExamQuestion[];
    store.dispatch(
      mockExamActions.setQuestions(questions as MockExamQuestion[])
    );
    const title = questions[0]?.mockExam?.title || '';
    const approved = questions[0]?.mockExam?.approved || false;
    const description = questions.reduce(
      (acc, cur) => acc + ` ${cur.question} ${cur.solution}`,
      ''
    );

    return {
      props: {
        questionsQueryInput,
        questions,
        approved,
        title,
        description: removeHtmlTag(description),
      },
      revalidate: 86400,
    };
  }
);
