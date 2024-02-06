import McqStudyComponent from '@components/mcq-study/McqStudyComponent';
import { MCQ_STUDY_PAGE } from '@lib/constants/displayName';
import React from 'react';

interface Props {}

const McqStudytudyPage: React.FC<Props> = () => {
  return <McqStudyComponent />;
};

McqStudytudyPage.displayName = MCQ_STUDY_PAGE;

export default McqStudytudyPage;
