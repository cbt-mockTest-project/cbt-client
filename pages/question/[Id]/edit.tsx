import QuestionEditComponent from '@components/question/edit/QuestionEditComponent';
import { QUESTION_EDIT_PAGE } from '@lib/constants/displayName';
import React from 'react';
import styled from 'styled-components';

interface QuestionEditPageProps {}

const QuestionEditPage: React.FC<QuestionEditPageProps> = () => {
  return <QuestionEditComponent />;
};

QuestionEditPage.displayName = QUESTION_EDIT_PAGE;

export default QuestionEditPage;
