import WithHead from '@components/common/head/WithHead';
import SolutionModeComponent from '@components/solutionMode/SolutionModeComponent';
import StudyHeader from '@components/study/StudyHeader';
import { EXAM_SOLUTION_PAGE } from '@lib/constants/displayName';
import { READ_ALL_MOCK_EXAM } from '@lib/graphql/query/examQuery';
import { ReadAllMockExamQuery } from '@lib/graphql/query/examQuery.generated';
import { READ_QUESTIONS_BY_EXAM_IDS } from '@lib/graphql/query/questionQuery';
import { ReadQuestionsByExamIdsQuery } from '@lib/graphql/query/questionQuery.generated';
import { convertExamTitle, removeHtmlTag } from '@lib/utils/utils';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { mockExamActions } from '@modules/redux/slices/mockExam';
import wrapper from '@modules/redux/store/configureStore';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { MockExamQuestion, ReadQuestionsByExamIdsInput } from 'types';

interface ExamSolutionPageProps {
  questionsQueryInput: ReadQuestionsByExamIdsInput;
  questions: MockExamQuestion[];
  title: string;
  description: string;
}

const ExamSolutionPage: React.FC<ExamSolutionPageProps> = ({
  questionsQueryInput,
  questions,
  title,
  description,
}) => {
  return (
    <>
      <WithHead
        title={`${convertExamTitle(title)} 해설 | 모두CBT`}
        pageHeadingTitle={`${convertExamTitle(title)} 해설 페이지`}
        description={description}
      />
      <StudyHeader questions={questions} />
      <SolutionModeComponent questionsQueryInput={questionsQueryInput} />
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
    try {
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
        return {
          notFound: true,
        };
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

      console.log(removeHtmlTag(description));
      return addApolloState(apolloClient, {
        props: {
          questionsQueryInput,
          questions,
          title,
          description: removeHtmlTag(description),
        },
        revalidate: 43200,
      });
    } catch (e) {
      return {
        notFound: true,
      };
    }
  }
);
