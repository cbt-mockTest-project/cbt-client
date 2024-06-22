import WithHead from '@components/common/head/WithHead';
import ExamPrintComponent from '@components/exam/pdf/ExamPrint';
import StudyHeader from '@components/study/StudyHeader';
import { EXAMS_PDF_PAGE } from '@lib/constants/displayName';
import useQuestions from '@lib/hooks/useQuestions';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { QuestionState, ReadQuestionsByExamIdsInput } from 'types';

interface ExamsPdfPageProps {}

const ExamsPdfPage: React.FC<ExamsPdfPageProps> = ({}) => {
  const router = useRouter();
  const { order, states, limit, examIds, mode, examId } = router.query;
  const { fetchQuestions } = useQuestions();
  const questions = useAppSelector((state) => state.mockExam.questions);

  useEffect(() => {
    if (!order || !examIds || !mode) return;
    const input: ReadQuestionsByExamIdsInput = {
      order: order as string,
      limit: Number(limit),
      ids: String(examIds)
        .split(',')
        .map((id) => Number(id)),
    };
    if (states && typeof states === 'string')
      input.states = states.split(',') as QuestionState[];
    fetchQuestions(input);
  }, [router.isReady]);

  if (questions.length === 0 || !questions) return null;

  return (
    <>
      <WithHead
        title={`시험지 출력페이지 | 모두CBT`}
        pageHeadingTitle={`시험지 출력페이지`}
      />
      <StudyHeader questions={questions} />
      <ExamPrintComponent />
    </>
  );
};

ExamsPdfPage.displayName = EXAMS_PDF_PAGE;

export default ExamsPdfPage;
