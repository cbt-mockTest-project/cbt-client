import WithHead from '@components/common/head/WithHead';
import StudyComponent from '@components/study/StudyComponent';
import { STUDY_PAGE } from '@lib/constants/displayName';
import React from 'react';

interface Props {}

const StudyPage: React.FC<Props> = () => {
  return (
    <>
      <WithHead
        title="학습페이지 | 모두CBT"
        pageHeadingTitle="모두CBT 학습페이지"
      />
      <StudyComponent />
    </>
  );
};

StudyPage.displayName = STUDY_PAGE;

export default StudyPage;
