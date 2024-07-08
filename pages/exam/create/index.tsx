import ExamCreateComponent from '../../../app/_components/exam/create/ExamCreateComponent';
import { EXAM_CREATE_PAGE } from '../../../app/_lib/constants/displayName';
import withAuth from '../../../app/_lib/hocs/withAuth';
import React from 'react';

interface Props {}

const ExamCreatePage: React.FC<Props> = () => {
  return <ExamCreateComponent />;
};

ExamCreatePage.displayName = EXAM_CREATE_PAGE;

export default withAuth(ExamCreatePage);
