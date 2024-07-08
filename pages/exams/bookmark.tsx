import WithHead from '../../app/_components/common/head/WithHead';
import ExamBookmarkComponent from '../../app/_components/examBookmark/ExamBookmarkComponent';
import ExamReviewComponent from '../../app/_components/examReview/ExamReviewComponent';
import { NextPage } from 'next';

const ExamsBookmarkPage: NextPage = () => {
  return (
    <>
      <WithHead
        title={`북마크 페이지 | 모두CBT`}
        pageHeadingTitle={'시험지 북마크 페이지'}
      />
      <ExamBookmarkComponent />
    </>
  );
};

export default ExamsBookmarkPage;
