import WithHead from '../../app/_components/common/head/WithHead';
import ExamReviewComponent from '../../app/_components/examReview/ExamReviewComponent';
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

export default ExamsReviewPage;
