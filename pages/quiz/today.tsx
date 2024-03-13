import WithHead from '@components/common/head/WithHead';
import TodayQuizComponent from '@components/today/quiz/TodayQuizComponent';
import { NextPage } from 'next';

const TodayQuizPage: NextPage = () => {
  return (
    <>
      <WithHead
        title={`오늘의 퀴즈 | 모두CBT`}
        pageHeadingTitle={`오늘의 퀴즈 페이지`}
      />
      <TodayQuizComponent />
    </>
  );
};

export default TodayQuizPage;

TodayQuizPage.displayName = 'TODAY_QUIZ_PAGE';
