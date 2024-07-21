import WithHead from '@components/common/head/WithHead';
import ExamHighlightComponent from '@components/examHighlight/ExamHighlightComponent';
import { EXAMS_REVIEW_PAGE } from '@lib/constants/displayName';
import { NextPage } from 'next';

const ExamsHighlightPage: NextPage = () => {
  return (
    <>
      <WithHead
        title={`형광펜 페이지 | 모두CBT`}
        pageHeadingTitle={'시험지 형광펜페이지'}
      />
      <ExamHighlightComponent />
    </>
  );
};

ExamsHighlightPage.displayName = EXAMS_REVIEW_PAGE;

export default ExamsHighlightPage;
