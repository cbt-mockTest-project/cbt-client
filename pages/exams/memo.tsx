import WithHead from '@components/common/head/WithHead';
import ExamMemoComponent from '@components/examMemo/ExamMemoComponent';
import { EXAMS_REVIEW_PAGE } from '@lib/constants/displayName';
import { NextPage } from 'next';

const ExamsMemoPage: NextPage = () => {
  return (
    <>
      <WithHead
        title={`답안메모 페이지 | 모두CBT`}
        pageHeadingTitle={'시험지 형광펜페이지'}
      />
      <ExamMemoComponent />
    </>
  );
};

ExamsMemoPage.displayName = EXAMS_REVIEW_PAGE;

export default ExamsMemoPage;
