import ExamCreateComponent from '@components/exam/create/ExamCreateComponent';
import { EXAM_CREATE_PAGE } from '@lib/constants/displayName';
import withAuth from '@lib/hocs/withAuth';
import React from 'react';

interface Props {}

const ExamCreatePage: React.FC<Props> = () => {
  return <ExamCreateComponent />;
};

ExamCreatePage.displayName = EXAM_CREATE_PAGE;

export default withAuth(ExamCreatePage);
