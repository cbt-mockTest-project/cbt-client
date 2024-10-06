import React from 'react';
import {
  EXAMS_PDF_PAGE,
  EXAMS_REVIEW_PAGE,
  EXAM_CREATE_PAGE,
  EXAM_PDF_PAGE,
  EXAM_SOLUTION_PAGE,
  NAVER_BLOG_BOT_PAGE,
  PRICING_PAGE,
  QUESTION_EDIT_PAGE,
  QUESTION_PAGE,
  SEARCH_PAGE,
  STUDY_PAGE,
  TODAY_QUIZ_PAGE,
} from '@lib/constants/displayName';
import MainLayout from './MainLayout';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

interface BasicTemplateProps {
  displayName: string;
  children: React.ReactNode;
}

const BasicTemplate: React.FC<BasicTemplateProps> = ({
  displayName,
  children,
}) => {
  const hasLayout = !pagesWithoutLayout.includes(String(displayName));
  const hasBodyBorder = !pagesWithoutBodyBorder.includes(String(displayName));
  if (!hasLayout) return <main className={roboto.className}>{children}</main>;
  return (
    <MainLayout
      type={hasBodyBorder ? 'default' : 'clean'}
      className={roboto.className}
    >
      {children}
    </MainLayout>
  );
};

export default BasicTemplate;

const pagesWithoutLayout: string[] = [
  EXAM_SOLUTION_PAGE,
  EXAM_PDF_PAGE,
  EXAMS_PDF_PAGE,
  STUDY_PAGE,
  EXAM_CREATE_PAGE,
  NAVER_BLOG_BOT_PAGE,
  EXAMS_REVIEW_PAGE,
];
const pagesWithoutBodyBorder: string[] = [
  PRICING_PAGE,
  QUESTION_PAGE,
  QUESTION_EDIT_PAGE,
  TODAY_QUIZ_PAGE,
  SEARCH_PAGE,
];
