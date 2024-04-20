import StudyComponent from '@components/study/StudyComponent';
import StudyHeaderWrapper from '@components/study/StudyHeaderWrapper';
import { STUDY_PAGE } from '@lib/constants/displayName';
import React from 'react';

interface Props {}

const StudyPage: React.FC<Props> = () => {
  return (
    <>
      <StudyHeaderWrapper />
      <StudyComponent />
    </>
  );
};

StudyPage.displayName = STUDY_PAGE;

export default StudyPage;
