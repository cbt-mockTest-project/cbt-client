import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import ExamHistorySkeleton from '@components/me/examhistory/ExamHistorySkeleton';
import dynamic from 'next/dynamic';
import React from 'react';

const QuestionCommentComponent = dynamic(
  () => import('@components/me/questionComment/QuestionCommentComponent'),
  { ssr: false, loading: () => <ExamHistorySkeleton /> }
);

interface QuestionCommentProps {}

const QuestionComment: React.FC<QuestionCommentProps> = () => {
  return (
    <>
      <WithHead title="문제댓글 | 모두CBT" pageHeadingTitle="문제댓글페이지" />
      <Layout subNav="main">
        <QuestionCommentComponent />
      </Layout>
    </>
  );
};

export default QuestionComment;
