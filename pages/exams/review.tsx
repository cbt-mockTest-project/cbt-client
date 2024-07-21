import WithHead from '@components/common/head/WithHead';
import ExamReviewComponent from '@components/examReview/ExamReviewComponent';
import { EXAMS_REVIEW_PAGE } from '@lib/constants/displayName';
import { NextPage } from 'next';

const ExamsReviewPage: NextPage = () => {
  return (
    <>
      <WithHead
        title={`오답노트 페이지 | 모두CBT`}
        pageHeadingTitle={'시험지 오답노트페이지'}
      />
      <ExamReviewComponent />
    </>
  );
};

ExamsReviewPage.displayName = EXAMS_REVIEW_PAGE;

export default ExamsReviewPage;
