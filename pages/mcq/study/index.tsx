import ObjectiveStudyComponent from '@components/study/objective/ObjectiveStudyComponent';
import ObjectiveStudyHeaderWrapper from '@components/study/objective/ObjectiveStudyHeaderWrapper';
import StudyComponent from '@components/study/StudyComponent';
import { STUDY_PAGE } from '@lib/constants/displayName';
import React from 'react';

interface Props {}

const StudyPage: React.FC<Props> = () => {
  return (
    <>
      <ObjectiveStudyHeaderWrapper />
      <ObjectiveStudyComponent />
    </>
  );
};

StudyPage.displayName = STUDY_PAGE;

export default StudyPage;
