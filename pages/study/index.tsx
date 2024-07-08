import StudyComponent from '../../app/_components/study/StudyComponent';
import StudyHeaderWrapper from '../../app/_components/study/StudyHeaderWrapper';
import { STUDY_PAGE } from '../../app/_lib/constants/displayName';
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
