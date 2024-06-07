import WithHead from '@components/common/head/WithHead';
import ExamPrintComponent from '@components/exam/pdf/ExamPrint';
import StudyHeader from '@components/study/StudyHeader';
import { EXAM_PDF_PAGE } from '@lib/constants/displayName';
import { READ_ALL_MOCK_EXAM } from '@lib/graphql/query/examQuery';
import { ReadAllMockExamQuery } from '@lib/graphql/query/examQuery.generated';
import { READ_QUESTIONS_BY_EXAM_IDS } from '@lib/graphql/query/questionQuery';
import { ReadQuestionsByExamIdsQuery } from '@lib/graphql/query/questionQuery.generated';
import { convertExamTitle, removeHtmlTag } from '@lib/utils/utils';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { mockExamActions } from '@modules/redux/slices/mockExam';
import wrapper from '@modules/redux/store/configureStore';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MockExamQuestion, ReadQuestionsByExamIdsInput } from 'types';

interface ExamPdfPageProps {
  questions: MockExamQuestion[];
  title: string;
  description: string;
}

const ExamPdfPage: React.FC<ExamPdfPageProps> = ({
  questions,
  title,
  description,
}) => {
  return (
    <>
      <WithHead
        title={`${convertExamTitle(title)}pdf | 모두CBT`}
        pageHeadingTitle={`${convertExamTitle(title)}pdf 페이지`}
        description={description}
      />
      <StudyHeader questions={questions} />
      <ExamPrintComponent />
    </>
  );
};

ExamPdfPage.displayName = EXAM_PDF_PAGE;

export default ExamPdfPage;

export const getStaticPaths: GetStaticPaths = async (context) => {
  const apolloClient = initializeApollo({}, '');
  let paths: { params: { Id: string } }[] = [];
  try {
    // const res = await apolloClient.query<ReadAllMockExamQuery>({
    //   query: READ_ALL_MOCK_EXAM,
    //   variables: {
    //     input: {
    //       category: '',
    //       query: '',
    //       all: true,
    //     },
    //   },
    // });
    // if (res.data.readAllMockExam.mockExams) {
    //   paths = res.data.readAllMockExam.mockExams.map((el) => ({
    //     params: { Id: String(el.id) },
    //   }));
    // }
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
        revalidate: 1,
      };
    }
    const apolloClient = initializeApollo({}, '');
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
    const title = questions[0]?.mockExam.title || '';
    const description = questions.reduce(
      (acc, cur) => acc + ` ${cur.question} ${cur.solution}`,
      ''
    );

    return addApolloState(apolloClient, {
      props: {
        questionsQueryInput,
        questions,
        title,
        description: removeHtmlTag(description),
      },
      revalidate: 43200,
    });
  }
);
