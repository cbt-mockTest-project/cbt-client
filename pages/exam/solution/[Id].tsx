import WithHead from '@components/common/head/WithHead';
import SolutionModeComponent from '@components/solutionMode/SolutionModeComponent';
import SolutionModeCore from '@components/solutionMode/SolutionModeCore';
import SolutionModeForStaticPageComponent from '@components/solutionMode/SolutionModeForStaticPageComponent';
import StudyHeader from '@components/study/StudyHeader';
import { EXAM_SOLUTION_PAGE } from '@lib/constants/displayName';
import { READ_ALL_MOCK_EXAM } from '@lib/graphql/query/examQuery';
import { ReadAllMockExamQuery } from '@lib/graphql/query/examQuery.generated';
import { READ_QUESTIONS_BY_EXAM_IDS } from '@lib/graphql/query/questionQuery';
import { ReadQuestionsByExamIdsQuery } from '@lib/graphql/query/questionQuery.generated';
import { convertExamTitle, removeHtmlTag } from '@lib/utils/utils';
import { apolloClient } from '@modules/apollo';
import { mockExamActions } from '@modules/redux/slices/mockExam';
import wrapper from '@modules/redux/store/configureStore';
import { Spin } from 'antd';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ExamType, MockExamQuestion, ReadQuestionsByExamIdsInput } from 'types';

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
  const router = useRouter();
  if (isNoIndex) {
    setTimeout(() => {
      router.replace('/');
    }, 2000);
  }
  if (isNoIndex) return <Spin fullscreen />;

  return (
    <>
      <WithHead
        title={`${convertExamTitle(title)} 해설 | 모두CBT`}
        pageHeadingTitle={`${convertExamTitle(title)} 해설 페이지`}
        description={description}
        noIndex={isNoIndex}
      />
      <StudyHeader questions={questions} />
      <SolutionModeForStaticPageComponent
        questionsQueryInput={questionsQueryInput}
      />
      <SolutionModeCore />
    </>
  );
};

ExamSolutionPage.displayName = EXAM_SOLUTION_PAGE;

export default ExamSolutionPage;

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: { params: { Id: string } }[] = [];
  try {
    const res = await apolloClient.query<ReadAllMockExamQuery>({
      query: READ_ALL_MOCK_EXAM,
      variables: {
        input: {
          examType: ExamType.Subjective,
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
      mockExamActions.setQuestions({
        questions,
      })
    );

    const title = questions[0]?.mockExam?.title || '';
    const isNoIndex =
      !questions[0]?.mockExam?.approved || questions[0]?.mockExam?.isPrivate;
    const description = questions.reduce(
      (acc, cur) => acc + ` ${cur.question} ${cur.solution}`,
      ''
    );

    return {
      props: {
        questionsQueryInput,
        questions,
        title,
        description: removeHtmlTag(description),
        isNoIndex,
      },
      revalidate: 86400,
    };
  }
);
