import GoogleAd from '../../../app/_components/common/ad/GoogleAd';
import WithHead from '../../../app/_components/common/head/WithHead';
import SolutionModeComponent from '../../../app/_components/solutionMode/SolutionModeComponent';
import SolutionModeCore from '../../../app/_components/solutionMode/SolutionModeCore';
import StudyHeader from '../../../app/_components/study/StudyHeader';
import { EXAM_SOLUTION_PAGE } from '../../../app/_lib/constants/displayName';
import { READ_ALL_MOCK_EXAM } from '../../../app/_lib/graphql/query/examQuery';
import { ReadAllMockExamQuery } from '../../../app/_lib/graphql/query/examQuery.generated';
import { READ_QUESTIONS_BY_EXAM_IDS } from '../../../app/_lib/graphql/query/questionQuery';
import { ReadQuestionsByExamIdsQuery } from '../../../app/_lib/graphql/query/questionQuery.generated';
import { convertExamTitle, removeHtmlTag } from '../../../app/_lib/utils/utils';
import { addApolloState, initializeApollo } from '../../../app/_modules/apollo';
import { mockExamActions } from '../../../app/_modules/redux/slices/mockExam';
import wrapper from '../../../app/_modules/redux/store/configureStore';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  MockExamQuestion,
  ReadQuestionsByExamIdsInput,
} from '../../../app/types';

interface ExamSolutionPageProps {
  questionsQueryInput: ReadQuestionsByExamIdsInput;
  questions: MockExamQuestion[];
  title: string;
  description: string;
  isNoIndex?: boolean;
}

const ExamSolutionPage: React.FC<ExamSolutionPageProps> = ({
  questionsQueryInput,
  questions,
  title,
  description,
  isNoIndex,
}) => {
  return (
    <>
      <WithHead
        title={`${convertExamTitle(title)} 해설 | 모두CBT`}
        pageHeadingTitle={`${convertExamTitle(title)} 해설 페이지`}
        description={description}
        noIndex={isNoIndex}
      />
      <StudyHeader questions={questions} />
      <SolutionModeComponent questionsQueryInput={questionsQueryInput} />
      <SolutionModeCore />
    </>
  );
};

ExamSolutionPage.displayName = EXAM_SOLUTION_PAGE;

export default ExamSolutionPage;

export const getStaticPaths: GetStaticPaths = async (context) => {
  const apolloClient = initializeApollo({}, '');
  let paths: { params: { Id: string } }[] = [];
  try {
    const res = await apolloClient.query<ReadAllMockExamQuery>({
      query: READ_ALL_MOCK_EXAM,
      variables: {
        input: {
          category: '',
          query: '',
          all: true,
        },
      },
    });
    if (res.data.readAllMockExam.mockExams) {
      paths = res.data.readAllMockExam.mockExams.map((el) => ({
        params: { Id: String(el.id) },
      }));
    }
    return { paths: [], fallback: 'blocking' };
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
    store.dispatch(mockExamActions.setQuestions([]));
    store.dispatch(
      mockExamActions.setServerSideQuestions(questions as MockExamQuestion[])
    );
    const title = questions[0]?.mockExam.title || '';
    const isNoIndex =
      !questions[0]?.mockExam.approved || questions[0]?.mockExam.isPrivate;
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
        isNoIndex,
      },
      revalidate: 86400,
    });
  }
);
