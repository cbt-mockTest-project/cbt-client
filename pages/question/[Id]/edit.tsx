import QuestionEditComponent from '../../../app/_components/question/edit/QuestionEditComponent';
import { QUESTION_EDIT_PAGE } from '../../../app/_lib/constants/displayName';
import React from 'react';
import styled from 'styled-components';

interface QuestionEditPageProps {}

const QuestionEditPage: React.FC<QuestionEditPageProps> = () => {
  return <QuestionEditComponent />;
};

QuestionEditPage.displayName = QUESTION_EDIT_PAGE;

export default QuestionEditPage;
